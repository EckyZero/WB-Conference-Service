const environment = process.env.ENVIRONMENT || 'local'
const config = require('../../knexfile')[environment];
const Knex = require('knex');

module.exports = Knex(config);