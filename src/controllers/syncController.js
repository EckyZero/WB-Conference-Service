'use strict'

const { syncService } = require('../services')

module.exports = {
  async sync(req, res, next) {
    // const topics = await syncService.syncTopics();
    const topicTalk = await syncService.syncTopicTalks();
    res.status(200).send()
  }
}
