const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
	time = arrival_time, RTD stoptimes have identical arrival and departure times
			Note: time to be stored in 24 hour time, e.g. 6:05 PM = 1805
			Note: Trips that span multiple dates will have stop times greater than 24:00:00. For example, 
			if a trip begins at 10:30:00 p.m. and ends at 2:15:00 a.m. on the following day, the stop times 
			would be 22:30:00 and 26:15:00. Entering those stop times as 22:30:00 and 02:15:00 would 
			not produce the desired results.
	stop_id = unique id for stop
	trip_id = references id in trips collection
	stop_sequence = The stop_sequence field identifies the order of the stops for a particular trip. The 
						values for stop_sequence must be non-negative integers, and they must increase along the trip.
	pickup_type = indicates whether passengers are picked up at a stop as part of the normal schedule or whether 
					a pickup at the stop is not available. 0-Regulary scheduled, 1-No pickup available
					RTD only uses a blank ("") or 1 pickup_type
	drop_off_type = same as above only applicable to dropoffs vs pickups
*/

// Direction is determined by stop_id, each stop has 2 stop_ids - one for each direction
// Not sure ^^ is correct, may be by stop_sequence or pickup_type
// Note time to be stored in 24 hour time, e.g. 6:05 PM = 1805
const StopTimeSchema = new Schema ({
	time: String,
	stop_id: String,
	trip_id: String,
	stop_sequence: Number,
	pickup_type: Number,
	drop_off_type: Number
});

const StopTime = mongoose.model('stoptime', StopTimeSchema)

module.exports = StopTime;