const { SessionModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(SessionModel.tableName, (table) => {
    table.uuid(SessionModel.idColumn).primary().notNullable()
    table.string('name').index()
    table.integer('conference_order')
    table.uuid('conference_uid')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    
    table.foreign('conference_uid').references('conference_uid').inTable('conferences').onDelete('Cascade')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(SessionModel.tableName)
};
