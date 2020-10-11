const { TalkModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(TalkModel.tableName, (table) => {
    table.uuid(TalkModel.idColumn).primary().notNullable()
    table.string('title').index()
    table.text('description')
    table.text('quote')
    table.text('thumbnail_url')
    table.text('reference_url')
    table.integer('session_order')
    table.uuid('session_uid')
    table.uuid('speaker_uid')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()) 

    table.foreign('session_uid').references('session_uid').inTable('sessions').onDelete('Cascade')
    table.foreign('speaker_uid').references('speaker_uid').inTable('speakers').onDelete('Cascade')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TalkModel.tableName)
};
