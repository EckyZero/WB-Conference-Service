const { Model } = require('objection')
const BaseModel = require('./BaseModel')
const SessionModel = require('../models/SessionModel')
const SpeakerModel = require('../models/SpeakerModel')
const TalkTopicModel = require('../models/TalkTopicModel')

class TalkModel extends BaseModel {
  static get tableName() { return 'talks' }
  static get idColumn() { return 'talk_uid' }

  static get relationMappings(){
    // require 'ManyToMany' classes inside relationMappings to avoid circular dependencies
    // https://vincit.github.io/objection.js/guide/relations.html#require-loops
    const TopicModel = require('../models/TopicModel')
    return {
      session: {
        relation: Model.BelongsToOneRelation,
        modelClass: SessionModel,
        join: {
          from: `${this.tableName}.${SessionModel.idColumn}`,
          to: `${SessionModel.tableName}.${SessionModel.idColumn}`
        }
      },
      speaker: {
        relation: Model.BelongsToOneRelation,
        modelClass: SpeakerModel,
        join: {
          from: `${this.tableName}.${SpeakerModel.idColumn}`,
          to: `${SpeakerModel.tableName}.${SpeakerModel.idColumn}`
        }
      },
      topics: {
        relation: Model.ManyToManyRelation,
        modelClass: TopicModel,
        join: {
          from: `${this.tableName}.${this.idColumn}`,
          through: {
            from: `${TalkTopicModel.tableName}.${this.idColumn}`,
            to: `${TalkTopicModel.tableName}.${TopicModel.idColumn}`,
          },
          to: `${TopicModel.tableName}.${TopicModel.idColumn}`,
        }
      }
    }
  }
}

module.exports = TalkModel;