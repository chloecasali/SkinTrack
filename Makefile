help: ## Show help like directly using make
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run-ios: ## Launch ios device
	npm run ios

run-android: ## Launch android device
	npm run android

cache: ## Clear expo cache
	expo start -c

lint: ## Lint code
	npm run lint

prettier: ## Check and fix code format
	make prettier-check
	make prettier-fix

prettier-check: ## Check format code
	npm run prettier:check

prettier-fix: ## Fix format code
	npm run prettier:fix