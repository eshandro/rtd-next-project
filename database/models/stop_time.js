const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Direction is determined by stop_id, each stop has 2 stop_ids - one for each direction
// Not sure ^^ is correct, may be by stop_sequence or pickup_type
// Note time to be stored in 24 hour time, e.g. 6:05 PM = 1805
const StopTimeSchema = new Schema ({
	time: String,
	stop_id: String,
	trip_id: String,
	stop_sequence: Number,
	pickup_type: Number
});

const StopTime = mongoose.model('stoptime', StopTimeSchema)

module.exports = StopTime;