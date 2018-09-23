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

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use('/api/staticfeed', staticFeedRoutes);


app.listen(serverConfig.port, (error) => {
	if (!error) {
		console.log(`Express server running on port ${serverConfig.port}`);
	} else {
		console.log(`Express server error: ${error}`);
		throw error;
	}
})

