const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Direction is determined by stop_id, each stop has 2 stop_ids - one for each direction
// Not sure ^^ is correct, may be by stop_sequence or pickup_type
// 
const StopTimeSchema = new Schema ({
	time: String,
	stop_id: Number,
	trip_id: Number,
	stop_sequence: Number,
	pickup_type: Number
});

const StopTime = mongoose.model('stoptime', StopTimeSchema)

module.exports = StopTime;