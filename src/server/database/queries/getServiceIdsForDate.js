const	Calendar = require('../../database/models/calendar'),
		dateHelpers = require('../../src/scripts/dateHelpers');

/**
 * DB query to get list of service ids for a given date
 * @param  {JS Date obj} date      Search date
 * @return {Array}       list of service_ids
 */
function getServiceIdsForDate (date) {
	let today = dateHelpers.convertCurrentDateToRTDFormat(date);
	let day = dateHelpers.convertDayToDayName(date.getDay());

	return Calendar.find({start_date: {$lte: today}, end_date: {$gte: today}, [day]: {$ne: 0} }, 'service_id -_id').lean()
	.then((docs) => {
		let list = docs.map(item => item.service_id);
		return list;
	});
}

module.exports = getServiceIdsForDate;