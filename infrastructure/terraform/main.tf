locals {
  name_prefix = "${var.project_name}-${var.environment}"
  tags = {
    project     = var.project_name
    environment = var.environment
    managed-by  = "terraform"
  }
}

# Placeholder for the real compute resource. A cloud example (examples/)
# replaces this with hcloud_server, digitalocean_droplet, aws_instance, ...
# while consuming the same variables and locals.
resource "null_resource" "server" {
  triggers = {
    name          = local.name_prefix
    region        = var.server_region
    size          = var.server_size
    ssh_key       = var.ssh_public_key
    dns_domain    = var.dns_domain
    provision_cmd = "ansible-playbook -i <server-ip>, infrastructure/ansible/playbook.yml -e deploy_mode=production -e domain=${var.dns_domain}"
  }
}

resource "local_sensitive_file" "deployment_summary" {
  content = jsonencode({
    name_prefix   = local.name_prefix
    tags          = local.tags
    server_region = var.server_region
    server_size   = var.server_size
    dns_domain    = var.dns_domain
    next_step     = null_resource.server.triggers.provision_cmd
  })
  filename        = "${path.module}/.generated/deployment-summary.json"
  file_permission = "0600"
}
