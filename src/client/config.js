const config = {
  port: process.env.PORT || 8000,
  staticFeedAPIURLBase: `http://localhost:${process.env.PORT || 8000}/api/staticfeed/`
};

export default config;