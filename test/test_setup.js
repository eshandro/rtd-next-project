const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const Trip = require('../src/server/database/models/trip'),
		Route = require('../src/server/database/models/route'),
		Stop = require('../src/server/database/models/stop'),
		StopTime = require('../src/server/database/models/stop_time');

before((done) => {
	// mongoose.connect('mongodb://localhost/rtdNextTrain_test');
	mongoose.connect('mongodb://localhost/rtdNextTrain',{ useNewUrlParser: true, useCreateIndex: true });
	// mongoose.set("debug", true);
	mongoose.connection
	.once('open', () => { 
		console.log('successful connection to db in test_setup.js');
		done(); 
	})
	.on('error', (error) => {
		console.warn('Warning', error);
	});
});

// beforeEach((done) => {
// 	const { routes, stoptimes,stops, trips } = mongoose.connection.collections;
// 	routes.drop(() => {
// 		stoptimes.drop(() => {
// 			stops.drop(() => {
// 				trips.drop(() => {
// 					console.log("all collections dropped in beforeEach in test_setup")
// 					done();
// 				});
// 			});
// 		});
// 	});
// });
