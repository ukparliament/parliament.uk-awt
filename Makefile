.PHONY: test itest clean

# Environment variables
DOMAIN?=unknown
SAUCE_USERNAME?=unknown
SAUCE_ACCESS_KEY?=unknown

# Node modules
MOCHA=./node_modules/.bin/mocha
MOCHA_PARALLEL=./node_modules/.bin/mocha-parallel-tests


# Concurrent test
test:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA_PARALLEL) test/


# Incremental test
itest:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA) test/


# removes all SauceLabs jobs and linked assets
# removes all local screenshots
clean:
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node scripts/clean.js
	@rm -rf screenshot/*.png
