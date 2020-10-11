'use strict'

const request = require('promise-request-retry')
const needle = require('needle')
const HttpStatus = require('http-status-codes')

const redirectStatuses = [
  HttpStatus.MOVED_PERMANENTLY,
  HttpStatus.MOVED_TEMPORARILY,
  HttpStatus.PERMANENT_REDIRECT,
  HttpStatus.TEMPORARY_REDIRECT
];

module.exports = {
  async get ({ url, retry = 5, delay = 500, factor = 2}) {
    try {
      const results = await needle('get', url);

      // Load the new URL of there's a redirect
      if ([HttpStatus.MOVED_PERMANENTLY,
          HttpStatus.MOVED_TEMPORARILY,
          HttpStatus.PERMANENT_REDIRECT,
          HttpStatus.TEMPORARY_REDIRECT]
          .includes(results.statusCode)) {
        
        retry--;

        if (retry > 0) {
          const retryOptions = {
            url: results.headers.location,
            retry: retry,
            delay: delay * factor,
            factor: factor
          }
          // Retry
          return await this.get(retryOptions);
        }
      }
      // Success
      const response = {
        isError : false,
        results : results ? results.body : null
      }
      return response;
    } catch (e) {
      const response = {
        isError : true,
        message : `Http Error - GET - ${url}`,
        exception : e
      }
      console.log(response)
      throw e
    }
  }
}