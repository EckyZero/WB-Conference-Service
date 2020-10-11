const KnexBootstrapper = require('./KnexBootstrapper');
const RedisBootstrapper = require('./RedisBootstrapper');

class AppBootstrapper {
  static initialize() {
    KnexBootstrapper.initialize();
    RedisBootstrapper.initialize();
  }
}

module.exports = {
  AppBootstrapper,
  KnexBootstrapper,
  RedisBootstrapper
}
