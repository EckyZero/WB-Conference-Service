const { SpeakerModel } = require('../../models');

exports.up = function(knex) {
  return knex.schema.createTable(SpeakerModel.tableName, (table) => {
    table.uuid(SpeakerModel.idColumn).primary().notNullable()
    table.uuid('calling_uid')
    table.uuid('person_uid')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    table.foreign('calling_uid').references('calling_uid').inTable('callings').onDelete('Cascade')
    table.foreign('person_uid').references('person_uid').inTable('people').onDelete('Cascade')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(SpeakerModel.tableName)
};
