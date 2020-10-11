const knex = require('../database/knex');
const { Model } = require('objection');

class KnexBootstrapper {

  _knex;

  static get instance() {
    return this._knex;
  }

  static initialize() {
    console.log('test')
    Model.knex(knex)
    console.log('test')
  }
}

module.exports = KnexBootstrapper;
