/**
* Browser testing
*/


var fs = require('fs'),
assert = require('assert'),

// Selenium
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until,

// SauceLabs
SauceLabs = require("saucelabs"),
username = process.env.SAUCE_USERNAME,
accessKey = process.env.SAUCE_ACCESS_KEY,
saucelabs = new SauceLabs({
	username: username,
	password: accessKey,
}),

driver,
i = 0,


/**
* Supported browser
*/
capabilities = [
	{
		'name': 'Desktop-WIN-IE-11',
		'browserName': 'internet explorer',
		'version': '11'
	},
	{
		'name': 'Desktop-WIN-IE-14',
		'browserName': 'microsoftedge',
		'platform': 'Windows 10',
		'version': '14'
	},
	{
		'name': 'Desktop-Safari-10',
		'browserName': 'safari',
		'version': '10'
	},
	{
		'name': 'Desktop-MAC-Chrome-56',
		'browserName': 'chrome',
		'platform': 'Mac 10.12',
		'version': '56'
	},
	{
		'name': 'Desktop-WIN-Chrome-56',
		'browserName': 'chrome',
		'platform': 'Windows 10',
		'version': '56'
	},
	{
		'name': 'Desktop-MAC-Firefox-51',
		'browserName': 'firefox',
		'platform': 'Mac 10.12',
		'version': '51'
	},
	{
		'name': 'Desktop-WIN-Firefox-51',
		'browserName': 'firefox',
		'platform': 'Windows 10',
		'version': '51'
	},

	/*
	 * TODO: Mobile
	{
		'name': 'Mobile-iOS-safari-9',
		'browserName': 'iPhone',
		'version': '9.0'
	},
	{
		'name': 'Mobile-iOS-safari-10',
		'browserName': 'iPhone',
		'version': '10.0'
	},
	{
		'name': 'Mobile-android-chrome',
		'browserName': 'android'
	}
	*/
];


for (let i = 0; i < capabilities.length; i++) {
	(function() {

		test.describe('Browser Test: ' + capabilities[i].name, function() {

			this.timeout(60000);

			test.beforeEach(function(done) {

				driver = new webdriver.Builder()

				// Sets the desired capabilities when requesting a new session
				.withCapabilities({
					// Test configuration: https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options?focusedCommentId=67012791#comment-67012791
					'name': capabilities[i].name,

					'browserName': capabilities[i].browserName,
					'version': capabilities[i].version,
					'platform': capabilities[i].platform,

					'username': username,
					'accessKey': accessKey,

					'public': 'private'
				})

				.usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub") // The URL of a remote WebDriver server to use

				.build(); // Creates a new WebDriver client based on this builder's current configuration

				// A promise for this client's sessionId
				driver.getSession().then(function(sessionid) {
					driver.sessionID = sessionid.id_;
				});

				done();
			});


			test.afterEach(function(done) {
				const passed = (this.currentTest.state === 'passed') ? true : false;

				driver.quit(); // terminates the browser session after each test

				saucelabs.updateJob(driver.sessionID, {
					passed: passed
				}, done);
			});

			// Sample, set env url to http://parliament.uk
			test.it('should complete user journey #1', function(done) {
				driver.get(process.env.URL);
				ukp_takeScreenshot(capabilities[i].name);

				driver.findElement(By.linkText('Visit')).click();
				driver.sleep(300);
				ukp_takeScreenshot(capabilities[i].name);

				driver.findElement(By.id('ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_ctrlModuleContainerTop_ctl00_rptItems_ctl00_hypTitle')).click();
				driver.sleep(300);
				ukp_takeScreenshot(capabilities[i].name);

				driver.findElement(By.id('jump-link-0')).getText()
				.then(function(text) {
					assert.equal(text, 'What does the audio tour cover?');
				});

				done();
			});

		});

	})(i);
}


function ukp_writeFile(data, name) { // Nodejs, write data to file system
	i++;
	return fs.writeFileSync('./screenshot/' + name + '-' + i + '.png', data, 'base64');
}


function ukp_takeScreenshot(name) { // Selenium, take a screenshot
	return driver.takeScreenshot().then(function(data) {
		return ukp_writeFile(data, name);
	});
}
