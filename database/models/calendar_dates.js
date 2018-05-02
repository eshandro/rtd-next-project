const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
	Use calendar_dates.txt in conjunction with calendar.txt, where calendar_dates.txt defines any exceptions 
	to the default service categories defined in the calendar.txt file. If your service is generally regular, 
	with a few changes on explicit dates (for example, to accommodate special event services, or a school schedule), 
	this is a good approach.
	
	service_id = unique id referenced by Trip
	date = date on which there is an exception - YYYYMMDD
	exception_type = indicates if services is available or not on given date 
						* A value of 1 indicates that service has been added for the specified date.
						* A value of 2 indicates that service has been removed for the specified date
 */

const CalendarDatesSchema = new Schema ({
	service_id: String,
	date: String,
	exception_type: Number
});

const CalendarDates = mongoose.model('calendardates', CalendarDatesSchema);

module.exports = CalendarDates;