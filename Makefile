.PHONY: test itest clean asset

# Environment variables
DOMAIN?=unknown
SAUCE_USERNAME?=unknown
SAUCE_ACCESS_KEY?=unknown

# Node modules
MOCHA=./node_modules/.bin/mocha
MOCHA_PARALLEL=./node_modules/.bin/mocha-parallel-tests


# Concurrent test
test:
	@mkdir -p screenshot
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA_PARALLEL) test/


# Incremental test
itest:
	@mkdir -p screenshot
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA) --no-timeouts test/


# removes all SauceLabs jobs and linked assets
# removes all local screenshots
clean:
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node scripts/delete_job.js
	@rm -rf screenshot/*


# Download all assets
asset:
	@mkdir -p screenshot
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node scripts/get_asset.js
	@chmod +x asset.sh && ./asset.sh
	@rm asset.sh
