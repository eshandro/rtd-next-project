const { DateTime } = require('luxon');
const  globals = require('./globals');
// NOTE: using luxon on server side only to avoid polyfills etc. on client side to deal with browser inconsistencies
// See conversion functions below.

let dateHelpers = {

	convertRTDTimeTo24 (rtdTime) {
		// hh:mm:ss as a string
		return rtdTime.substring(0,rtdTime.lastIndexOf(':')).replace(':','');
	},

	convertCurrentTimeTo24 (current) {
		// current should be a JS Date object
		current = this.convertJSDateTimeZone(current);
		let h = current.getHours().toString();
		if (h.length === 1) {h = '0' + h;}
		let m = current.getMinutes().toString();
		if (m.length === 1) {m = '0' + m;}
		return h + m;
	},

	convertDBTimeTo12(dbTime) {
		// dbTime will be in hhmm format
		let h = dbTime.substring(0,2);
		let m = dbTime.substring(2,4);
		let ampm = h < 12 ? 'AM' : 'PM'; 
		if (h < 10) h = h.substring(1);
		if (h > 12) h = h-12;
		return `${h}:${m} ${ampm}`;
	},

	convertCurrentDateToRTDFormat (currentDate) {
		//currentDate should be a JS Date object
		currentDate = this.convertJSDateTimeZone(currentDate);
		var y,m,d;
		y = currentDate.getFullYear().toString();
		m = (currentDate.getMonth()+1).toString();
		d = currentDate.getDate().toString();
		if (m.length < 2) m = "0" + m;
		if (d.length < 2) d = "0" + d;
		return y+m+d;
	},

	convertDayToDayName (day) {
		let dayName;
		switch (day) {
		case 0:
			dayName = "sunday";
			break;
		case 1:
			dayName = "monday";
			break;
		case 2:
			dayName = "tuesday";
			break;
		case 3:
			dayName = "wednesday";
			break;
		case 4:
			dayName = "thursday";
			break;
		case 5:
			dayName = "friday";
			break;
		case 6:
			dayName = "saturday";
		}
		return dayName;

	},

	convertISODateStringToDateObject (datestring) {
		// Convert datestring to Date Obj
		// datestring must be in format: '2018-09-24'
		let dt = DateTime.fromISO(datestring).setZone(globals.timezone);
		let iso = dt.toISO();
		// iso format is 2019-03-02T10:30:28.566-08:00 and with -08:00 passed to new Date() you'll always
		// get the local time
		let dateObj = new Date(iso.substring(0,iso.lastIndexOf('-')));
		return dateObj;
	},

	convertDateObjToLocalISOString (dateObj,timezone=globals.timezone) {
		// dateObj is js date object
		let iso = DateTime.fromJSDate(dateObj, {zone: timezone}).toISO();
		return iso;
	},

	convertJSDateTimeZone(dateObj,timezone=globals.timezone) {
		let iso = this.convertDateObjToLocalISOString(dateObj,timezone);
		// iso format is 2019-03-02T10:30:28.566-08:00 and with -08:00 passed to new Date() you'll always
		// get the local time
		dateObj = new Date(iso.substring(0,iso.lastIndexOf('-')));
		return dateObj;
	}

};



module.exports = dateHelpers;