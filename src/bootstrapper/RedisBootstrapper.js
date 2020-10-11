const Redis = require('ioredis');

class RedisBootstrapper {

  _redis;

  static get instance() {
    return this._redis;
  }

  static initialize() {
    const host = process.env.ENVIRONMENT === 'local' ? 'localhost' : 'redis'
    this._redis = new Redis({
      connectTimeout:10000,
      host:host,
      password:'',
      port:6379});
  }
}

module.exports = RedisBootstrapper;