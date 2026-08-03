.DEFAULT_GOAL := help

SOURCE_DIRECTORY := modules
WEB_DIRECTORY := $(SOURCE_DIRECTORY)/web
API_DIRECTORY := $(SOURCE_DIRECTORY)/api/src

.PHONY: help
help: ## Display usage instructions
	@awk 'BEGIN { \
		FS = ":.*##"; \
		printf "\nUsage:\n make TARGET\n\nTargets:\n" \
	} \
	/^[a-zA-Z_-]+:.*?##/ { \
		printf "  %-20s %s\n", $$1, $$2 \
	}' $(MAKEFILE_LIST)

.PHONE: application
application: ## Starts the application
	@$(MAKE) -j2 web api

.PHONY: web
web: ## Starts the web client
	@npm run --prefix ${WEB_DIRECTORY} dev

.PHONY: api
api: database-up ## Starts the API
	@dotnet watch run --project ${API_DIRECTORY} -lp https

.PHONY: database-up
database-up: ## Starts database container
	@docker compose up -d --remove-orphans database
	@docker compose ps database

.PHONY: database-down
database-down: ## Kills the database container
	@docker compose down database
