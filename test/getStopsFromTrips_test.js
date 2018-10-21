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
	it('Can get stops list and sort', (done) => {
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

});