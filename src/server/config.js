const config = {
	mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/rtdNextTrain',
	mongoHost: process.env.ME_CONFIG_MONGODB_SERVER || 'localhost',
	mongoPort: process.env.ME_CONFIG_MONGODB_PORT || '27017',
	port: process.env.PORT || 8000,
	// staticFeedAPIURLBase: `http://localhost:${process.env.PORT || 8000}/api/staticfeed/`
	staticFeedAPIURLBase: `/api/staticfeed/`
};

module.exports = config;