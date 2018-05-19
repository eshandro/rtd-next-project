const	Trip = require('../../database/models/trip');

/**
 * DB query to get route info for given trip_ids
 * @param  {Array} tripIds list of trip_ids
 * @return {Array}         list of routes with route_id, headsign, & direction
 */
function getRoutesInfoByTripIds (tripIds) {
	return Trip.find({trip_id: {$in: tripIds}}, 'route_id headsign direction_id -_id').lean()
			.then((routesInfo) => {
				return routesInfo
			})
}

module.exports = getRoutesInfoByTripIds;