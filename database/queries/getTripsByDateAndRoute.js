const	Trip = require('../../database/models/trip'),
		Calendar = require('../../database/models/calendar'),
		dateHelpers = require('../../src/scripts/dateHelpers');

/**
 * DB query to get list of Trips for a given date and route
 * @param  {JS Date object} date  Search date
 * @param  {string} route route_id
 * @return {array}       list of trip documents
 */
function getTripsByDateAndRoute (date, route) {
	let today = dateHelpers.convertCurrentDateToRTDFormat(date);
	let day = dateHelpers.convertDayToDayName(date.getDay());

	return Calendar.find({start_date: {$lt: today}, end_date: {$gt: today}, [day]: {$ne: 0} }, 'service_id -_id').lean()
	.then((docs) => {
		let list = docs.map(item => item.service_id);
		return list;
	})
	.then((ids) => {
		return Trip.find({service_id: {$in: ids},route_id: route}).lean()
		.populate({
			path: 'stop_times',
			model: 'stoptime',
			options: {sort: {time:1}, lean: true}
		})
		.then((trips) => {
			return trips;
		})
	})
}

module.exports = getTripsByDateAndRoute;