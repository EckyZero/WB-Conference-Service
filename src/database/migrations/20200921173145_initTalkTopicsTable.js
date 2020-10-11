const { TalkTopicModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(TalkTopicModel.tableName, (table) => {
    table.uuid(TalkTopicModel.idColumn).primary().notNullable()
    table.uuid('talk_uid')
    table.uuid('topic_uid')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    table.foreign('talk_uid').references('talk_uid').inTable('talks').onDelete('Cascade')
    table.foreign('topic_uid').references('topic_uid').inTable('topics').onDelete('Cascade')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TalkTopicModel.tableName)
};