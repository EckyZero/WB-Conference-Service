'use strict'

const { PersonModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class PersonRepo extends BaseRepo {

  static init() {
    return new PersonRepo()
  }
  
  get model() {
    return PersonModel
  }
}

module.exports = PersonRepo
