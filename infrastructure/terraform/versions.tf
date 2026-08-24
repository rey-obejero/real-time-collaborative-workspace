terraform {
  required_version = ">= 1.9"

  # Provider-agnostic by design. Cloud examples in examples/ add their own
  # required_providers blocks; this root module only needs local/null so it
  # can be initialized and validated without any cloud account.
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
}
