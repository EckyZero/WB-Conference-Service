'use strict'

const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const { TalkWebPage } = require('../../src/webPages')
const sinon = require('sinon')
const { apiClient } = require('../../src/apis')

describe('TalkWebPage', function() {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })
  describe('load', function() {
    it('should load the talk detail html page for "Endurance"', async function() {
      // stub the api client to return the cached topic page
      const url = path.resolve(__dirname, '../html/talk-endurance.html');
      const talk = {
        talk_uid: '6de71f0c-7bdf-34ac-537e-a326747ce85f',
        title: 'Enduring Together',
        thumbnail_url: 'https://media.ldscdn.org/images/videos/general-conference/october-2007-general-conference/2007-10-1030-bishop-richard-c-edgley-100x83-6x5.jpg',
        reference_url: 'https://www.churchofjesuschrist.org/general-conference/2007/10/enduring-together?lang=eng'
      }

      const response = {
        isError: false,
        results: fs.readFileSync(url, 'utf8')
      }

      sinon.stub(apiClient, 'get').returns(response)

      // load the page
      const talkPage = new TalkWebPage({ url });

      await talkPage.load(talk)

      const talkDetails = talkPage.toObject()

      // assert all the results are parsed correctly
      expect(talkDetails.description).to.equal('The ward is organized to minister to the needs of those who face even the most difficult and heartbreaking trials.')
    })
  })
})
