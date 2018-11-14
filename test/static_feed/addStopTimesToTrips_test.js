const	Trip = require('../../src/server/database/models/trip'),
		StopTime = require('../../src/server/database/models/stop_time'),
		addStopTimesToTrips = require('../../src/server/static_feed/addStopTimesToTrips'),
		assert = require('assert');

describe.only("Add StopTimes to each Trip", () => {

	it("calls the addStopTimesToTrips fn and adds stop_times to all Trips", (done) => {
		addStopTimesToTrips()
		.then((val) => {
			console.log("val in addStopTimesToTrips ",val);
			done();
		})

	}).timeout(0)

})