'use strict'

const { SpeakerModel, PersonModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class SpeakerRepo extends BaseRepo {

  static init() {
    return new SpeakerRepo()
  }
  
  get model() {
    return SpeakerModel
  }

  async readByPersonId(id) {
    let result
    try {
      result = await SpeakerModel.query().where(PersonModel.idColumn, id)
    } catch (e) {
      console.log(`error getting speaker by person id "${id}"`)
      throw e
    }
    return result
  }
}

module.exports = SpeakerRepo
