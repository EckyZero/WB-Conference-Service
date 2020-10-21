'use strict'

const { TopicRepo } = require('../repositories')
const { ServiceResponse } = require('../lib/responses')

const topicRepo = TopicRepo.init()

module.exports = {
  async getAll() {
    const topics = await topicRepo.readAll({ orderBy: 'title' })
    const response = new ServiceResponse({
      results: topics,
      offset: 0,
      count: topics.length
    })
    return response
  }
}
