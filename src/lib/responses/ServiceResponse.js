'use strict'

class ServiceResponse {
  count
  limit
  offset
  results = []

  constructor({ results, offset, count }) {
    this.results = results
    this.offset = offset
    this.count = count

    if (results && Array.isArray(results)) {
      this.limit = results.length
    }
  }
}

module.exports = ServiceResponse
