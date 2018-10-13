const assert = require('assert');
const createStop = require('../../src/server/static_feed/createStopFromJson');

describe('Create a new Stop from JSON', () => {
	let json, newStop;
	json = {
		"stop_id":"34467",
		"stop_code":"34467",
		"stop_name":"40th & Colorado Station Track 1",
		"stop_desc":"Vehicles Travelling East",
		"stop_lat":"39.776071",
		"stop_lon":"-104.942045",
		"zone_id":"",
		"stop_url":"",
		"location_type":"0",
		"parent_station":"34500",
		"stop_timezone":"",
		"wheelchair_boarding":"1"}
	it('creates a single new Stop from JSON', (done) => {
		newStop = createStop(json);
		// console.log("newStop ",newStop);
		assert(newStop.stop_id === json.stop_id);
		done();
	})
	it('is able to add geoJson to location', (done) => {
		assert(newStop.location.coordinates[0] == json.stop_lon);
		assert(newStop.location.coordinates[1] == json.stop_lat);
		// To avoid having an extra document in our data set remove this newly made document
		newStop.remove(done)
	})
});