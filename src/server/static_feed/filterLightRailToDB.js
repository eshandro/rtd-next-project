/* 
Static Feed Light Rail Info:
-route_id = A for A-line to airport
-route_id = 101 + rail line for C, D, E, F, H, e.g. 101C
-route_id = 103W  for W line
-route_id = 107R for R Line
-route_id = 109L for L Line (new line starting 1/4/18 The L Line will eventually connect up to the A Line at 38th and Downing.)
-route_id = 113B for B Line

1/2018 10 light rail lines
-route_type = 0 includes 8 lines -- C,D,E,F,H,L,R,W
-route_type = 2 includes 2 lines -- A,B
*/

/*

First step is to filter trips.json to only light rail related trips.
Then, we can filter stop_times to only include trip_ids that are in filtered light rail trips.
Then, we can filter stops to on include stop_ids that are in filtered stop_times.

 */
const 	{parser} = require('stream-json'),
		{streamArray} = require('stream-json/streamers/StreamArray'),
		fs = require('fs'),

		createTripFromJson = require("./createTripFromJson"),
		createRouteFromJson = require("./createRouteFromJson"),
		createStopFromJson = require("./createStopFromJson"),
		createStopTimeFromJson = require("./createStopTimeFromJson"),
		createCalendarFromJson = require("./createCalendarFromJson"),
		createCalendarDatesFromJson = require("./createCalendarDatesFromJson"),

		Trip = require('../database/models/trip'),
		Route = require('../database/models/route'),
		Stop = require('../database/models/stop'),
		StopTime = require('../database/models/stop_time'),
		Calendar = require('../database/models/calendar'),
		CalendarDates = require('../database/models/calendar_dates'),

		globals = require('../utils/globals')
		dbBackup = require('../database/mongodb_backup');


/**
	Helper Functions:
	Filter functions used by StreamFilteredArray
**/
function tripsFilter(assembler) {
	// test only top-level objects in the array:
	if(assembler.stack.length == 2 && assembler.key === null && assembler.current){
		if(assembler.current instanceof Array){
			return false;
		}
		// "true" to accept, "false" to reject
		if ( globals.lightRailRoutesRegex.test(assembler.current.route_id) ) {
			return true;
		} 
	}
	// return undefined to indicate our uncertainty at this moment
}

function stopTimesFilter(assembler) {
	if(assembler.stack.length == 2 && assembler.key === null && assembler.current){
		if(assembler.current instanceof Array){
			return false;
		}
		if( trip_ids.includes(assembler.current.trip_id) ){
			// "true" to accept, "false" to reject
			return true;
		}
	}
	// return undefined to indicate our uncertainty at this moment
}

function stopsFilter(assembler) {
	if(assembler.stack.length == 2 && assembler.key === null && assembler.current){
		if(assembler.current instanceof Array){
			return false;
		}
		if( stop_ids.includes(assembler.current.stop_id) ){
			// "true" to accept, "false" to reject
			return true;
		}
	}
	// return undefined to indicate our uncertainty at this moment
}

let trip_ids = [],
	stop_ids = [];
/**
 * create Light Rail only JSON files
 * @param  {string} sourceFile File to be stripped to lightrail only info
 * @param  {function} filterFN Filter function used to filter lightrail only info (see above helper functions)
 * @param  {function} dbFunc 	 Function used to add data to appropriate db model
 * @param  {array} list        List of relevant ids used for filtering
 * @param  {string} testKey    Key used to add to relevant list
 * @return {promise}           object {lightRailDataSuccess: boolean, data: string}
 *                                    lightRailDataSuccess used to determine next step
 *                                    data: error or path to newly create filtered JSON file
 */

function addLightRailData(sourceFile, filterFN, dbFunc, dbModel,list, testKey) {
	let	docs = [];

	return new Promise((resolve,reject) => {
		const errorHandlerRead = (error) => {
			console.log("errorHandlerRead in addLightRailData promise");
			let errMsg = `Unable to read file ${globals.extractedFolder}/json/${sourceFile}:  ${error}`;
			reject(errMsg);
		};

		let read = fs.createReadStream(globals.extractedFolder + "json/" + sourceFile)
			.pipe(parser())
			.pipe(streamArray({objectFilter: filterFN}))
		
		read.on('error', errorHandlerRead);

		read.on("data", function(object){
			if(list && testKey) {
				if(!list.includes(object.value[testKey])) {
					list.push(object.value[testKey]);
				}
			}
			let newDoc = dbFunc(object.value);
			docs.push(newDoc);
		})
		.on("end", function(){
			dbModel.insertMany(docs, (err, documents) => {
				if (err) {
					console.log("err in insertMany ",err);
				}
				read.unpipe();
				resolve({lightRailDataSuccess: true, msg:list ? list : sourceFile});
			});
		});

	})
	.then((data) => {
		return data;
	}, (err) => {
		console.log('err in addLightRailData', err);
		return Promise.reject({lightRailDataSuccess: false, msg: err});
	});
}

