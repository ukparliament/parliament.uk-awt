/**
 * @fileOverview
 *
 * A sample Selenium test.
 */

'use strict';

const test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    browser = require('../config/browser'),
		url = require('../config/path'),
    helper = require('./helper'),
    SauceLabs = require("saucelabs"),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    saucelabs = new SauceLabs({
        username: username,
        password: accessKey,
    });

let driver;


for (let i = 0; i < browser.capabilities.length; i++) {
	(function () {


		test.describe('Browser Test: ' + browser.capabilities[i].name, function () {

			this.timeout(60000);

			test.beforeEach(function (done) {
				driver = new webdriver.Builder()
					.withCapabilities({
						'name': browser.capabilities[i].name,
						'browserName': browser.capabilities[i].browserName,
						'version': browser.capabilities[i].version,
						'platform': browser.capabilities[i].platform,
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
				}, done);
			});

			for (let d = 0; d < url.path.length; d++) {
				test.it('visit page', function (done) {
					driver.get(process.env.DOMAIN + url.path[d]);

					driver.getTitle().then(function (title) {
						console.log(title);
					});

					done();
				});
			}

		});


	})(i);
}
