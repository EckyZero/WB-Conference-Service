'use strict'

const { UUID } = require('../lib')
const { TalkModel } = require('../models')
const BaseRepo = require('./BaseRepo')
const conferenceRepo = require('./ConferenceRepo').init()
const personRepo = require('./PersonRepo').init()
const talkTopicRepo = require('./TalkTopicRepo').init()

class TalkRepo extends BaseRepo {

  static init() {
    return new TalkRepo()
  }
  
  get model() {
    return TalkModel
  }

  async upsertMany(talks) {
    let success = false
    try {
      for (let i = 0; i < talks.length; i++) {
        const talk = talks[i]
        await this.upsert(talk) 
      }
      success = true
    } catch (e) {
      console.log(e)
      throw new Error('Error in upsertMany', e)
    }
    return success
  }

  async upsert(talk) {
    let transaction
    let success = false
    try {
      transaction = await this.model.startTransaction()

      await conferenceRepo.upsert(talk.session.conference)
      await personRepo.upsert(talk.speaker.person)
      await super.upsert(talk)
      
      for (let i = 0; i < talk.topics.length; i++) {
        const topic = talk.topics[i]
        const options = { 
          talk_topic_uid: UUID.init(`${talk.talk_uid}-${topic.topic_uid}`),
          topic_uid: topic.topic_uid,
          talk_uid: talk.talk_uid
        }
        await talkTopicRepo.upsert(options)
      }
      transaction.commit()
      success = true
    } catch (e) {
      console.log(e)
      transaction.rollback()
      throw new Error('Error in insertTalk', e)
    }
    return success
  }

  insertTalkDetails(talkDetail) {

  }
}

module.exports = TalkRepo

