const assert = require('assert');
const Stop = require('../src/server/database/models/stop');
	// stop_id: Number,
	// name: String,
	// desc: String,
	// // direction: String,
	// lat: Number,
	// long: Number,
	// // stop_times: [{
	// // 	type: Schema.Types.ObjectId,
	// // 	ref: 'stop_time'
	// // }]
	// stop_times: [StopTimeSchema],
	// // trips: [TripSchema]
	// trips: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'trip'
	// }]
	// {"stop_id":"23056","stop_code":"23056","stop_name":"16th & Stout Station","stop_desc":"Vehicles Travelling Southwest","stop_lat":"39.746121","stop_lon":"-104.992838","zone_id":"","stop_url":"","location_type":"0","parent_station":"34115","stop_timezone":"","wheelchair_boarding":"1"},
describe('Create a stop', () => {
	let newStop;
	it('saves a new stop', (done) => {
		newStop = new Stop({
			stop_id: "23056",
			name: "16th & Stout Station",
			desc: "Vehicles Travelling Southwest",
			lat:"39.746121",
			long:"-104.992838",
			stop_times: [],
			trips: []
		});
		newStop.save()
			.then((stop) => {
				assert(!stop.isNew);
				// done();
				stop.remove(done)
			})
	})

});