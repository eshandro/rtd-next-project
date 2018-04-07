const	Trip = require('../../database/models/trip'),
		StopTime = require('../../database/models/stop_time'),
		addStopTimesToTrips = require('../../src/scripts/static_feed/addStopTimesToTrips'),
		assert = require('assert');

describe("Add StopTimes to each Trip", () => {
	// beforeEach((done) => {
	// 	Route.findOne({route_id: "101C"})
	// 		.then((route) => {
	// 			route.update({trips: []})
	// 			.then(() => {
	// 				done();
	// 			})
	// 		})
	// })
	// it("streams all Route Ids from Route", (done) => {
	// 	let routesCursor = Route.find({},'route_id').cursor();
	// 	routesCursor.on('data', (doc) => {
	// 		assert(doc.route_id);
	// 	})
	// 	routesCursor.on('close', () => {
	// 		done();
	// 	})
	// })

	// it("finds all trips associated with given route", (done) => {
	// 	let allTripsCount, filteredTripsCount 
	// 	Trip.count({})
	// 		.then((count) => {
	// 			allTripsCount = count;
		
	// 			Route.findOne({route_id: "101C"})
	// 				.then((route) => {
	// 					Trip.count({route_id: route.route_id})
	// 					.then((count) => {
	// 						filteredTripsCount = count;
	// 						assert(filteredTripsCount < allTripsCount);
	// 						done();
	// 					})
	// 				})
	// 		}) 
	// })

	// it("adds all trips associated with given route to route.trips", (done) => {

	// 	Trip.find({route_id: "101C"})
	// 	.then((foundTrips) => {
	// 		return Route.findOneAndUpdate({route_id: "101C"}, {trips: foundTrips},{new:true})
	// 	})
	// 	.then((updatedRoute) => {
	// 		updatedRoute.populate('trips').execPopulate()
	// 		.then(() => {

	// 			assert(updatedRoute.trips[0].route_id === "101C")
	// 			done();
	// 		})
	// 	})
	// 	// .then((route2) => {
	// 	// 	assert(route2.trips[0].route_id === route.route_id);
	// 	// 	done();
	// 	// })

	// })
	it("calls the addStopTimesToTrips fn and adds stop_times to all Trips", (done) => {
		addStopTimesToTrips()
		.then((val) => {
			console.log("val in addStopTimesToTrips ",val);
			done();
		})

	}).timeout(0)

})