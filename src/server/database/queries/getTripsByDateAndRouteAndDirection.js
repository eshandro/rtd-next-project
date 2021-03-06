const	Trip = require('../../database/models/trip'),
		StopTime = require('../../database/models/stop_time'),
		getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate'),
		dateHelpers = require('../../utils/dateHelpers');

/**
 * DB query to get list of trips for a given date, route, and direction and [serviceids]
 * @param  {JS Date obj} date      Search date
 * @param  {String} route     route_id
 * @param  {Number} direction direction_id 
 * @param  {array} 	serviceIDs list of servicesids - optional
 * @return {Array}           list of trip documents
 */
function getTripsByDateAndRouteAndDirection (date, route, direction,serviceIDs) {
	let today = dateHelpers.convertCurrentDateToRTDFormat(date);
	let day = dateHelpers.convertDayToDayName(date.getDay());

	if (!serviceIDs) {
		return getServiceIdsForDate(date)
		.then((ids) => {
			return Trip.find({service_id: {$in: ids},route_id: route, direction_id: direction}).lean()
			.populate({
				path: 'stop_times',
				model: 'stoptime',
				options: {sort: {time:1}, lean: true}
			})
			.then((trips) => {
				return trips;		
			});
		});
	} else {
		return Trip.find({service_id: {$in: serviceIDs},route_id: route, direction_id: direction}).lean()
		.populate({
			path: 'stop_times',
			model: 'stoptime',
			options: {sort: {time:1}, lean: true}
		})
		.then((trips) => {
			return trips;		
		});
	}
}

module.exports = getTripsByDateAndRouteAndDirection;