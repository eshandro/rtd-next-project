const	Trip = require('../../database/models/trip'),
		StopTime = require('../../database/models/stop_time'),
		getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate'),
		dateHelpers = require('../../utils/dateHelpers');

/**
 * DB query to get list of trips ids for a given date, route, and direction and [serviceids]
 * @param  {JS Date obj} date      Search date
 * @param  {String} route     route_id
 * @param  {Number} direction direction_id 
 * @param  {array} 	serviceIDs list of servicesids - optional
 * @return {Array}           list of trip_ids
 */
function getTripsIdsListByDateAndRouteAndDirection (date, route, direction,serviceIDs) {
	let today = dateHelpers.convertCurrentDateToRTDFormat(date);
	let day = dateHelpers.convertDayToDayName(date.getDay());
	let tripsidsList = [];

	if (!serviceIDs) {
		return getServiceIdsForDate(date)
		.then((ids) => {
			return Trip.find({service_id: {$in: ids},route_id: route, direction_id: direction}, 'trip_id -_id').lean()
			.then((trips) => {
				tripsidsList = trips.map((item,index) => item.trip_id);
				return tripsidsList;		
			});
		});
	} else {
		return Trip.find({service_id: {$in: serviceIDs},route_id: route, direction_id: direction}, 'trip_id -_id').lean()
		.then((trips) => {
			tripsidsList = trips.map((item,index) => item.trip_id);
			return tripsidsList;		
		});
	}
}

module.exports = getTripsIdsListByDateAndRouteAndDirection;