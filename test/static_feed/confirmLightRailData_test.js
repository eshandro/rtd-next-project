const assert = require('assert');
const Trip = require('../../src/server/database/models/trip'),
		Route = require('../../src/server/database/models/route'),
		Stop = require('../../src/server/database/models/stop'),
		StopTime = require('../../src/server/database/models/stop_time'),
		Calendar = require('../../src/server/database/models/calendar'),
		CalendarDates = require('../../src/server/database/models/calendar_dates'),
		getTripsByDateAndRoute = require('../../src/server/database/queries/getTripsByDateAndRoute'),
		getTripsByDateAndRouteAndDirection = require('../../src/server/database/queries/getTripsByDateAndRouteAndDirection'),
		getServiceIdsForDate = require('../../src/server/database/queries/getServiceIdsForDate'),
		getTripIdsByServiceIds = require('../../src/server/database/queries/getTripIdsByServiceIds'),
		getXNextStopTimesForStop = require('../../src/server/database/queries/getXNextStopTimesForStop'),
		getRoutesInfoByTripIds = require('../../src/server/database/queries/getRoutesInfoByTripIds'),
		dateHelpers = require('../../src/server/utils/datehelpers'),
		globals = require('../../src/server/utils/globals');


// We know that Routes are correctly filtered using the route_ids regexp (/101.|103W|^A$|107R|113B|109L/).
// We know that Trips are correctly filtered using the same logic as above. Also create the list of trip_ids used on other filters.
// Need to test of using list of trip_ids gets the correct stop_times



