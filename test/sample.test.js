/**
 * @fileOverview
 *
 * A sample Selenium test.
 */

'use strict';

const test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    SauceLabs = require('saucelabs'),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    saucelabs = new SauceLabs({
        username: username,
        password: accessKey,
    }),
		ukp_browser = require('../config/browser.json'),
		ukp_page = require('../config/path.json');

let driver;



for (let i = 0; i < ukp_browser.capabilities.length; i++) {
	(function () {

		let browser = ukp_browser.capabilities[i];

		test.describe('Browser Test: ' + browser.name, function () {

			this.timeout(60000);

			test.beforeEach(function (done) {
				driver = new webdriver.Builder()
					.withCapabilities({
						'name': browser.name,
						'browserName': browser.browserName,
						'version': browser.version,
						'platform': browser.platform,
						'username': username,
						'accessKey': accessKey,
						'public': 'private'
					})
					.usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub")
					.build();

				driver.getSession().then(function (sessionid) {
					driver.sessionID = sessionid.id_;
				});

				done();
			});

			test.afterEach(function (done) {
				const passed = (this.currentTest.state === 'passed') ? true : false;

				driver.quit();

				saucelabs.updateJob(driver.sessionID, {
					passed: passed
				});

				done();
			});

			for (let d = 0; d < ukp_page.pages.length; d++) {
				let p = ukp_page.pages[d];

				test.it('visit page', function (done) {
					driver.get(process.env.DOMAIN + p.path);

					driver.getTitle().then(function (title) {
						console.log(title);
					});

					done();
				});
			}

		});

	})(i);
}
