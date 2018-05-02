const Calendar = require('../../../database/models/calendar');
/** json obj **/
// "service_id": "WK_merged_112042900",
// "start_date": "20180520",
// "end_date": "20180825",
// "monday": "1",
// "tuesday": "1",
// "wednesday": "1",
// "thursday": '"',
// "friday": "1",
// "saturday": "0",
// "sunday": "0" 

/** Calendar Schema: **/
// service_id: String,
// start_date: String,
// end_date: String,
// monday: Number,
// tuesday: Number,
// wednesday: Number,
// thursday: Number,
// friday: Number,
// saturday: Number,
// sunday: Number,

function createCalendar(json) {
	let newCalendar = new Calendar ({
		service_id: json.service_id,
		start_date: json.start_date,
		end_date: json.end_date,
		monday: json.monday,
		tuesday: json.tuesday,
		wednesday: json.wednesday,
		thursday: json.thursday,
		friday: json.friday,
		saturday: json.saturday,
		sunday: json.sunday
	});
	return newCalendar;
}

module.exports = createCalendar;