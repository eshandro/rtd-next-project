const	Trip = require('../../../database/models/trip'),
		Route = require('../../../database/models/route');


function getTrips(routeID) {
	return Trip.find({route_id: routeID});
}


function addTripsToRoutes() {

	let routesCursor = Route.find({},'route_id trips').cursor();

	return routesCursor.eachAsync((doc) => {
		// First clear out existing trips
		doc.update({trips: []})
		.then(() => {
			return getTrips(doc.route_id);
		})
		.then((trips) => {
			return doc.update({trips: trips})
		})
	
	})
	.then(() => {
		console.log('routesCursor done!');
		return Promise.resolve({complete: true});
	})

}
module.exports = addTripsToRoutes;