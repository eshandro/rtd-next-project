const assert = require('assert'),
		filterLightRail = require('../../src/scripts/static_feed/filterLightRailToDB');

// Because this file drops all collections prior to running filter functionality,
// the only way to successfully run this test is to run all other tests, but comment out the 
// beforeEach drop collections in test_setup.js. Obviously this could cause issues with the  
// other tests. 
// It may be that we need to NOT run this test and un-comment out the beforeEach. 
// Also this test take a couple of minutes to run, so may not want to always be running the test.
// 4/1/2018 confirmed test ran successfully
describe("Filter all data JSON to Light Rail only and persist to DB", () => {
	xit('reads and lists JSON filtered to include light rail only data', (done) => {
		filterLightRail()
			.then((returned) => {
				// console.log('returned:', returned )
				assert(returned.lightRailDataSuccess)
				done();
			});
	}).timeout(0)

});