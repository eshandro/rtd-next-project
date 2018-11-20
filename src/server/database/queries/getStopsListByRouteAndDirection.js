const Route = require('../models/route');
const getStopsList = require('../../database/queries/getStopsListByIdsAndDirection');
// const getStopsList = require('../../database/queries/getStopsListByIds');
const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');

function getStopsByRouteAndDirection(routeid,direction,serviceids,date = new Date()) {
	if (!serviceids) {
		return getServiceIdsForDate(date)
		.then(ids => {
			return getStops(ids,routeid,direction)
		})
	} else {
		return getStops(serviceids,routeid,direction)
	}

	function getStops(ids,id,dir) {
		let stopidsList = [];
		let coordType = "";
		let uniqueStops = [];
		let stopsDict = {}
		
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
				// console.log("route ",route);
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
				return getStopsList(stopids,dir)
			})
			.then(stops => {
				let regex = /^north|^south/i;
				coordType = regex.test(coordType) ? "lat" : "lng";
				console.log("coordType ",coordType);
				if ( dir == 0 ) {
					stops.sort((a,b) => {
						return a[coordType] - b[coordType];
					});
				} else {
					stops.sort((a,b) => {
						return b[coordType] - a[coordType];
					});		
				}
				// stops.forEach(item => {
				// 	if (!stopsDict[item.name]) {
				// 		uniqueStops.push(item);
				// 		stopsDict[item.name] = true;
				// 	}
				// })
				// return uniqueStops;
				return stops;
			})
	}
}

module.exports = getStopsByRouteAndDirection;