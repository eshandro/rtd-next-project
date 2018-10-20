const assert = require('assert');
const dateHelpers = require('../src/server/utils/dateHelpers');

describe.only('Dates are manipulated', () => {
	let d = new Date();
	it('Can convert date obj to ISO date string', () => {
		console.log("dateHelpers.convertDateObjToLocaleISOString(d)",dateHelpers.convertDateObjToLocaleISOString(d))
	})

});