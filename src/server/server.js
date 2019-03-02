const Express = require('express');
const mongoose = require('mongoose');
const {CronJob} = require('cron');
const mongoBackup = require('./database/mongodb_backup');
const {exec} = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');
const serverConfig = require('./config');

// Initialize Express app
const app = new Express();


// MongoDB Connection
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
	if (error) {
		console.log(`MongoDB connection error: ${error}`);
		throw error;
	} else {
		// mongo db backup every morning at 1:45 a.m.
		const job = new CronJob('45 1 * * *', function() {
			console.log("mongoBackup runs");
			mongoBackup();
		});
		// // static feed update every morning at 4:45 a.m.
		const job2 = new CronJob('45 4 * * *', function() {
			console.log("staticfeed update runs");
			exec("node ./src/server/static_feed/initUpdateStaticFeed.js", function(error, stdout, stderr){
				if (error) {
					console.error(`exec error in initUpdateStaticFeed ran in server.js: ${error}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
				console.log(`stderr: ${stderr}`);
			});
		});
		job.start();
		job2.start();

		// Check if db has data and if not updateFeed . This is for initial app load with no data.
		if (process.env.NODE_ENV === 'production') {
			const Routes = require('./database/models/route');
			Routes.countDocuments({}).exec((err, count) => {
				if (err) {
					console.log("err in count for Routes ",err);
					return;
				}
				if(count === 0) {
					const exec = require('child_process').exec;
					let cmd = "node src/server/static_feed/initUpdateStaticFeed.js true";
					exec(cmd,function(error,stdout,stderr) {
						console.log("error in server.js cmd to initUpdateStaticFeed ",error);
						console.log("stdout in server.js cmd to initUpdateStaticFeed",stdout);
						console.log("stderr in server.js cmd to initUpdateStaticFeed",stderr);
					});				

				}
			});
		}
	}
});

const staticFeedRoutes = require('./routes/static-feed-routes_routes');
const staticFeedServices = require('./routes/static-feed-services_routes');
const staticFeedTrips = require('./routes/static-feed-trips_routes');
const staticFeedStops = require('./routes/static-feed-stops_routes');
const staticFeedStopTimes = require('./routes/static-feed-stoptimes_routes');

/**
 * API routes:
 * /api/staticfeed/routes/routes_list
 * /api/staticfeed/routes/routes_by_tripids - POST
 * /api/staticfeed/services/serviceids_by_date/:date
 * /api/staticfeed/trips/tripids_by_serviceids - POST
 * /api/staticfeed/trips/trips_by_date_route/:date/:route
 * /api/staticfeed/trips/trips_by_date_route_direction/:date/:route/:direction
 * /api/staticfeed/stops/stops_by_stopids/ - POST
 * /api/staticfeed/stops/stops_by_direction/:dir
 * /api/staticfeed/stoptimes/next_x_stoptimes_for_stop
 * 
**/

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false }));
app.use(Express.static(path.join(__dirname, '../../dist')));
app.use('/api/staticfeed/routes', staticFeedRoutes);
app.use('/api/staticfeed/services', staticFeedServices);
app.use('/api/staticfeed/trips',staticFeedTrips);
app.use('/api/staticfeed/stops',staticFeedStops);
app.use('/api/staticfeed/stoptimes',staticFeedStopTimes);

// may need this for react-router in the future
// app.get('*', (req,res) => {
// 	res.sendFile(path.join(__dirname, '../../dist/index.html'));
// });


app.listen(serverConfig.port, (error) => {
	if (!error) {
		console.log(`Express server running on port ${serverConfig.port}`);
	} else {
		console.log(`Express server error: ${error}`);
		throw error;
	}
})

