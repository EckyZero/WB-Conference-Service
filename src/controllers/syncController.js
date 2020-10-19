'use strict'

const { syncService } = require('../services')

module.exports = {
  async sync(req, res, next) {
    // const topics = await syncService.syncTopics();
    // const topicTalk = await syncService.syncTopicTalks();
    await syncService.syncTalks()
    res.status(200).send()
  }
}

// TODO: fix 12 speakers that are missing people