module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 3;
    return config;
  },
};
