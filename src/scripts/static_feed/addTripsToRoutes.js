const	Trip = require('../../../database/models/trip'),
		Route = require('../../../database/models/route');

function addTrips(doc) {
	console.log("addTrips called");
	console.log("doc in addTrips ",doc);
	// First clear out existing trips
	doc.update({trips: []})
	.then(() => {
		Trip.find({route_id: doc.route_id})
		.then((trips) => {
			doc.trips = trips;
			return doc.save();
		})
	})
	
}

function getTrips(routeID) {
	return Trip.find({route_id: routeID});
}


function addTripsToRoutes() {

	let routesCursor = Route.find({},'route_id trips').cursor();
	console.log("addTripsToRoutes called")
	// routesCursor.on('data', (doc) => {
	// })
	// routesCursor.on('close', () => {
	// 	console.log("routesCursor close ");
	// });
	routesCursor.eachAsync((doc) => {
		console.log("eachAsync called");
		console.log("doc.route_id in eachAsync ",doc.route_id);
		// First clear out existing trips
		doc.update({trips: []})
		.then(() => {
			return getTrips(doc.route_id);
		})
		.then((trips) => {
			// console.log("trips[0] ",trips[0]);
			return doc.update({trips: trips})
		})
		// .then(() => {
		// 	Trip.find({route_id: doc.route_id})
		// 	.then((trips) => {
		// 		doc.trips = trips;
		// 		return doc.save();
		// 	})
		// })		
	})
	.then(() => {
		console.log('routesCursor done!');
		return true;
	})

}
module.exports = addTripsToRoutes;