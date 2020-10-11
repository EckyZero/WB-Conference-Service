'use strict'

const { UUID } = require('../lib')
const WebPageItem = require('./WebPageItem')
const { Constants } = require('../configs')

class TopicTalksWebPageItem extends WebPageItem {

  #talkId
  #title
  #personId
  #personFirstName
  #personMiddleName
  #personLastName
  #personPreferredName
  #conferenceId
  #month
  #year
  #thumbnail
  #url

  get talkId() {
    if (!this.#talkId) {
      
    }
    return this.#talkId;
  }

  get title() {
    if (!this.#title) {
      
    }
    return this.#title;
  }

  get personId() {
    if (!this.#personId) {
      
    }
    return this.#personId;
  }

  get personFirstName() {
    if (!this.#personFirstName) {
      
    }
    return this.#personFirstName;
  }

  get personMiddleName() {
    if (!this.#personMiddleName) {
      
    }
    return this.#personMiddleName;
  }

  get personLastName() {
    if (!this.#personLastName) {
      
    }
    return this.#personLastName;
  }

  get personPreferredName() {
    if (!this.#personPreferredName) {
      
    }
    return this.#personPreferredName;
  }

  get conferenceId() {
    if (!this.#conferenceId) {
      
    }
    return this.#conferenceId;
  }

  get month() {
    if (!this.#month) {
      
    }
    return this.#month;
  }

  get year() {
    if (!this.#year) {
      
    }
    return this.#year;
  }

  get thumbnail() {
    if (!this.#thumbnail) {
      
    }
    return this.#thumbnail;
  }

  get url() {
    if (!this.#url) {
      
    }
    return this.#url;
  }

  toObject() {
    return {
      talk_uid: this.id,
      title: this.title,
      reference_url: this.url,
      thumbnail_url: this.thumbnail,
      speaker: {
        person: {
          person_uid: this.personId,
          first_name: this.personFirstName,
          middle_name: this.personMiddleName,
          last_name: this.personLastName,
          preferred_name: this.personPreferredName,
        }
      },
      session: {
        conference: {
          conference_ud: this.conferenceId,
          month: this.month,
          year: this.year
        }
      }
    }
  }
}

module.exports = TopicTalksWebPageItem
