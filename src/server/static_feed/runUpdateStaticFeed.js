const	filterLightRail = require('./filterLightRailToDB'),
		updateStaticFeed = require('./updateStaticFeed'),
		addTripsToRoutes = require('./addTripsToRoutes'),
		addStopTimesToStops = require('./addStopTimesToStops'),
		addStopTimesToTrips = require('./addStopTimesToTrips'),
		globals = require('../utils/globals'),
		serverConfig = require('../config');


// DB Connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

// In the future likely won't need this db connection and corresponding code, because 
// db connection will be active in the app
mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection
	.once('open', () => { 
		console.log('successful connection to db in runUpdateStaticFeed');
		// Because this takes several minutes to run, it is being run as a child_process to 
		// free up the main process

		// First, tell main process we're ready
		process.send('ready');

		process.on('message', (msg) => {
			if (msg === 'update') {
				console.log("msg sent to child_process ",msg);
				runUpdateStaticFeed(false)
					.then((result) => {
						console.log("result ",result);
						process.send(result);
					});
			} else if (msg === 'force update') {
				console.log("msg sent to child_process ",msg);
				runUpdateStaticFeed(true)
					.then((result) => {
						console.log("result ",result);
						process.send(result);
					});
			}
		});
	})
	.on('error', (error) => {
		console.warn('Error in DB connection in runUpdateStaticFeed', error);
	});

const fs = require('fs');
const path = require('path');

function deleteJsonFiles(directory) {
	fs.readdir(directory, (err, files) => {
	  if (err) throw err;

	  for (const file of files) {
	    fs.unlink(path.join(directory, file), err => {
	      if (err) throw err;
	    });
	  }
	});
}



function runUpdateStaticFeed(force) {
	console.log('runUpdateStaticFeed called with ',force);
	console.log("update Started at ", new Date().toLocaleString("en-US", {timezone: "America/Denver"}));
	/**
	 * Runs updateStaticFeed to:
	 * 1. determine if feed needs updating. if yes, then:
	 * 2. download zip file and unzip text files
	 * 3. parse text files to JSON files
	 * 4. filter JSON files to light rail only JSON files
	 * 5. add light rail JSON data to db
	 * 6. add subdocuments to light rail collections
	 * 7. delete json files when done
	 * 
	 */
	return updateStaticFeed(globals.mainFeedUrl,force)
		.then((updateStaticFeedData) => {
			if(!updateStaticFeedData.updateStaticFeed) {
				// don't call filterLightRail
				return ({lightRailDataSuccess: false, msg: updateStaticFeedData.msg});
			} else {
				return filterLightRail();
			}
		})
		.then((data)=> {
			if (!data.lightRailDataSuccess) {
				deleteJsonFiles(path.join(__dirname, '../../../feed/json/'));
				return ({updateStaticFeed: false, msg:data.msg});
			} else {
				let t1 = new Date();
				console.log("start adding references ",t1.toLocaleString("en-US", {timezone: "America/Denver"}));
				// return Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()])
				// 	.then((results) => {
				// 		console.log("Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()]) results ",results);
				// 		let t2 = Date.now(),
				// 			totalTime = t2-t1,
				// 			d = new Date(totalTime);
				// 		console.log("Promise.all took " + d.getUTCMinutes() + ' mins & ' + d.getUTCSeconds() + ' seconds');
				// 		return ({updateStaticFeed:true,msg:"References added to collections in Promise.all"});
				// 	})
				// 	.catch((err) => {
				// 		console.log("Promise.all([addTripsToRoutes(), addStopTimesToStops(), addStopTimesToTrips()]) err ",err);
				// 		return ({complete: false, msg: err});
				// 	});
				return addTripsToRoutes()
				.then(data => {
					return addStopTimesToStops()
				})
				.then(data => {
					return addStopTimesToTrips()
				})
				.then(data => {
					console.log("data from adding references via addTripsToRoutes(), addStopTimesToStops(), & addStopTimesToTrips()",data);
					let t2 = Date.now(),
						totalTime = t2-t1,
						d = new Date(totalTime);
					console.log("adding references took " + d.getUTCMinutes() + ' mins & ' + d.getUTCSeconds() + ' seconds');
					deleteJsonFiles(path.join(__dirname, '../../../feed/json/'));
					return ({updateStaticFeed: true, msg: "References added to collections"})
				})
			}
		})
		.then((data) => {
			if(!data.updateStaticFeed) {
				mongoose.connection.close(() => {
					console.log("mongoose connection closed, updateStaticFeed: false, msg:", data.msg);
				});
				return ({success: false, msg:`updateStaticFeed failed ${data.msg}`});
			} else {
				mongoose.connection.close(() => {
					console.log("mongoose connection closed, updateStaticFeed: true, msg: ", data.msg);
					console.log("update finished at ", new Date().toLocaleString("en-US", {timezone: "America/Denver"}));
				});
				return ({success: true, msg:`updateStaticFeed a sucess ${data.msg}`});	
			}
		})
		.catch((err) => {
			mongoose.connection.close(() => {
				console.log("mongoose connection closed because of err in runUpdateStaticFeed: ", err);
			});
			return ({success: false, msg: `error in updateStaticFeed ${err}`});					
		});

}