variable "project_name" {
  description = "Base name for all created resources."
  type        = string
  default     = "knowledge-management-app"
}

variable "environment" {
  description = "Deployment environment label (e.g. production)."
  type        = string
  default     = "production"
}

variable "server_region" {
  description = "Provider-specific region identifier (e.g. nbg1, nyc1). Set per cloud."
  type        = string
}

variable "server_size" {
  description = "Provider-specific instance size (e.g. cx22, s-1vcpu-2gb). Set per cloud."
  type        = string
}

variable "ssh_public_key" {
  description = "OpenSSH public key material injected into the server."
  type        = string
}

variable "dns_domain" {
  description = "Public hostname pointing at the server (e.g. yourname.duckdns.org)."
  type        = string
}
