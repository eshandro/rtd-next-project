const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Trip = require('../database/models/trip'),
		Route = require('../database/models/route'),
		Stop = require('../database/models/stop');

before((done) => {
	mongoose.connect('mongodb://localhost/rtdNextTrain_test');
	mongoose.connection
	.once('open', () => { 
		console.log('successful connection to db in test_setup.js');
		done(); 
	})
	.on('error', (error) => {
		console.warn('Warning', error);
	});
});

beforeEach((done) => {
	const { routes, stoptimes,stops, trips } = mongoose.connection.collections;
	routes.drop(() => {
		stoptimes.drop(() => {
			stops.drop(() => {
				trips.drop(() => {
					done();
				});
			});
		});
	});
});