'use strict'

const { SpeakerModel, PersonModel, TalkModel } = require('../models')
const BaseRepo = require('./BaseRepo')

class SpeakerRepo extends BaseRepo {

  static init() {
    return new SpeakerRepo()
  }
  
  get model() {
    return SpeakerModel
  }

  async readAllChildren() {
    let result
    try {

      const talks = await TalkModel.query().withGraphFetched('[session.conference, speaker.[calling, person]]');
      result = await this.model.query().withGraphFetched('[person, calling]');
      this.model.join
    } catch (e) {
      console.log(`error getting speaker by person id "${id}"`)
      throw e
    }
    return result
  }

  async readByPersonId(id) {
    let result
    try {
      result = await this.model.query().where(PersonModel.idColumn, id)
    } catch (e) {
      console.log(`error getting speaker by person id "${id}"`)
      throw e
    }
    return result
  }
}

module.exports = SpeakerRepo
