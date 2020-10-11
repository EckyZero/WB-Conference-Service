const { CallingModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(CallingModel.tableName, (table) => {
    table.uuid(CallingModel.idColumn).primary().notNullable()
    table.string('role')
    table.string('title')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(CallingModel.tableName)
};
