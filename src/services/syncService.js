'use strict'

const { Constants } = require('../configs');
const { TopicTalksWebPage } = require('../webPages')
const { TopicRepo, TalkRepo } = require('../repositories')

const topicRepo = TopicRepo.init()
const talkRepo = TalkRepo.init()

module.exports = {
  async syncTopics() {
    const url = Constants.ROUTE_BASE + Constants.ROUTE_PATH_TOPICS;
    const topicPage = new TopicWebPage({ url })
    
    try {
      await topicPage.load()
      await topicPage.loadItems()

      // const topics = topicPage.items.map((t) => t.toObject())
      const topics = require('../../test/mocks/mockTopics.json') // for local testing
      const results = await topicRepo.upsertMany(topics)
      console.log(results)
    } catch (e) {
      console.log(e)
    }
  },

  async syncTopicTalks() {
    let topics = await topicRepo.readAll()
    topics = [topics[0]]
    try {
      topics.forEach(async (topic) => {
        // const url = (Constants.ROUTE_BASE + Constants.ROUTE_PATH_TALKS).replace('$@', topic.tag)  
        // const topicTalkPage = new TopicTalksWebPage({ url })

        // await topicTalkPage.load()
        // await topicTalkPage.loadItems()
        const topicTalks = require('../../test/mocks/mockTopicTalks-JesusChrist.json')
        // topicTalks.map((t) => t.topics = [topic])
        // const topicTalks = topicTalkPage.items.map((t) => {
          // const talk = t.toObject()
          // talk.topics = [topic]
          // return talk
        // })
        talkRepo.upsertMany(topicTalks)
        // TODO: upsert...
      })
    } catch (e) {
      console.log(e)
    }
  }
}
