const assert = require('assert');
const trips = require('./trips_data');
const getStops = require('../src/server/database/queries/getStopsList')


describe.only('Trips list is used to get stops', () => {
	let stops = [];
	let stopids = [];
	it('Can get stopids from trips', () => {
		trips.map((item, index) => {
			item.stop_times.map((item2,index2) => {
				stopids.push(item2.stop_id);
			})
		});
		console.log("stopids ",stopids);
		assert(stopids.length > 0);
	})
	it('Can get only unique stopids', () => {
		stopids = [];
		trips.map((item, index) => {
			item.stop_times.map((item2,index2) => {
				if (!stopids.includes(item2.stop_id)) stopids.push(item2.stop_id);
			})
		});
		let len = stopids.length;
		let unique = [... new Set(stopids)];
		let len2 = unique.length;
		console.log("len ",len);
		console.log("len2 ",len2);
		assert(len === len2 );	
	})
	it('Can get stops list', (done) => {
		stopids = [];
		trips.map((item, index) => {
			item.stop_times.map((item2,index2) => {
				if (!stopids.includes(item2.stop_id)) stopids.push(item2.stop_id);
			})
		});
		console.log("stopids: ", stopids);
		getStops(stopids)
		.then(results => {
			console.log("results", results);
			done();
		})

	})
	it("Can get stops list sorted by stop_sequence", (done) => {
		stopids = [];
		let stopidsObj = {};
		let dictionary = {};

		function createObj (currObj) {
			return {
				stop_id: currObj.stop_id,
				stop_sequence: currObj.stop_sequence
			}

		}
		// trips.map((item, index) => {
		// 	item.stop_times.map((item2,index2) => {
		// 		// if (!stopids.includes(item2.stop_id)) stopids.push(createObj(item2));
		// 		// if(!stopidsObj[item2.stop_id]) stopidsObj[item2.stop_id] = createObj(item2);
		// 		if (!dictionary[item2.stop_id]) stopids.push(createObj(item2));
		// 		dictionary[item2.stop_id] = 1
		// 	})
		// });	
		let stoptimes = trips[trips.length/2].stop_times;
		trips[trips.length/2].stop_times.map((item,index) => {
			stopids.push(createObj(item));
		})
		stopids.sort((a,b) => (a.stop_sequence > b.stop_sequence) ? 1 : -1 )
		console.log("stoptimes ",stoptimes);
		console.log("stopids in sort ",stopids);
		console.log("stopids.length ",stopids.length);
		console.log("stopidsObj in sort ",stopidsObj);
		console.log("Object.keys(stopidsObj).length in sort ",Object.keys(stopidsObj).length);
		console.log("Object.keys(dictionary) ",Object.keys(dictionary).length);
		done();
	})

});