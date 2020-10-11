'use strict'

const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const { TopicWebPage } = require('../../src/webPages')
const sinon = require('sinon')
const { apiClient } = require('../../src/apis')

describe('TopicWebPage', function() {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })
  describe('load', function() {
    it('should load the "All Topics" html page', async function() {
      // stub the api client to return the cached topic page
      const url = path.resolve(__dirname, '../html/topics.html');
      const response = {
        isError: false,
        results: fs.readFileSync(url, 'utf8')
      }

      sinon.stub(apiClient, 'get').returns(response)

      // load the page
      const topicPage = new TopicWebPage({ url });

      const loadedHtml = await topicPage.load()
      const pageItems = await topicPage.loadItems()

      // assert all the results are parsed correctly
      expect(loadedHtml).to.equal(response.results)
      expect(pageItems.length).to.equal(299)
      expect(pageItems[0].toObject().title).to.equal('Jesus Christ')
    })
  })
})
