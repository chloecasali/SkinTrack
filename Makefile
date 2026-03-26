help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install project dependencies
	npm install

start: ## Start Expo Metro
	npx expo start

start-ios: ## Start Expo and open Expo Go on iOS
	npx expo start --ios

start-android: ## Start Expo and open Expo Go on Android
	npx expo start --android

start-web: ## Start Expo for web
	npx expo start --web

run-ios: ## Build and launch the native iOS app
	npx expo run:ios

run-android: ## Build and launch the native Android app
	npx expo run:android

cache: ## Clear Expo cache
	npx expo start -c

rebuild-ios: ## Reinstall iOS pods and rebuild the native iOS app
	cd ios && pod install
	npx expo run:ios

lint: ## Lint code
	npm run lint

prettier: ## Check and fix code format
	-make prettier-check
	make prettier-fix

prettier-check: ## Check code format
	npm run prettier:check

prettier-fix: ## Fix code format
	npm run prettier:fix
