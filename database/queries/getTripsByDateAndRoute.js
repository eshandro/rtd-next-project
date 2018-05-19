const	Trip = require('../../database/models/trip'),
		getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate'),
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

	return getServiceIdsForDate(date)
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