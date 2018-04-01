const	Trip = require('../../database/models/trip'),
		Route = require('../../database/models/route'),
		assert = require('assert');

describe("Add Trips to each Route", () => {
	it("streams all Route Ids from Route", (done) => {
		let routesCursor = Route.find({},'route_id').cursor();
		routesCursor.on('data', (doc) => {
			assert(doc.route_id);
		})
		routesCursor.on('close', () => {
			done();
		})
	})

	it("finds all trips associated with given route", (done) => {
		let allTripsCount, filteredTripsCount 
		Trip.count({})
			.then((count) => {
				allTripsCount = count;
				console.log("allTripsCount ",allTripsCount);
		
				Route.findOne({route_id: "101C"})
					.then((route) => {
						Trip.count({route_id: route.route_id})
						.then((count) => {
							filteredTripsCount = count;
							console.log("filteredTripsCount ",filteredTripsCount);
							assert(filteredTripsCount < allTripsCount);
							done();
						})
					})
			}) 
	})

	it("adds all trips associated with given route to route.trips", (done) => {
		done()
	})

})