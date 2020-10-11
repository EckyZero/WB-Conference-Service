const { Model } = require('objection')
const BaseModel = require('./BaseModel')
const ConferenceModel = require('../models/ConferenceModel');

class SessionModel extends BaseModel {
  static get tableName() { return 'sessions' }
  static get idColumn() { return 'session_uid' }

  static get relationMappings(){
    return {
      conference: {
        relation: Model.BelongsToOneRelation,
        modelClass: ConferenceModel,
        join: {
          from: `${this.tableName}.${ConferenceModel.idColumn}`,
          to: `${ConferenceModel.tableName}.${ConferenceModel.idColumn}`
        }
      }
    }
  }
}

module.exports = SessionModel;