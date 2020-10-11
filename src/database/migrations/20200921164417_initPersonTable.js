const { PersonModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(PersonModel.tableName, (table) => {
    table.uuid(PersonModel.idColumn).primary().notNullable()
    table.string('preferred_name').notNullable().index()
    table.string('first_name')
    table.string('middle_name')
    table.string('last_name')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(PersonModel.tableName)
};
