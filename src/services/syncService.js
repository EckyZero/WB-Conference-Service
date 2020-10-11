'use strict'

const { Constants } = require('../configs');
const { TopicWebPage } = require('../webPages')
const { TopicRepo } = require('../repositories')

const topicRepo = TopicRepo.init()

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
    const url = (Constants.ROUTE_BASE + Constants.TALK_PATH).replace('$@', tag)
    const topicTalkPage = new TopicTalkPage({ url })
  }
}
