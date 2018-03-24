let dateHelpers = {

	convertRTDTimeTo24 (rtdTime) {
		// hh:mm:ss as a string
		return rtdTime.substring(0,rtdTime.lastIndexOf(':')).replace(':','');
	}

	convertCurrentTimeTo24 (current) {
		// current should be a JS Date object
		let h = current.getHours().toString();
		let m = current.getMinutes().toString();
		if (m.length === 1) {m = '0' + m }
		return h + m;
	}

};



module.exports = dateHelpers;