const Route = require('../models/route');
// const getStopsList = require('../../database/queries/getStopsListByIdsAndDirection');
const getStopsList = require('../../database/queries/getStopsListByIds');
const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');


/**
 * Gets a list of stops for a given route and direction. 
 * The list is a list of all possible stops on a route and not specific to a particular trip
 * @param  {string} routeid    
 * @param  {number} direction  
 * @param  {array} serviceids *optional
 * @param  {Date}   date      *optional
 * @return {array}            array of stops objects
 */
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
		let currRoute = '';
		
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
							stop_sequence: 1,
							// time: 1,
						},
						lean: true
					}
				}
			})
			.then(route => {
				currRoute = route.route_id;
				console.log("route.trips[0].stop_times ",route.trips[0].stop_times);
				let len = route.trips.length;
				let i = 0;
				for (; i < len; i++) {
					for (let item of route.trips[i].stop_times) {
						if(!stopidsList.includes(item.stop_id)) stopidsList.push(item.stop_id)
					}
				}
				console.log("stopidsList ",stopidsList);
				return stopidsList;
			})
			.then(stopids => {
				return getStopsList(stopids)
			})
			.then(stops => {
				// stopidsList is sorted by stop_sequence, but when using that array in the $in select  
				// of the DB query we can't control the order of stops, so lets use stopidsList to 
				// sort stops returned from the DB
				console.log("stops:");
				for(let j=0; j<stops.length;j++) {
					console.log(stops[j].stop_id)
				}
				let sortObj = {};
				for (let i=0, len = stopidsList.length; i < len; i++) {
					sortObj[stopidsList[i]] = i;
				}
				console.log("sortObj ",sortObj);
				stops.sort((a,b) => {
					return sortObj[a.stop_id] - sortObj[b.stop_id]
				});
				console.log("sorted stops:");
				for(let k=0; k<stops.length;k++) {
					console.log(stops[k].stop_id)
				}

				return stops;
			})
	}
}

module.exports = getStopsByRouteAndDirection;