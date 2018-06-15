.PHONY: test itest clean asset

# Environment variables
# Ensure hypertext protocol is specified (http:// or https://) on url
DOMAIN?=http://example.com


# Node modules variables
ESLINT=./node_modules/.bin/eslint
MOCHA=./node_modules/.bin/mocha
MOCHA_PARALLEL=./node_modules/.bin/mocha-parallel-tests


# Common variables
SCREENSHOT_DIR=screenshot
SCRIPTS_DIR=scripts
TEST_DIR=test


# Concurrent test
test:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA_PARALLEL) --no-timeouts --recursive $(TEST_DIR)


# Incremental test
itest:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA) --no-timeouts --recursive $(TEST_DIR)


# JS linting
lint:
	@$(ESLINT) $(SCRIPTS_DIR) $(TEST_DIR)


# removes all SauceLabs jobs and linked assets
# removes all local screenshots
clean:
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node $(SCRIPTS_DIR)/delete_job.js
	@rm -rf $(SCREENSHOT_DIR)/*


# Download all assets
asset:
	@mkdir -p $(SCREENSHOT_DIR)
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node $(SCRIPTS_DIR)/get_asset.js
	@chmod u+x asset.sh && ./asset.sh
	@rm asset.sh
