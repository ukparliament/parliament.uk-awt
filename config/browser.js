/**
 * @fileOverview
 *
 * Supported browsers and devices
 * SauceLabs capabilities
 * 	@ https://wiki.saucelabs.com/display/DOCS/Desired+Capabilities+Required+for+Selenium+and+Appium+Tests
 */

'use strict';


module.exports = {
	capabilities: [
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

		// {
		// 	'name': 'Mobile-iOS-safari-9',
		// 	'browserName': 'iPhone',
		// 	'version': '9.0'
		// },
		// {
		// 	'name': 'Mobile-iOS-safari-10',
		// 	'browserName': 'iPhone',
		// 	'version': '10.0'
		// },
		// {
		// 	'name': 'Mobile-android-chrome',
		// 	'browserName': 'android'
		// }
	]
};
