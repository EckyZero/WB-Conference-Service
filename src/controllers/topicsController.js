'use strict'

const topicsService = require('../services/topicsService')

module.exports = {
  async getAll(req, res, next) {
    try {
      const topics = await topicsService.getAll()
      return res.status(200).send(topics)
    } catch (e) {
      console.log('An error occurred getting all topics'. e)
      return res.status(500).send()
    }
  }
}
