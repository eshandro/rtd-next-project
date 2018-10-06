const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const serverConfig = require('./config');

// Initialize Express app
const app = new Express();


// MongoDB Connection
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

mongoose.connect(serverConfig.mongoURL, (error) => {
	if (error) {
		console.log(`MongoDB connection error: ${error}`);
		throw error;
	}
});

const staticFeedRoutes = require('./routes/static-feed-routes');
const staticFeedServices = require('./routes/static-feed-services');
const staticFeedTrips = require('./routes/static-feed-trips');
const staticFeedStops = require('./routes/static-feed-stops');

/**
 * API routes:
 * /api/staticfeed/routes/routes_list
 * /api/staticfeed/routes/routes_by_tripids - POST
 * /api/staticfeed/services/serviceids_by_date/:date
 * /api/staticfeed/trips/tripids_by_serviceids - POST
 * /api/staticfeed/trips/trips_by_date_route/:date/:route
 * /api/staticfeed/trips/trips_by_date_route_direction/:date/:route/:direction
 * /api/staticfeed/stops/next_x_stoptimes_for_stop
 * 
**/

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use('/api/staticfeed/routes', staticFeedRoutes);
app.use('/api/staticfeed/services', staticFeedServices);
app.use('/api/staticfeed/trips',staticFeedTrips);
app.use('/api/staticfeed/stops',staticFeedStops);


app.listen(serverConfig.port, (error) => {
	if (!error) {
		console.log(`Express server running on port ${serverConfig.port}`);
	} else {
		console.log(`Express server error: ${error}`);
		throw error;
	}
})

