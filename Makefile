.DEFAULT_GOAL := help

SOURCE_DIRECTORY := modules
WEB_DIRECTORY := $(SOURCE_DIRECTORY)/web
API_DIRECTORY := $(SOURCE_DIRECTORY)/api/src
CADDY_CONFIG := infrastructure/Caddyfile
CADDY_ADMIN := localhost:2020
DOCKER_COMPOSE := infrastructure/docker-compose.yml

.PHONY: help
help: ## Display usage instructions
	@awk 'BEGIN { \
		FS = ":.*##"; \
		printf "\nUsage:\n make TARGET\n\nTargets:\n" \
	} \
	/^[a-zA-Z_-]+:.*?##/ { \
		printf "  %-20s %s\n", $$1, $$2 \
	}' $(MAKEFILE_LIST)

.PHONY: application
application: ## Starts the application
	@$(MAKE) -j3 caddy-start web api

.PHONY: setup
setup: ## One-time machine setup (dependencies + Caddy CA trust + privileged ports)
	@npm install --prefix ${WEB_DIRECTORY}
	@if ! sudo setcap cap_net_bind_service=+ep $$(command -v caddy) 2>/dev/null; then \
		if [ -x "$$(command -v caddy)" ]; then \
			echo "warning: could not grant Caddy privileged ports (setcap failed) — caddy-start may fail to bind :443; re-run 'make setup' or run the setcap command manually" >&2; \
		fi; \
	fi
	@$(MAKE) caddy-trust

.PHONY: caddy-start
caddy-start: ## Starts the Caddy reverse proxy
	@caddy start --config ${CADDY_CONFIG} --pidfile infrastructure/.caddy.pid

.PHONY: caddy-stop
caddy-stop: ## Stops the Caddy reverse proxy (this project's instance)
	@if curl -s "http://${CADDY_ADMIN}/" > /dev/null 2>&1; then \
		caddy stop --address ${CADDY_ADMIN}; \
		rm -f infrastructure/.caddy.pid; \
	else \
		echo "Caddy is not running (admin ${CADDY_ADMIN} unreachable)"; \
	fi

.PHONY: caddy-trust
caddy-trust: ## Trusts Caddy's local CA (one-time per machine)
	@bash infrastructure/caddy-trust.sh

.PHONY: caddy-trust-windows
caddy-trust-windows: ## Imports Caddy's local CA into the Windows user root store (one-time per machine)
	@win_user=$$(cmd.exe /c echo %USERNAME% 2>/dev/null | tr -d '\r'); \
	src="$${HOME}/.local/share/caddy/pki/authorities/local/root.crt"; \
	dest="/mnt/c/Users/$${win_user}/caddy-root.crt"; \
	if [ ! -f "$${src}" ]; then \
		echo "error: Caddy CA not found at $${src} — start Caddy once first (make caddy-start)" >&2; \
		exit 1; \
	fi; \
	cp "$${src}" "$${dest}" && \
	certutil.exe -user -addstore Root "$$(wslpath -w "$${dest}")"

.PHONY: web
web: ## Starts the web client
	@npm run --prefix ${WEB_DIRECTORY} dev

.PHONY: api
api: database-up ## Starts the API
	@dotnet watch run --project ${API_DIRECTORY}

.PHONY: database-up
database-up: ## Starts database container
	@docker compose -f ${DOCKER_COMPOSE} up -d --remove-orphans database
	@docker compose -f ${DOCKER_COMPOSE} ps database

.PHONY: database-down
database-down: ## Kills the database container
	@docker compose -f ${DOCKER_COMPOSE} down database
