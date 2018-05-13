const	Trip = require('../../database/models/trip'),
		Calendar = require('../../database/models/calendar'),
		dateHelpers = require('../../src/scripts/dateHelpers');

/**
 * DB query to get list of trips for a given date, route, and direction
 * @param  {JS Date obj} date      Search date
 * @param  {String} route     route_id
 * @param  {Number} direction direction_id 
 * @return {Array}           list of trip documents
 */
function getTripsByDateAndRouteAndDirection (date, route, direction) {
	let today = dateHelpers.convertCurrentDateToRTDFormat(date);
	let day = dateHelpers.convertDayToDayName(date.getDay());

	return Calendar.find({start_date: {$lt: today}, end_date: {$gt: today}, [day]: {$ne: 0} }, 'service_id -_id').lean()
	.then((docs) => {
		let list = docs.map(item => item.service_id);
		return list;
	})
	.then((ids) => {
		return Trip.find({service_id: {$in: ids},route_id: route, direction_id: direction}).lean()
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

module.exports = getTripsByDateAndRouteAndDirection;