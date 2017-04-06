/**
 * @fileOverview
 *
 * removes all SauceLabs jobs and linked assets
 * removes all local screenshots
 *
 * https://wiki.saucelabs.com/display/DOCS/The+Sauce+Labs+REST+API
 * https://www.npmjs.com/package/saucelabs
 */

'use strict';

const SauceLabs = require("saucelabs"),
			saucelabs = new SauceLabs({
				username: process.env.SAUCE_USERNAME,
				password: process.env.SAUCE_ACCESS_KEY,
			});


saucelabs.getJobs(function (err, jobs) {
	for (let i = 0; i < jobs.length; i++) {
		saucelabs.deleteJob(jobs[i].id, function (err, res) {
			console.log(res);
		});
	}
});
