output "name_prefix" {
  description = "Prefix applied to all resource names."
  value       = local.name_prefix
}

output "dns_domain" {
  description = "Hostname the deployed monolith will be served from."
  value       = var.dns_domain
}

output "provision_hint" {
  description = "Ansible command to run once the server exists."
  value       = null_resource.server.triggers.provision_cmd
}
