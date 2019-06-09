const 	Stop = require('../../database/models/stop'),
		StopTime = require('../../database/models/stop_time'),
		dateHelpers = require('../../utils/dateHelpers'),
		DateTime = require('luxon');

/**
 * gets x number of stoptimes for a given stop
 * @param  {String} stop    stop_id for given stop
 * @param  {Array} tripIds  list of valid trip_ids for given date (getTripIdsByServiceIds)
 * @param  {Number} x       Number of stop times to get, default is 3
 * @return {Obj}         	 list of stoptimes and list of trip_ids for the stop times
 */
function getXNextStopTimesForStop(stop, tripIds, x = 3) {
	let d = new Date(),
	now = dateHelpers.convertCurrentTimeTo24(d);
	// console.log("d ",d);
	// console.log("now ",now);
	return Stop.findOne({
		stop_id: stop
	}).lean()
	.populate({
		path: 'stop_times',
		model: 'stoptime',
		select: 'time trip_id -_id',
		match: {
			trip_id: {
				$in: tripIds
			},
			time: {
				$gt: now
			}
		},
		options: {
			sort: {
				time: 1
			},
			limit: x,
			lean: true
		}
	})
	.then((stop) => {
		let times = stop.stop_times.map((item) => item.time);
		let stopTripIds = stop.stop_times.map((item) => item.trip_id);
		return ({
			times,
			stopTripIds
		});
	});
}

module.exports = getXNextStopTimesForStop;