const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
	Dates in this format "23-Feb-2019 04:27"
*/

const FeedDatesSchema = new Schema({
	date: String,
	lastdate: String
});

const FeedDates = mongoose.model('feeddates', FeedDatesSchema);

module.exports = FeedDates;