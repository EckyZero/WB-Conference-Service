'use strict'

const { CallingModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class CallingRepo extends BaseRepo {

  static init() {
    return new CallingRepo()
  }
  
  get model() {
    return CallingModel
  }
}

module.exports = CallingRepo
