'use strict'

const { peopleService } = require('../services')

module.exports = {
  async getAll(req, res, next) {
    try {
      const people = await peopleService.getAll()
      return res.status(200).send(people)
    } catch (e) {
      console.log('An error occurred getting all people'. e)
      return res.status(500).send()
    }
  }
}
