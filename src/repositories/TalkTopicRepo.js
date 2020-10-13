'use strict'

const { TalkTopicModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class TalkTopicRepo extends BaseRepo {

  static init() {
    return new TalkTopicRepo()
  }
  
  get model() {
    return TalkTopicModel
  }
}

module.exports = TalkTopicRepo
