'use strict'

const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const { TopicTalksWebPage } = require('../../src/webPages')
const sinon = require('sinon')
const { apiClient } = require('../../src/apis')

describe('TopicTalksWebPage', function() {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })
  describe('load', function() {
    it('should load the talk summary html page for "Accountability"', async function() {
      // stub the api client to return the cached topic page
      const url = path.resolve(__dirname, '../html/topic-talks-accountability.html');
      const result = require('../mocks/mockTopicTalk-Accountability.json')
      const response = {
        isError: false,
        results: fs.readFileSync(url, 'utf8')
      }

      sinon.stub(apiClient, 'get').returns(response)

      // load the page
      const topicPage = new TopicTalksWebPage({ url });

      const loadedHtml = await topicPage.load()
      const pageItems = await topicPage.loadItems()

      // assert all the results are parsed correctly
      expect(loadedHtml).to.equal(response.results)
      expect(pageItems.length).to.equal(23)

      expect(pageItems[0].toObject().talk_uid.toString()).to.equal(result.talk_uid)
    })
  })
})
