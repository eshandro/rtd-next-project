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
		.then((updateStaticFeedData) => {
			// console.log("data returned from updateStaticFeed:",data);
			if(!updateStaticFeedData.updateStaticFeed) {
				// don't call filterLightRail
				return ({lightRailDataSuccess: false, msg: "filterLightRail not called because updateStaticFeed failed or not needed"});
			} else {
				return filterLightRail();
			}
		})
		.then((data)=> {
			if (!data.lightRailDataSuccess) {
				return ({updateStaticFeed: false, msg:data.msg});
			} else {
				console.log("data.msg from filterLightRail() ",data.msg);
				let t1 = new Date();
				console.log("start Promise.all after filterLightRail ",t1.toLocaleString("en-US", {timezone: "America/Denver"}));
				return Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()])
					.then((results) => {
						console.log("Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()]) results ",results);
						let 	t2 = Date.now(),
								totalTime = t2-t1,
								d = new Date(totalTime);
						console.log("Promise.all took " + d.getUTCMinutes() + ' mins & ' + d.getUTCSeconds() + ' seconds');
						return addTripsToStops()			
					})
					.catch((err) => {
						console.log("Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()]) err ",err);
						return ({complete: false, msg: err});
					})
			}
		})
		.then((data) => {
			console.log("data from addTripsToStops",data);
			if (!data.complete) {
				return ({updateStaticFeed: false, msg:"addTripsToStops failed"});
			} else {
				return addStopsToRoutes();
			}

		})
		.then((data) => {
			console.log("data from addStopsToRoutes",data);
			if (!data.complete) {
				return ({updateStaticFeed: false, msg:"addStopsToRoutes failed"});
			} else {
				return {updateStaticFeed: true, msg:"Static Feed updated and DB updated"};
			}

		})
		.then((data) => {
			if(!data.updateStaticFeed) {
				console.log("updateStaticFeed: false - ", data.msg);
				mongoose.connection.close(() => {
					console.log("mongoose connection closed because updateStaticFeed: false");
					return;					
				})
			} else {
				console.log("updateStaticFeed: true - ", data.msg);
				mongoose.connection.close(() => {
					console.log("mongoose connection closed updateStaticFeed: true");
					return;					
				})				
			}
		})
		.catch((err) => {
			console.log("error in runUpdateStaticFeed:", err);
			// return ({updateStaticFeed: false, data: err});
			mongoose.connection.close(() => {
				console.log("mongoose connection closed because of err in runUpdateStaticFeed");
				return;					
			})	
		})

})
.on('error', (error) => {
	console.warn('Error in DB connection in runUpdateStaticFeed', error);
});
