'use strict'

const { SessionModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class SessionRepo extends BaseRepo {

  static init() {
    return new SessionRepo()
  }
  
  get model() {
    return SessionModel
  }
}

module.exports = SessionRepo
