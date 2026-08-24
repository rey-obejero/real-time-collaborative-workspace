# DigitalOcean example

Copy this file over `main.tf` (after `terraform init`) or merge its pieces,
add your API token, and plan against a real project:

```hcl
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.34"
    }
  }
}

provider "digitalocean" {
  token = var.do_token # add `variable "do_token" { sensitive = true }`
}

resource "digitalocean_ssh_key" "deploy" {
  name       = local.name_prefix
  public_key = var.ssh_public_key
}

resource "digitalocean_droplet" "app" {
  name   = local.name_prefix
  region = var.server_region # e.g. fra1, nyc1
  size   = var.server_size   # e.g. s-1vcpu-2gb
  image  = "ubuntu-24-04-x64"
  ssh_keys = [digitalocean_ssh_key.deploy.fingerprint]
  tags    = values(local.tags)
}
```

After `terraform apply`, point `$DOMAIN` at the droplet's IPv4 (DuckDNS cron in
the Ansible playbook can do this) and run the printed provision hint.
