const assert = require('assert');
const Route = require('../src/server/database/models/route');
const getStopsListByIds = require('../src/server/database/queries/getStopsListByIds');
const getServiceIdsForDate = require('../src/server/database/queries/getServiceIdsForDate');
	// route_id: String,
	// name: String,
	// shortName: String,
	// desc: String,
	// stops: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'stop'
	// }],
	// // trips: [TripSchema]
	// trips: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'trip'
	// }]
	// {"route_id":"101C","route_short_name":"C","route_long_name":"Union Station to Littleton-Mineral Station","route_desc":"This Route Travels Northbound & Southbound","route_type":"0","route_url":"http://www.rtd-denver.com/Schedules.shtml","route_color":"F79239","route_text_color":"FFFFFF"}
describe.only('Use a Route and its trips to create a list of a route\'s stops', () => {
	it('gets a Route and its trips', (done) => {
		Route.find({route_id: '101D'}).lean()
		.populate({
			path: 'trips',
			model: 'trip',
			options: { lean: true}
		})
		.then((route) => {
			// console.log("route[0].trips[0] ",route[0].trips[0]);
			assert(route[0].trips.length > 0);
			done();
		});
	})
	it('gets a Route and its trips and its stop_times', (done) => {
		getServiceIdsForDate(new Date())
		.then(ids => {
			// console.log("ids ",ids);
			return Route.findOne({
				route_id: '101D'
			})
			.populate({
				path: 'trips',
				model: 'trip',
				match: {
					service_id: {
						$in: ids
					},
					direction_id: 0
				},
				options: {
					sort: {
						trip_id: -1
					}
				},
				populate: {
					path: 'stop_times',
					model: 'stoptime',
					options: {
						sort: {
							time: 1
						}
					}
				}
			})
		})
		.then(route => {
			// console.log("route.trips[0].stop_times ",route.trips[0].stop_times);
			assert(route.trips[0].stop_times.length > 0);
			done();
		})
	})
	it('gets a Route\'s list of unique stop_ids', done => {
		let stopidsList = [];
		getServiceIdsForDate(new Date())
		.then(ids => {
			return Route.findOne({
				route_id: '101D'
			})
			.populate({
				path: 'trips',
				model: 'trip',
				match: {
					service_id: {
						$in: ids
					},
					direction_id: 0
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
		})
		.then(route => {
			let len = route.trips.length;
			let i = 0;
			for (; i < len; i++) {
				for (let item of route.trips[i].stop_times) {
					if(!stopidsList.includes(item.stop_id)) stopidsList.push(item.stop_id)
				}
			}
			// console.log("stopidsList ",stopidsList);
			let copy = new Set(stopidsList);
			assert(stopidsList.length === copy.size);
			return stopidsList
		})
		.then(stopids => {
			return getStopsListByIds(stopids)
		})
		.then(stops => {
			// console.log("stops ",stops);
			stops.sort((a,b) => {
				return a.lng - b.lng;
			});
			// console.log("stops sorted by lng ",stops);
			stops.sort((a,b) => {
				return a.lat - b.lat;
			});
			// console.log("stops sorted by lat ",stops);
			done();
		})
	})
	it('gets a Route\'s list of unique stop_ids and sorts them based on the directions', done => {
		let stopidsList = [];
		let coordType = "";
		getServiceIdsForDate(new Date())
		.then(ids => {
			return Route.findOne({
				route_id: 'A'
			})
			.populate({
				path: 'trips',
				model: 'trip',
				match: {
					service_id: {
						$in: ids
					},
					direction_id: 0
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
		})
		.then(route => {
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
			let reg1 = /^north|^south/i;
			coordType = reg1.test(coordType) ? "lat" : "lng";
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
			done();
		})
	})


});