const environment = process.env.ENVIRONMENT || 'local'
const knexfile = require('../../knexfile')[environment];
const dbManager = require('knex-db-manager');

const configs = {
  knex: knexfile,
  dbManager: {
    superUser: 'postgres',
    superPassword: 'postgres'
  }
}

const db = dbManager.databaseManagerFactory(configs);

module.exports = db;