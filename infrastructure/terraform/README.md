# Terraform module

Provider-agnostic skeleton describing the target server as a **contract**
(variables + locals) rather than cloud resources. `terraform init
-backend=false && terraform validate` works with no cloud account because the
root module only uses `null` and `local`.

## Inputs

| Variable         | Purpose                                        | Example              |
| ---------------- | ---------------------------------------------- | -------------------- |
| `server_region`  | Provider region identifier                     | `nbg1`, `fra1`       |
| `server_size`    | Instance flavor                                | `cx22`, `s-1vcpu-2gb`|
| `ssh_public_key` | OpenSSH public key for the server              | `ssh-ed25519 AAA...` |
| `dns_domain`     | Public hostname served by the monolith         | `you.duckdns.org`    |

## Applying to a real cloud

The `examples/` directory shows the drop-in compute resource for Hetzner and
DigitalOcean. Swap the `null_resource` placeholder for one of them, add your
token, `apply`, then provision with the Ansible playbook (see
`../ansible/README.md`). The `provision_hint` output prints the exact command.

## State

No backend is configured; local state only. `.generated/` holds a deployment
summary written by `local_sensitive_file`. Add a remote backend before any
team use.
