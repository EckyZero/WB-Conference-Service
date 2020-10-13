'use strict'

const { SpeakerModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class SpeakerRepo extends BaseRepo {

  static init() {
    return new SpeakerRepo()
  }
  
  get model() {
    return SpeakerModel
  }
}

module.exports = SpeakerRepo
