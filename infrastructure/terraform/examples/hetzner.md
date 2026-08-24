# Hetzner Cloud example

Copy this file over `main.tf` (after `terraform init`) or merge its pieces,
add your API token, and plan against a real project:

```hcl
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token # add `variable "hcloud_token" { sensitive = true }`
}

resource "hcloud_ssh_key" "deploy" {
  name       = local.name_prefix
  public_key = var.ssh_public_key
}

resource "hcloud_server" "app" {
  name        = local.name_prefix
  server_type = var.server_size # e.g. cx22
  image       = "ubuntu-24.04"
  location    = var.server_region # e.g. nbg1
  ssh_keys    = [hcloud_ssh_key.deploy.id]
  labels      = local.tags

  user_data = templatefile("${path.module}/cloud-init.tftpl", {})
}
```

After `terraform apply`, point `$DOMAIN` at the server's IPv4 (DuckDNS cron in
the Ansible playbook can do this) and run the printed provision hint.
