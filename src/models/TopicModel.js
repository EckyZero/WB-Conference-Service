const { Model } = require('objection')
const BaseModel = require('./BaseModel')
const TalkTopicModel = require('../models/TalkTopicModel')

class TopicModel extends BaseModel {
  static get tableName() { return 'topics' }
  static get idColumn() { return 'topic_uid' }

  static get relationMappings(){
    // require 'ManyToMany' classes inside relationMappings to avoid circular dependencies
    // https://vincit.github.io/objection.js/guide/relations.html#require-loops
    const TalkModel = require('../models/TalkModel')
    return {
      talks: {
        relation: Model.ManyToManyRelation,
        modelClass: TalkModel,
        join: {
          from: `${this.tableName}.${this.idColumn}`,
          through: {
            from: `${TalkTopicModel.tableName}.${this.idColumn}`,
            to: `${TalkTopicModel.tableName}.${TalkModel.idColumn}`,
          },
          to: `${TalkModel.tableName}.${TalkModel.idColumn}`,
        }
      }
    }
  }
}

module.exports = TopicModel;
