'use strict'

const { UUID, nameParser, dateParser } = require('../lib')
const WebPageItem = require('./WebPageItem')
const { Constants } = require('../configs')

class TopicTalksWebPageItem extends WebPageItem {

  #talkId
  #title
  #speakerId
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
      this.#talkId = UUID.init(`${this.title}-${this.personPreferredName}-${this.month}-${this.year}`)
    }
    return this.#talkId;
  }

  get title() {
    if (!this.#title) {
      this.#title = this.$(this.el)
          .find('.lumen-tile__title')
          .find('a')[0].firstChild.data
          .trim();
    }
    return this.#title;
  }

  get speakerId() {
    if (!this.#speakerId) {
      this.#speakerId = UUID.init(`${this.personPreferredName}-${this.month}-${this.year}`)
    }
    return this.#personId;
  }

  get personId() {
    if (!this.#personId) {
      this.#personId = UUID.init(this.personPreferredName)
    }
    return this.#personId;
  }

  get personFirstName() {
    if (!this.#personFirstName) {
      this.#personFirstName = nameParser.parseFirstName(this.personPreferredName);
    }
    return this.#personFirstName;
  }

  get personMiddleName() {
    if (!this.#personMiddleName) {
      this.#personMiddleName = nameParser.parseMiddleName(this.personPreferredName);
    }
    return this.#personMiddleName;
  }

  get personLastName() {
    if (!this.#personLastName) {
      this.#personLastName = nameParser.parseLastName(this.personPreferredName);
    }
    return this.#personLastName;
  }

  get personPreferredName() {
    if (!this.#personPreferredName) {
      this.#personPreferredName = this.$(this.el).find('.lumen-tile__content')[0].firstChild.data.trim();
    }
    return this.#personPreferredName;
  }

  get conferenceId() {
    if (!this.#conferenceId) {
      this.#conferenceId = UUID.init(`${this.month}-${this.year}`);
    }
    return this.#conferenceId;
  }

  get month() {
    if (!this.#month) {
      const monthString = this.$(this.el)
          .find('.lumen-tile__metadata')[0]
          .firstChild.data.trim()
          .split(' ')[0];
      this.#month = dateParser.monthStringToInt(monthString);
    }
    return this.#month;
  }

  get year() {
    if (!this.#year) {
      const yearString = this.$(this.el)
          .find('.lumen-tile__metadata')[0]
          .firstChild.data.trim()
          .split(' ')[1];
      this.#year = parseInt(yearString);
    }
    return this.#year;
  }

  get thumbnail() {
    if (!this.#thumbnail) {
      const route = this.$(this.el).find('.lumen-image__image')[0].attribs['data-src']
      if (route) {
        if (route.includes('https')) {
          this.#thumbnail = `${route}`
        } else {
          this.#thumbnail = `https:${route}`
        }
      }
    }
    return this.#thumbnail;
  }

  get url() {
    if (!this.#url) {
      this.#url = Constants.ROUTE_BASE + this.$(this.el)
          .find('.lumen-tile__title')
          .find('a')[0].attribs.href;
    }
    return this.#url;
  }

  // TODO:
  // - test parsing with mock accountability page
  // - test inserting into the db
  // - find a way to add a reference to the topic of this page
  toObject() {
    return {
      talk_uid: this.talkId,
      title: this.title,
      reference_url: this.url,
      thumbnail_url: this.thumbnail,
      speaker: {
        speaker_uid: this.speakerId,
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
          conference_uid: this.conferenceId,
          month: this.month,
          year: this.year
        }
      }
    }
  }
}

module.exports = TopicTalksWebPageItem
