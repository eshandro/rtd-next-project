let dateHelpers = {

	convertRTDTimeTo24 (rtdTime) {
		// hh:mm:ss as a string
		return rtdTime.substring(0,rtdTime.lastIndexOf(':')).replace(':','');
	},

	convertCurrentTimeTo24 (current) {
		// current should be a JS Date object
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
		let ampm = h < 12 ? 'AM' : 'PM' 
		if (h < 10) h = h.substring(1);
		if (h > 12) h = h-12;
		return `${h}:${m} ${ampm}`;
	},

	convertCurrentDateToRTDFormat (currentDate) {
		//currentDate should be a JS Date object
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
		// if no T present add T00:00 to force locale time vs UTC time
		let dateObj;
		if (datestring.indexOf('T') === -1 ) {
			dateObj = new Date(datestring+'T00:00');
		} else {
			dateObj = new Date(datestring.replace(/T.*$/,'T00:00'));
		}
		return dateObj;
	},

	convertDateObjToLocalISOString (dateObj) {
	    function pad(n) { return n < 10 ? '0' + n : n }
		return	dateObj.getFullYear() + '-'
		        + pad(dateObj.getMonth() + 1) + '-'
		        + pad(dateObj.getDate()) + 'T'
		        + pad(dateObj.getHours()) + ':'
		        + pad(dateObj.getMinutes()) + ':'
		        + pad(dateObj.getSeconds())
	}

};



module.exports = dateHelpers;