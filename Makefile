.PHONY: sauce isauce

# Environment variables
URL?=unknown
SAUCE_USERNAME?=unknown
SAUCE_ACCESS_KEY?=unknown

# Node modules
MOCHA=./node_modules/.bin/mocha
MOCHA_PARALLEL=./node_modules/.bin/mocha-parallel-tests


# Concurrent test
sauce:
	@env URL=$(URL) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA_PARALLEL) test/


# Incremental test
isauce:
	@env URL=$(URL) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA) --no-timeouts
