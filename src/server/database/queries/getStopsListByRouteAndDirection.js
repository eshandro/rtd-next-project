const Route = require('../models/route');
// const getStopsList = require('../../database/queries/getStopsListByIdsAndDirection');
const getStopsList = require('../../database/queries/getStopsListByIds');
const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');


/**
 * This function never quite worked ... see notes in gettingstopsfromroutes.txt file -- stops out of order
 * Ended up adding a list of stops to globals.js
 * Gets a list of stops for a given route and direction. 
 * The list is a list of all possible stops on a route and not specific to a particular trip
 * @param  {string} routeid    
 * @param  {number} dir 
 * @return {array}  array of stops objects
 */
function getStopsByRouteAndDirection(routeid,dir) {
		let stopidsList = [];
		
		console.log("routeid ",routeid);
		console.log("dir ",dir);
		return Route.findOne({
				route_id: routeid
			})
			.populate({
				path: 'trips',
				model: 'trip',
				match: {
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
				let len = route.trips.length;
				let i = 0;
				for (; i < len; i++) {
					for (let item of route.trips[i].stop_times) {
						if(!stopidsList.includes(item.stop_id)) stopidsList.push(item.stop_id);
					}
				}
				console.log("stopidsList ",stopidsList);
				return stopidsList;
			})
			.then(stopids => {
				return getStopsList(stopids);
			})
			.then(stops => {
				// stopidsList is sorted by stop_sequence, but when using that array in the $in select  
				// of the DB query we can't control the order of stops, so lets use stopidsList to 
				// sort stops returned from the DB
				console.log("stops:");
				for(let j=0; j<stops.length;j++) {
					console.log(stops[j].stop_id);
				}
				let sortObj = {};
				for (let i=0, len = stopidsList.length; i < len; i++) {
					sortObj[stopidsList[i]] = i;
				}
				console.log("sortObj ",sortObj);
				stops.sort((a,b) => {
					return sortObj[a.stop_id] - sortObj[b.stop_id];
				});
				console.log("sorted stops:");
				for(let k=0; k<stops.length;k++) {
					console.log(stops[k].stop_id);
				}
				let uniqueStops = [];
				let stopsDict = {};
				stops.forEach(item => {
					if (!stopsDict[item.name]) {
						uniqueStops.push(item);
						stopsDict[item.name] = true;
					}
				});
				return uniqueStops;

				// return stops;
			});
}

module.exports = getStopsByRouteAndDirection;