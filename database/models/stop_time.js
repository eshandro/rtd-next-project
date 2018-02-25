const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note not sure how to determine direction, maybe need to utilize trips?
const StopTimeSchema = new Schema ({
	time: String,
	trip_id: String,
	direction: String
});

// const StopTime = mongoose.model('stoptime', StopSchema)

module.exports = StopTime;