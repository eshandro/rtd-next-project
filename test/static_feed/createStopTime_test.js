const assert = require('assert');
const createStopTime = require('../../src/scripts/static_feed/createStopTimeFromJson');

describe('Create a new StopTime from JSON', () => {
	let json, newStopTime;
	json = {
		"trip_id":"111674563",
		"arrival_time":"06:43:00",
		"departure_time":"06:43:00",
		"stop_id":"34560",
		"stop_sequence":"1",
		"stop_headsign":"",
		"pickup_type":"0",
		"drop_off_type":"1",
		"shape_dist_traveled":"0"}
	it('creates a single new StopTime from JSON', (done) => {
		newStopTime = createStopTime(json);
		// console.log("newStopTime ",newStopTime);
		assert(newStopTime.stop_id === json.stop_id);
		done();
	})
	it('correctly converts time value on StopTime', (done) => {
		assert(newStopTime.time.length === 4);
		assert(newStopTime.time === json.arrival_time.substring(0,json.arrival_time.lastIndexOf(':')).replace(':',''));
		// To avoid having an extra document in our data set remove this newly made document
		newStopTime.remove(done)
	})
});