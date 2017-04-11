/**
 * @fileOverview
 *
 * Helper functions for our tests
 */

'use strict';

const fs = require('fs'),
			work_dir = process.cwd() + '/screenshot/';

let i = 0;


module.exports = {
	ukp_writeScreenshot: function (data, name) {
		// accept paramenters takeScreenshot()
		// write data to file and save it
		i++;
		fs.writeFileSync(work_dir + name + '-' + i + '.png', data, 'base64');
	}
};
