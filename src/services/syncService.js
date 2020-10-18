'use strict'

const { Constants } = require('../configs');
const { TopicTalksWebPage } = require('../webPages')
const { TopicRepo, TalkRepo } = require('../repositories')
const { timer } = require('../lib')

const topicRepo = TopicRepo.init()
const talkRepo = TalkRepo.init()

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
  }
}
