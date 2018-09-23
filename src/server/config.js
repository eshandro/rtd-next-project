const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/rtdNextTrain',
  port: process.env.PORT || 8000,
};

module.exports = config;