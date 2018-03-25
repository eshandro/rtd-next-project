const assert = require('assert');
const dateHelpers = require('../../src/scripts/dateHelpers');

describe('Take a JS date and convert to 24 hour time string', () => {
	it('converts JS date object to String with length of 4', (done) => {
		let now = new Date();
		let converted = dateHelpers.convertCurrentTimeTo24(now);
		assert(converted.length === 4);
		assert(typeof converted === "string");
		done();
	});
	it('converts JS date object that is not length == 4 to 4', (done) => {
		let date = new Date("Sat Mar 24 2018 6:18:22 GMT-0600");
		let converted = dateHelpers.convertCurrentTimeTo24(date);
		assert(converted.length === 4);
		done();
	})
})