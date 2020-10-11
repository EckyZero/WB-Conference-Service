const BaseModel = require('./BaseModel')

class PersonModel extends BaseModel {
  static get tableName() { return 'people' }
  static get idColumn() { return 'person_uid' }
}

module.exports = PersonModel;
