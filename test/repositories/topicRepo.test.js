'use strict'

const sinon = require('sinon')
const { TopicModel } = require('../../src/models')
const { topicRepo } = require('../../src/repositories')
const topics = require('../mocks/mockTopics.json')

describe('topicRepo', function() {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })
  describe('upsertMany', function() {
    it('should work', async function() {
      // Stub actual database calls
      // sinon.stub(TopicModel, 'query').returns({ 
      //   update: () => {},
      //   insert: () => {},
      //   delete: () => {},
      //   findByIds: () => {
      //     return {
      //       select: () => {
      //         return [{"topic_uid":"fefa7973-1a13-73cf-77c1-d0bdd96b8d59"}]
      //       }
      //     }
      //   }
      // })
      await topicRepo.upsertMany(topics)
    })
  })
})
