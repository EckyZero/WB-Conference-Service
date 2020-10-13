'use strict'

const { ConferenceModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class ConferenceRepo extends BaseRepo {

  static init() {
    return new ConferenceRepo()
  }
  
  get model() {
    return ConferenceModel
  }
}

module.exports = ConferenceRepo
