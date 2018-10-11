const config = {
	mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/rtdNextTrain',
	port: process.env.PORT || 8000,
	// staticFeedAPIURLBase: `http://localhost:${process.env.PORT || 8000}/api/staticfeed/`
	staticFeedAPIURLBase: `/api/staticfeed/`
};

module.exports = config;