const	Trip = require('../../database/models/trip');

/**
 * DB query to get list of trip ids for a list of service_ids
 * @param  {Array of Strings} ids      list of service_ids
 * @return {Array}       list of trip_ids
 */
function getTripIdsByServiceIds (ids) {

	return Trip.find({service_id: {$in: ids} }, 'trip_id -_id').lean()
	.then((docs) => {
		let list = docs.map(item => item.trip_id);
		return list;
	});
}

module.exports = getTripIdsByServiceIds;