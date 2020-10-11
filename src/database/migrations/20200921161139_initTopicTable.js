const { TopicModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(TopicModel.tableName, (table) => {
    table.uuid(TopicModel.idColumn).primary().notNullable()
    table.string('title').notNullable().index()
    table.string('tag').notNullable().index()
    table.text('reference_url')
    table.integer('talks_count')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TopicModel.tableName)
};
