const assert = require('assert'),
		filterLightRail = require('../../src/scripts/static_feed/filterLightRailToDB');


describe("Filter all data JSON to Light Rail only and persist to DB", () => {
	xit('reads and lists JSON filtered to include light rail only data', (done) => {
		filterLightRail()
			.then((returned) => {
				console.log('returned:', returned )
				done();
			});
	})

});