'use strict'

const { expect } = require('chai')
const { DistinctArray } = require('../../src/lib')

describe('DistinctArray', function() {
  describe('constructor', function() {
    it('should filter out items with duplicate keys', function() {
      const topics = [{
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }, {
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": 816,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }]

      const distinctTopics = new DistinctArray(topics, 'topic_uid')

      expect(distinctTopics.length).to.equal(1)
    })
    it('should not filter out items if there are not duplicate keys', function() {
      const topics = [{
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }, {
        "topic_uid": "93349189c5d0219ba8b20ca7cbf068a1",
        "title": "friendship",
        "tag": "friendship",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-friendship?lang=eng&encoded=true"
      }]

      const distinctTopics = new DistinctArray(topics, 'topic_uid')

      expect(distinctTopics.length).to.equal(2)
    })
    it('should be an empty array if the inputted array is empty', function() {
      const topics = []

      const distinctTopics = new DistinctArray(topics, 'topic_uid')

      expect(distinctTopics.length).to.equal(0)
    })
    it('should be an empty array if the inputted array is null or undefined', function() {
      const topics = []

      const distinctNullTopics = new DistinctArray(null, 'topic_uid')
      const distinctUndefinedTopics = new DistinctArray(undefined, 'topic_uid')

      expect(distinctNullTopics.length).to.equal(0)
      expect(distinctUndefinedTopics.length).to.equal(0)
    })
    it('should return no items if the key is not found', function() {
      const topics = [{
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }, {
        "topic_uid": "93349189c5d0219ba8b20ca7cbf068a1",
        "title": "friendship",
        "tag": "friendship",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-friendship?lang=eng&encoded=true"
      }]

      const distinctTopics = new DistinctArray(topics, 'property_does_not_exist')

      expect(distinctTopics.length).to.equal(0)
    })
    it('should compare against the entire objects contents if no comparison key is included', function() {
      const topics1 = [{
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }, {
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }]
      const topics2 = [{
        "topic_uid": "97081c1611358b350e8088cb3d2b8b5b",
        "title": "diversity",
        "tag": "diversity",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-diversity?lang=eng&encoded=true"
      }, {
        "topic_uid": "93349189c5d0219ba8b20ca7cbf068a1",
        "title": "friendship",
        "tag": "friendship",
        "talks_count": null,
        "reference_url": "https://www.churchofjesuschrist.org/general-conference/topics/-friendship?lang=eng&encoded=true"
      }]

      const distinct1Topics = new DistinctArray(topics1)
      const distinct2Topics = new DistinctArray(topics2)

      expect(distinct1Topics.length).to.equal(1)
      expect(distinct2Topics.length).to.equal(2)
    })
    it('should work against a large dataset', function() {
 
      const originalTopics = require('../mocks/mockTopics.json')
      const distinctTopics = new DistinctArray(originalTopics, 'topic_uid')

      expect(distinctTopics.length).to.not.equal(originalTopics.length)    
    })
  })
})
