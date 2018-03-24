const assert = require('assert');
const StopTime = require('../database/models/stop_time');
	// time: String,
	// stop_id: Number,
	// trip_id: Number,
	// stop_sequence: Number,
	// pickup_type: Number
	// {"trip_id":"111674483","arrival_time":"22:43:00","departure_time":"22:43:00","stop_id":"34560","stop_sequence":"1","stop_headsign":"","pickup_type":"0","drop_off_type":"1","shape_dist_traveled":"0"},


describe('Create a Stop_Time', () => {
	let newStopTime;
	it('saves a new stop_time', (done) => {
		newStopTime = new StopTime({
			time: "22:43:00",
			stop_id: "34560",
			trip_id: "111674483",
			stop_sequence: "1",
			pickup_type: "0"
		});
		newStopTime.save()
			.then((stopTime) => {
				assert(!stopTime.isNew);
				done();
			})
	})


});