#!/usr/bin/env bash
set -euo pipefail

# caddy trust talks to the admin API of a *running* Caddy instance to fetch
# its local CA and install it into the OS trust store. If no instance is up,
# start a temporary one, trust, then stop it.
#
# The project instance exposes its admin API on $admin (see the Caddyfile's
# global admin option and CADDY_ADMIN in the Makefile).

admin="${CADDY_ADMIN:-localhost:2020}"
started=false
pidfile=/tmp/caddy-trust.pid
start_log=/tmp/caddy-trust-start.log
rm -f "$pidfile" "$start_log"

cleanup() {
	if [ "$started" = true ]; then
		caddy stop --address "$admin" > /dev/null 2>&1 || true
	fi
	rm -f "$pidfile" "$start_log"
}
trap cleanup EXIT

if ! curl -s "http://$admin/" > /dev/null 2>&1; then
	if ! CADDY_ADMIN="$admin" caddy start --pidfile "$pidfile" > "$start_log" 2>&1; then
		echo "error: failed to start temporary Caddy instance" >&2
		cat "$start_log" >&2
		exit 1
	fi
	started=true
fi

for _ in $(seq 1 30); do
	curl -s "http://$admin/" > /dev/null 2>&1 && break
	sleep 0.5
done

if ! curl -s "http://$admin/" > /dev/null 2>&1; then
	echo "error: Caddy admin API ($admin) did not become reachable within 15s" >&2
	if [ "$started" = true ]; then
		echo "hint: run 'CADDY_ADMIN=$admin caddy start --config infrastructure/Caddyfile' manually to see the real error" >&2
	fi
	exit 1
fi

caddy trust --address "$admin"
