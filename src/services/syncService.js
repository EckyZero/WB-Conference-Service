'use strict'

const { Constants } = require('../configs');
const { TopicTalksWebPage, TalkWebPage } = require('../webPages')
const { TopicRepo, TalkRepo, PersonRepo, SpeakerRepo } = require('../repositories')
const { timer, UUID } = require('../lib');
const { BaseModel } = require('../models');

const topicRepo = TopicRepo.init()
const talkRepo = TalkRepo.init()
const personRepo = PersonRepo.init()
const speakerRepo = SpeakerRepo.init()

module.exports = {
  async syncTopics() {
    const url = Constants.ROUTE_BASE + Constants.ROUTE_PATH_TOPICS;
    const topicPage = new TopicWebPage({ url })
    
    try {
      await topicPage.load()
      await topicPage.loadItems()

      const topics = topicPage.getItems().map((t) => t.toObject())
      const results = await topicRepo.upsertMany(topics)
      console.log(results)
    } catch (e) {
      console.log(e)
    }
  },

  async syncTopicTalks() {
    let topics = await topicRepo.readAll()
    try {
      for (let i = 0; i < topics.length; i++) {
        await timer.sleep(10000)

        const pageNumber = 1
        const topic = topics[i]
        const url = (Constants.ROUTE_BASE + Constants.ROUTE_PATH_TALKS).replace('$@', topic.tag)  
        const topicTalkPage = new TopicTalksWebPage({ url, pageNumber })

        console.log(`Scraping talks for topic "${topic.title}"`)

        await topicTalkPage.load()
        await topicTalkPage.loadItems()
        
        const topicTalks = topicTalkPage.getItems().map((t) => {
          console.log(`Parsing talk ${t.title} for topic ${topic.title}`)
          const talk = t.toObject()
          talk.topics = [topic]
          return talk
        })

        await talkRepo.upsertMany(topicTalks)
      }
    } catch (e) {
      console.log(e)
    }
  },

  async syncTalks() {
    // let talks = await talkRepo.readAll()
    let talks = await talkRepo.readWhereNullPersons()
    // talks = talks.filter((talk) => talk.description === talk.quote)
    try {
      for(let i = 0; i < talks.length; i++) {
        await timer.sleep(10000)

        const talk = talks[i]
        const talkPage = new TalkWebPage({ url: talk.reference_url })

        console.log(`Scraping details for talk "${talk.title}"`)

        await talkPage.load(talk)

        const talkDetails = talkPage.toObject()

        if (talkDetails) {
          await talkRepo.upsert(talkDetails)
        }
      }
    } catch (e) {
      console.log(e)
    }
  },

  async fixSpeakers() {
    const people = await personRepo.readAll()

    for(let i = 0; i < people.length; i++) {
      const person = people[i] 
      const oldId = person.person_uid
      const newId = UUID.init(person.preferred_name)
      let transaction;
      try {
        const speakers = await speakerRepo.readByPersonId(oldId)
        if (speakers && speakers.length > 0) {
          transaction = await BaseModel.startTransaction()
          const speaker = speakers[0]
          const people = await personRepo.readById(oldId)

          if (people && people.length > 0) {
            speaker.person_uid = newId;
          } else {
            speaker.person_uid = null;
          }
  
          await speakerRepo.update(speaker)
          await personRepo.updateId(oldId, newId)
          await transaction.commit()
        }
      } catch (e) {
        console.log(e)
        await transaction.rollback()
      }
    }
  }
}
