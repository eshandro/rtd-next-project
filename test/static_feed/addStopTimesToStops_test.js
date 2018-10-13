const	Stop = require('../../src/server/database/models/stop'),
		StopTime = require('../../src/server/database/models/stop_time'),
		addStopTimesToStops = require('../../src/server/static_feed/addStopTimesToStops'),
		assert = require('assert');

describe("Add StopTimes to each Stop", () => {

	xit("calls the addStopTimesToStops fn and adds stop_times to all stops", (done) => {
		addStopTimesToStops()
		.then((val) => {
			console.log("val in addStopTimesToStops ",val);
			done();
		})
		// .then(data => console.log('data from addTripsToRoutes',data));
	}).timeout(0)

})