/**
 * Function that controls the order of lightrail filtering
 * First, filter routes.json without affecting any other lists
 * Then, filter trips.json to only light rail related trips, creating a list of trip_ids to be used in the next step.
 *	Then, we can filter stop_times to only include trip_ids that are in filtered light rail trips, creating list of stop_ids to 
 *	be used in the next step.
 *	Then, we can filter stops to only include stop_ids that are in filtered stop_times
 * @return {promise} object {lightRailDataSuccess: boolean, data: array}
 *                          lightRailDataSuccess: used to determine next step
 *                          data: list of newly filtered lightrail files
 */
function filterLightRail() {
	let t1, lists = [];
	console.log('filterLightRail called');

	// Drop collections before adding updated data
	return Route.collection.drop()
		.then(() => {
			console.log("Route.collection dropped");
			return Stop.collection.drop();
		})
		.then(() => {
			console.log("Stop.collection dropped");
			return StopTime.collection.drop();
		})
		.then(() => {
			console.log("StopTime.collection dropped");
			return Trip.collection.drop();
		})
		.then(() => {
			console.log("Trip collection dropped");
			return Calendar.collection.drop();
		})
		.then(() => {
			console.log("Calendar collection dropped");
			return CalendarDates.collection.drop();
		})
		.then(() => {
			console.log("CalendarDates collection dropped");
			t1 = new Date();
			console.log("start filterLightRail after drops ",t1.toLocaleString("en-US", {timezone: "America/Denver"}));
			return addLightRailData('routes.json',tripsFilter,createRouteFromJson,Route,false,false)
		})
		.then((data) => {
			if (!data.lightRailDataSuccess) {
				console.log("addLightRailData('routes.json',tripsFilter,createRouteFromJson,Route,false,false) failed");
				return ({lightRailDataSuccess: false, msg: "addLightRailData('routes.json',tripsFilter,createRouteFromJson,Route,false,false) failed"});
			} else {
				lists.push(data.msg);
				return addLightRailData('calendar.json','',createCalendarFromJson,Calendar,false,false);
			}
		})
		.then((data) => {
			if (!data.lightRailDataSuccess) {
				console.log("addLightRailData('calendar.json','',createCalendarFromJson,Calendar,false,false) failed");
				return ({lightRailDataSuccess: false, msg: "addLightRailData('calendar.json','',createCalendarFromJson,Calendar,false,false) failed"});
			} else {
				lists.push(data.msg);
				return addLightRailData('calendar_dates.json','',createCalendarDatesFromJson,CalendarDates,false,false);
			}			
		})
		.then((data) => {
			if (!data.lightRailDataSuccess) {
				console.log("addLightRailData('calendar_dates.json','',createCalendarDatesFromJson,CalendarDates,false,false) failed");
				return ({lightRailDataSuccess: false, msg: "addLightRailData('calendar_dates.json','',createCalendarDatesFromJson,CalendarDates,false,false) failed"});
			} else {
				lists.push(data.msg);
				return addLightRailData('trips.json',tripsFilter,createTripFromJson,Trip,trip_ids,'trip_id');
			}				
		})
		.then((data) => {
			if (!data.lightRailDataSuccess) {
				console.log("addLightRailData('trips.json',tripsFilter,createTripFromJson,Trip,trip_ids,'trip_id'); or call above failed");
				return ({lightRailDataSuccess: false, msg: "addLightRailData('trips.json',tripsFilter,createTripFromJson,Trip,trip_ids,'trip_id') failed"});
			} else {
				lists.push(data.msg);
				return addLightRailData('stop_times.json',stopTimesFilter,createStopTimeFromJson,StopTime,stop_ids,'stop_id');
			}
		})
		.then((data) => {
			if(!data.lightRailDataSuccess) {
				console.log("addLightRailData('stop_times.json',stopTimesFilter,createStopTimeFromJson,StopTime,stop_ids,'stop_id') or call above failed");
				return ({lightRailDataSuccess: false, msg: "addLightRailData('stop_times.json',stopTimesFilter,createStopTimeFromJson,StopTime,stop_ids,'stop_id') failed"});
			} else {
				lists.push(data.msg);
				return addLightRailData('stops.json',stopsFilter,createStopFromJson,Stop,false,false);
			}
		})
		.then((data) => {
			if (!data.lightRailDataSuccess) {
				console.log("addLightRailData('stops.json',stopsFilter,createStopFromJson,Stop,false,false); failed");
				return ({lightRailDataSuccess: false, msg: "addLightRailData('stops.json',stopsFilter,createStopFromJson,Stop,false,false); or call above failed"});
			} else {
				lists.push(data.msg);
				let t2 = Date.now(),
					totalTime = t2-t1,
					d = new Date(totalTime);
				console.log("filterLightRail took " + d.getUTCMinutes() + ' mins & ' + d.getUTCSeconds() + ' seconds');
				
				return ({lightRailDataSuccess: true, msg: lists});
			}
		})
		.catch((err) => {
			console.log("lightRailData err", err);
			return ({lightRailDataSuccess: false, msg: err});
		});

}

module.exports = filterLightRail;
