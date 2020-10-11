const BaseModel = require('./BaseModel')

class ConferenceModel extends BaseModel {
  static get tableName() { return 'conferences' }
  static get idColumn() { return 'conference_uid' }
}

module.exports = ConferenceModel;
