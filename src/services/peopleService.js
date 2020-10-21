'use strict'

const { PersonRepo, SpeakerRepo } = require('../repositories')
const { ServiceResponse } = require('../lib/responses')

const personRepo = PersonRepo.init()
const speakerRepo = SpeakerRepo.init()

module.exports = {
  async getAll() {

    const speakers = await speakerRepo.readAllChildren()
    const people = await personRepo.readAll({ orderBy: 'preferred_name'})
    const response = new ServiceResponse({
      results: people,
      offset: 0,
      count: people.length
    })
    return response
  }
}
