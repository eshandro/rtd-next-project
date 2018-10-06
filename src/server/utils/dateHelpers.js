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
		switch (new Date().getDay()) {
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

	convertDateStringToDateObject (dateString) {
		// Convert datestring to Date Obj
		// datestring must be in format: '2018-09-24'
		// add T00:00 to force locale time vs UTC time
		let dateObj = new Date(dateString+'T00:00');
		return dateObj;
	}

};



module.exports = dateHelpers;