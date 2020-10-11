'use strict'

const { TopicModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class TopicRepo extends BaseRepo {

  static init() {
    return new TopicRepo()
  }
  
  get model() {
    return TopicModel
  }
}

module.exports = TopicRepo

