const CalendarDates = require('../../../database/models/calendar_dates');
/** json obj **/
// "service_id": "WK_merged_112042900,
// "date": "20180528",
// "exception_type: "2"

/** Calendar Schema: **/
// service_id: String,
// date: String,
// exception_type: Number

function createCalendarDates(json) {
	let newCalendarDates = new CalendarDates ({
		service_id: json.service_id,
		date: json.date,
		exception_type: json.exception_type

	});
	return newCalendarDates;
}

module.exports = createCalendarDates;