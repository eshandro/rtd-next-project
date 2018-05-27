const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
	service_id = unique id referenced by Trip
	start_date = start date of date range - YYYYMMDD
	end_date = end date of date range - YYYYMMDD
	monday - sunday - binary that indicates whether service is available this day or not (0 or 1)
 */

const CalendarSchema = new Schema({
	service_id: String,
	start_date: String,
	end_date: String,
	monday: Number,
	tuesday: Number,
	wednesday: Number,
	thursday: Number,
	friday: Number,
	saturday: Number,
	sunday: Number,
});

const Calendar = mongoose.model('calendar', CalendarSchema);

module.exports = Calendar;