const BaseModel = require('./BaseModel')

class TalkTopicModel extends BaseModel {
  static get tableName() { return 'talk_topics' }
  static get idColumn() { return 'talk_topic_uid' }
}

module.exports = TalkTopicModel;
