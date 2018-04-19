const filterLightRail = require('./filterLightRailToDB'),
		updateStaticFeed = require('./updateStaticFeed'),
		addTripsToRoutes = require('./addTripsToRoutes'),
		addStopTimesToStops = require('./addStopTimesToStops'),
		addStopTimesToTrips = require('./addStopTimesToTrips'),
		addTripsToStops = require('./addTripsToStops'),
		addStopsToRoutes = require('./addStopsToRoutes'),
		globals = require('../globals');

// DB Connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/rtdNextTrain');
mongoose.connection
.once('open', () => { 
	console.log('successful connection to db in runUpdateStaticFeed');

	/**
	 * Runs updateStaticFeed to:
	 * 1. determine if feed needs updating. if yes, then:
	 * 2. download zip file and unzip text files
	 * 3. parse text files to JSON files
	 * 4. filter JSON files to light rail only JSON files
	 * 5. add light rail JSON data to db
	 * 6. add subdocuments to light rail collections
	 * 
	 */
	updateStaticFeed(globals.mainFeedUrl,forceUpdate = process.argv[2])
		.then((data) => {
			console.log("data returned from updateStaticFeed:",data);
			if(!data.updateStaticFeed) {
				// don't call filterLightRail
				return ({lightRailDataSuccess: false, data: "filterLightRail not called because updateStaticFeed failed or not needed"});
			} else {
				return filterLightRail();
			}
		})
		.then((data)=> {
			// console.log("data after filterLightRail called or not called: ",data);
			if (!data.lightRailDataSuccess) {
				return ({updateStaticFeed: false, data:data.data});
			} else {
				// return {updateStaticFeed: true, data: data.data};
				// return ({updateStaticFeed: true, data: data.data});
				return Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()])
					.then((results) => {
						console.log("Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()]) results ",results);
						return addTripsToStops()			
					})
					.catch((err) => {
						console.log("Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()]) err ",err);
						return ({complete: false, data: err});
					})
			}
		})
		.then((data) => {
			console.log("data from addTripsToStops",data);
			if (!data.complete) {
				return ({updateStaticFeed: false, data:"addTripsToStops failed"});
			} else {
				return addStopsToRoutes();
			}

		})
		.then((data) => {
			console.log("data from addStopsToRoutes",data);
			if (!data.complete) {
				return ({updateStaticFeed: false, data:"addStopsToRoutes failed"});
			} else {
				return {updateStaticFeed: true, data: "Static Feed updated and DB updated"};
			}

		})
		.catch((err) => {
			console.log("error in updateStaticFeed:", err);
			return ({updateStaticFeed: false, data: err});
		})

})
.on('error', (error) => {
	console.warn('Error in DB connection in runUpdateStaticFeed', error);
});
