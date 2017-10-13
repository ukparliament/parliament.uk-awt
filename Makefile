.PHONY: test itest clean asset

# Environment variables
# Ensure hypertext protocol is specified (http:// or https://) on url
DOMAIN?=http://example.com
SAUCE_USERNAME?=unknown
SAUCE_ACCESS_KEY?=unknown

# Node modules
MOCHA=./node_modules/.bin/mocha
MOCHA_PARALLEL=./node_modules/.bin/mocha-parallel-tests


# Concurrent test
test:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA_PARALLEL) --no-timeouts test/


# Incremental test
itest:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA) --no-timeouts test/


# removes all SauceLabs jobs and linked assets
# removes all local screenshots
clean:
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node scripts/delete_job.js
	@rm -rf screenshot/


# Download all assets
asset:
	@mkdir -p screenshot
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node scripts/get_asset.js
	@chmod u+x asset.sh && ./asset.sh
	@rm asset.sh
