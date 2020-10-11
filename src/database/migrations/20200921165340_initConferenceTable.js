const { ConferenceModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(ConferenceModel.tableName, (table) => {
    table.uuid(ConferenceModel.idColumn).primary().notNullable()
    table.integer('year').index()
    table.integer('month')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(ConferenceModel.tableName)
};
