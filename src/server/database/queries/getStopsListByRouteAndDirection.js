const Route = require('../models/route');
const getStopsListByIds = require('../../database/queries/getStopsListByIds');
const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');

function getStopsByRouteAndDirection(routeid,direction,serviceids,date) {
	if (!serviceids) {
		if (!date) {
			getServiceIdsForDate(new Date())
			.then(ids => {
				return getStops(ids,routeid,direction)
			})
		} else {
			getServiceIdsForDate(date)
			.then(ids => {
				return getStops(ids,routeid,direction)
			})
		}
	} else {
		return getStops(serviceids,routeid,direction)
	}

	function getStops(ids,id,dir) {
		let stopidsList = [];
		let coordType = "";
		console.log("ids ",ids);
		console.log("id ",id);
		console.log("dir ",dir);
		return Route.findOne({
				route_id: id
			})
			.populate({
				path: 'trips',
				model: 'trip',
				match: {
					service_id: {
						$in: ids
					},
					direction_id: dir
				},
				options: {
					sort: {
						trip_id: -1
					}
				},
				populate: {
					path: 'stop_times',
					model: 'stoptime',
					select: 'stop_id -_id',
					options: {
						sort: {
							time: 1,
						},
						lean: true
					}
				}
			})
			.then(route => {
				console.log("route ",route);
				let len = route.trips.length;
				let i = 0;
				for (; i < len; i++) {
					for (let item of route.trips[i].stop_times) {
						if(!stopidsList.includes(item.stop_id)) stopidsList.push(item.stop_id)
					}
				}
				console.log("stopidsList ",stopidsList);
				coordType = route.directions[0];
				return stopidsList;
			})
			.then(stopids => {
				return getStopsListByIds(stopids)
			})
			.then(stops => {
				let regex = /^north|^south/i;
				coordType = regex.test(coordType) ? "lat" : "lng";
				console.log("coordType ",coordType);
				if (stops[0].direction == 0) {
					stops.sort((a,b) => {
						return a[coordType] - b[coordType];
					});
				} else {
					stops.sort((a,b) => {
						return b[coordType] - a[coordType];
					});		
				}
				console.log(`stops[0] sorted by ${coordType}`,stops[0]);
				console.log(`stops[stops.length-1] sorted by ${coordType}`,stops[stops.length-1]);
				return stops;
			})
	}
}

module.exports = getStopsByRouteAndDirection;