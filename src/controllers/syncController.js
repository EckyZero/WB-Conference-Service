'use strict'

const { syncService } = require('../services')

module.exports = {
  async sync(req, res, next) {
    try {
      await syncService.syncTopics();
      await syncService.syncTopicTalks();
      await syncService.syncTalks()
    } catch (e) {
      console.log('An unexpected error occurred syncing conference data', e)
      return res.status(500).send()
    }
    return res.status(200).send()
  }
}
