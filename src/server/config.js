let uri;
if (process.env.MONGO_URL) {
	uri = process.env.MONGO_URL;
}
if (!uri && process.env.NODE_ENV === 'production') {
	uri = "mongodb://heroku_8ndgnl03:dbjk5bpgh6o33ambo2nst8nlbp@ds153495.mlab.com:53495/heroku_8ndgnl03";
}
// console.log("uri ",uri);
const config = {
	mongoURL: uri || 'mongodb://localhost:27017/rtdNextTrain',
	mongoHost: uri ? uri.substring(uri.lastIndexOf('@')+1,uri.lastIndexOf(':')) : 'localhost',
	mongoPort: uri ? uri.substring(uri.lastIndexOf(':')+1,uri.lastIndexOf('/')) : '27017',
	port: process.env.PORT || 8000,
	// staticFeedAPIURLBase: `http://localhost:${process.env.PORT || 8000}/api/staticfeed/`
	staticFeedAPIURLBase: `/api/staticfeed/`
};
// console.table(config);
// mongodb://heroku_8ndgnl03:dbjk5bpgh6o33ambo2nst8nlbp@ds153495.mlab.com:53495/heroku_8ndgnl03
module.exports = config;