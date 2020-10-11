const { Model } = require('objection')
const BaseModel = require('./BaseModel')
const CallingModel = require('../models/CallingModel')
const PersonModel = require('../models/PersonModel')

class SpeakerModel extends BaseModel {
  static get tableName() { return 'speakers' }
  static get idColumn() { return 'speaker_uid' }
 
  static get relationMappings(){
    return {
      calling: {
        relation: Model.BelongsToOneRelation,
        modelClass: CallingModel,
        join: {
          from: `${this.tableName}.${CallingModel.idColumn}`,
          to: `${CallingModel.tableName}.${CallingModel.idColumn}`
        }
      },
      person: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonModel,
        join: {
          from: `${this.tableName}.${PersonModel.idColumn}`,
          to: `${PersonModel.tableName}.${PersonModel.idColumn}`
        }
      }
    }
  }
}

module.exports = SpeakerModel;