describe('Confirms we\'ve filtered Light Rail Data correct', () => {
	let trip_idsList, stop_idsList;
	xit('can confirm Trips only includes route_ids from regexp', (done) => {
		let count1, count2;
		Trip.count({})
		.then((count) => {
			count1 = count;
			Trip.count({
				'route_id': {
					$regex: globals.lightRailRoutesRegex
				}
			})
			.then((countAgain) => {
				count2 = countAgain;
				assert(count1 === count2);
				done();
			});
		});
	});
	xit('can get a list of trip_ids from Trips that have already been filtered', (done) => {
		Trip.find({}, 'trip_id -_id').lean()
		.then((docs) => {
			trip_idsList = docs.map((item) => item.trip_id);
			// console.log("trip_idsList ",trip_idsList);
			// confirm list of trips is unique
			assert(trip_idsList.length === new Set(trip_idsList).size);
			done();
		});
	});
	xit('can use the trip_idsList to filter stop_times', (done) => {
		let count1, count2;
		StopTime.count({})
		.then((count) => {
			count1 = count;
			StopTime.count({
				'trip_id': {
					$in: trip_idsList
				}
			})
			.then((countAgain) => {
				count2 = countAgain;
				assert(count1 === count2);
				done();
			});
		});
	});
	xit('can get service_id(s) from current date', (done) => {
		let d = new Date();
		let today = dateHelpers.convertCurrentDateToRTDFormat(d);
		let day = dateHelpers.convertDayToDayName(d.getDay());
		Calendar.find({
			start_date: {
				$lt: today
			},
			end_date: {
				$gt: today
			},
			[day]: {
				$ne: 0
			}
		}, 'service_id -_id')
		.then((docs) => {
			console.log("docs ", docs);
			for (let i = 0; i < docs.length; i++) {
				assert(docs[i].service_id);
			}
			done();
		});

	});

	xit('can use list of service_id(s) from current date to get list of Trips by route_id and direction_id', (done) => {
		let d = new Date();
		let today = dateHelpers.convertCurrentDateToRTDFormat(d);
		let day = dateHelpers.convertDayToDayName(d.getDay());
		Calendar.find({
			start_date: {
				$lt: today
			},
			end_date: {
				$gt: today
			},
			[day]: {
				$ne: 0
			}
		}, 'service_id -_id')
		.then((docs) => {
			let list = docs.map(item => item.service_id);
			console.log("list ", list);
			return Promise.resolve(list);
		})
		.then((ids) => {
			Trip.find({
				service_id: {
					$in: ids
				},
				route_id: '101D',
				direction_id: 0
			})
			.populate({
				path: 'stop_times',
				model: 'stoptime',
				options: {
					sort: {
						time: 1
					}
				}
			})
			.then((trips) => {
				console.log("trips.length in Trip.find", trips.length);
				console.log("trips[0] in Trip.find", trips[0]);
				done();
			});
		});
	});
	xit('can use list of service_id(s) from current date to get list of Trips going in one direction using a Route', (done) => {
		let d = new Date();
		let today = dateHelpers.convertCurrentDateToRTDFormat(d);
		let day = dateHelpers.convertDayToDayName(d.getDay());
		Calendar.find({
			start_date: {
				$lt: today
			},
			end_date: {
				$gt: today
			},
			[day]: {
				$ne: 0
			}
		}, 'service_id -_id')
		.then((docs) => {
			let list = docs.map(item => item.service_id);
			console.log("list ", list);
			return Promise.resolve(list);
		})
		.then((ids) => {
			Route.findOne({
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
			.then((route) => {
				console.log("route.trips.length in Route.findOne ", route.trips.length);
				// console.log("route.trips[0] in Route.findOne",route.trips[0]);
				// for(let i=0; i < route.trips.length; i++) {
				// 	console.log("route.trips[i].stop_times[0].time ",route.trips[i].stop_times[0].time);
				// 	console.log("route.trips[i].trip_id ",route.trips[i].trip_id);
				// }
				// console.log("route.trips[0].stop_times ",route.trips[0].stop_times);
				// console.log("route.trips[route.trips.length-1].stop_times ",route.trips[route.trips.length-1].stop_times);
				done();
			});
		});
	});
	it('can use a query function to get list of trips for a given day and route', (done) => {
		let count1, count2;
		let d = new Date();
		let today = dateHelpers.convertCurrentDateToRTDFormat(d);
		let day = dateHelpers.convertDayToDayName(d.getDay());
		Calendar.find({
			start_date: {
				$lte: today
			},
			end_date: {
				$gte: today
			},
			[day]: {
				$ne: 0
			}
		}, 'service_id -_id')
		.then((docs) => {
			let list = docs.map(item => item.service_id);
			// console.log("list in Calendar.find ",list);
			return Promise.resolve(list);
		})
		.then((ids) => {
			Trip.find({
				service_id: {
					$in: ids
				},
				route_id: '101D'
			})
			.populate({
				path: 'stop_times',
				model: 'stoptime',
				options: {
					sort: {
						time: 1
					}
				}
			})
			.then((trips) => {
				console.log("trips.length in Trip.find", trips.length);
				count1 = trips.length;
				getTripsByDateAndRoute(d, '101D')
				.then((trips2) => {
					console.log("trips2.length ", trips2.length);
					// console.log("trips2[0] ",trips2[0]);
					count2 = trips2.length;
					assert(count1 === count2);
					done();
				});
			});
		});
	});
	it('can use a query function to get list of trips for a given day and route and given direction', (done) => {
		let count1, count2;
		let d = new Date();
		let today = dateHelpers.convertCurrentDateToRTDFormat(d);
		let day = dateHelpers.convertDayToDayName(d.getDay());
		Calendar.find({
			start_date: {
				$lte: today
			},
			end_date: {
				$gte: today
			},
			[day]: {
				$ne: 0
			}
		}, 'service_id -_id')
		.then((docs) => {
			let list = docs.map(item => item.service_id);
			return Promise.resolve(list);
		})
		.then((ids) => {
			Trip.find({
				service_id: {
					$in: ids
				},
				route_id: '101D',
				direction_id: 0
			})
			.populate({
				path: 'stop_times',
				model: 'stoptime',
				options: {
					sort: {
						time: 1
					}
				}
			})
			.then((trips) => {
				console.log("trips.length in Trip.find", trips.length);
				count1 = trips.length;
				getTripsByDateAndRouteAndDirection(d, '101D', 0)
				.then((trips2) => {
					console.log("trips2.length ", trips2.length);
					// console.log("trips2[0] ",trips2[0]);
					count2 = trips2.length;
					assert(count1 === count2);
					done();
				});
			});
		});
	});
	it('can use a query function to get list of service_ids for a date', (done) => {
		let count1, count2;
		let d = new Date();
		let today = dateHelpers.convertCurrentDateToRTDFormat(d);
		let day = dateHelpers.convertDayToDayName(d.getDay());
		Calendar.find({
			start_date: {
				$lte: today
			},
			end_date: {
				$gte: today
			},
			[day]: {
				$ne: 0
			}
		}, 'service_id -_id')
		.then((docs) => {
			let list = docs.map(item => item.service_id);
			return Promise.resolve(list);
		})
		.then((ids) => {
			count1 = ids.length;
			getServiceIdsForDate(d)
			.then((list) => {
				console.log("list ", list);
				count2 = list.length;
				assert(count1 === count2);
				done();
			});

		});
	});
	xit('can get a list of next 3 stoptimes for a given stop and direction and time', (done) => {
		let d = new Date(),
		now = dateHelpers.convertCurrentTimeTo24(d),
		times,
		stopTripIds,
		routesInfo;
		getServiceIdsForDate(d)
		.then((serviceIds) => {
			return getTripIdsByServiceIds(serviceIds);
		})
		.then((tripIds) => {
			return Stop.findOne({
				stop_id: '24894'
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
					limit: 3,
					lean: true
				}
			})
			.then((stop) => {
				console.log("stop.stop_times.length ", stop.stop_times.length);
				console.log("stop.stop_times ", stop.stop_times);
				times = stop.stop_times.map((item) => item.time);
				console.log("times ", times);
				stopTripIds = stop.stop_times.map((item) => item.trip_id);
				console.log("stopTripIds ", stopTripIds);
				return ({
					times: times,
					stopTripIds: stopTripIds
				});
			});
		})
		.then((data) => {
			Trip.find({
				trip_id: {
					$in: data.stopTripIds
				}
			}, 'route_id headsign direction_id -_id').lean()
			.then((routes) => {
				routesInfo = routes;
				console.log("routesInfo ", routesInfo);
				done();
			});
		});

	});
	it('can use query functions to get a list of next x stoptimes for a given stop and direction and time', (done) => {
		let d = new Date(),
		now = dateHelpers.convertCurrentTimeTo24(d);
		getServiceIdsForDate(d)
		.then((serviceIds) => {
			return getTripIdsByServiceIds(serviceIds);
		})
		.then((tripIds) => {
			return getXNextStopTimesForStop('24894', tripIds, 1);
		})
		.then((stopTimes) => {
			console.log("stopTimes.times ", stopTimes.times);
			return getRoutesInfoByTripIds(stopTimes.stopTripIds);
		})
		.then((routesInfo) => {
			console.log("routesInfo ", routesInfo);
			done();
		});
	});
	xit('BROKEN, save for mapReduce sample can get all stops for a given route, date, and direction', (done) => {
		let d = new Date();
		getTripsByDateAndRouteAndDirection(d, '101D', 0)
		.then((trips) => {
			trips[0].stop_times.sort((a, b) => a.stop_sequence - b.stop_sequence);
			return trips[0].stop_times.map(item => item.stop_id);
		})
		.then((stopIds) => {
			console.log("stopIds ", stopIds);
			// return Stop.find({stop_id: {$in: stopIds}}, '-stop_times',{}).lean()
			let o = {};
			o.map = function() {
						let order = inputs.indexOf(this.stop_id);
						emit(order, {
							doc: this
						});
					};
			o.reduce = 	function(key, value) { return value.doc; };
			o.out = { "inline": 1 };
			o.query = { "stop_id": { "$in": stopIds }};
			o.scope = { "inputs": stopIds };
			let docs;
			return Stop.mapReduce(o, function (err, results) {
				docs = results.results.map(function(current,index) { 
					return current.value.doc;
				});
				console.log("docs[0].stop_id ",docs[0].stop_id);
			})
			.then(() => docs);
		})
		.then((docs) => {
			// stops do not come in the order of the stop_ids array created in the .then((trips))
			let stops = docs.map(function(current,index) {
				return current.stop_id;
			});
			console.log("stops ",stops);
			done();
		});
	});
	it('can get all stops for a given route, date, and direction', (done) => {
		let d = new Date();
		getTripsByDateAndRouteAndDirection(d, '101D', 0)
		.then((trips) => {
			trips[trips.length/2].stop_times.sort((a, b) => a.stop_sequence - b.stop_sequence);
			return trips[trips.length/2].stop_times.map(item => item.stop_id);
		})
		.then((stopIds) => {
			console.log("stopIds ", stopIds);
			let stopsInOrder = [];
			return Stop.find({stop_id: {$in: stopIds}}, '-stop_times -location -_id',{}).lean()
			.then((stops) => {
				stopsInOrder = stops.map((current,index) => {
					let id = stopIds[index],
						i = stops.findIndex(item => item.stop_id === id);
					return stops[i];
				});
				return stopsInOrder;
			});
		})
		.then((docs) => {
			// let stops = docs.map(function(current,index) {
			// 	return current.stop_id;
			// });
			for (let i=0; i < docs.length; i++) {
				console.log(docs[i].name);
			}
			done();

		});
	});

});

