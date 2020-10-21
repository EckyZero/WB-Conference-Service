'use strict'

const WebPage = require('./WebPage')
const { UUID, scraperHelper, nameParser } = require('../lib')

const elderCallings = ['apostle', 'seventy'];
const brotherCallings = ['school', 'young men'];
const sisterCallings = ['young women', 'relief', 'primary'];
const validTitles = ['president', 'brother', 'sister', 'elder', 'bishop'];
const bishopCallings = ['bishopric'];

class TalkWebPage extends WebPage {

  #talk

  #author
  #callingId
  #speakerId
  #personId
  #personPreferredName
  #personFirstName
  #personMiddleName
  #personLastName
  #callingRole
  #callingTitle
  #talkDescription
  #talkQuote
  #heroUrl
  #sessionId
  #month
  #year
  #conferenceId
  #sessionName
  #sessionOrder
  #conferenceOrder

  async load() {
    super.load()
  }

  get speakerId() {
    if (!this.#speakerId) {
      this.#speakerId = UUID.init(`${this.personPreferredName}-${this.month}-${this.year}`)
    }
    return this.#speakerId;
  }
// TODO: fix 12 speakers where the person_
  get callingId() {
    if(!this.#callingId) {
      this.#callingId = UUID.init(`${this.callingRole}`)
    }
    return this.#callingId
  }

  get personId() {
    if(!this.#personId) {
      this.#personId = UUID.init(this.personPreferredName)
    }
    return this.#personId
  }

  get personPreferredName() {
    if(!this.#personPreferredName) {
      this.#personPreferredName = this.author.replace('By ', '')
          .replace(this.callingTitle, '')
          .replace('Brother', '')
          .replace('Sister', '')
          .replace('Elder', '')
          .replace('Bishop', '')
          .replace('President', '')
          .trim()
    }
    return this.#personPreferredName
  }

  get personFirstName() {
    if(!this.#personFirstName) {
      this.#personFirstName = nameParser.parseFirstName(this.personPreferredName)
    }
    return this.#personFirstName
  }

  get personMiddleName() {
    if(!this.#personMiddleName) {
      this.#personMiddleName = nameParser.parseMiddleName(this.personPreferredName)
    }
    return this.#personMiddleName
  }

  get personLastName() {
    if(!this.#personLastName) {
      this.#personLastName = nameParser.parseLastName(this.personPreferredName)
    }
    return this.#personLastName
  }

  get author() {
    if(!this.#author) {
      let name = this.$('#author1')[0]
      if (!name) {
        name = this.$(".author-name")[0]
      }
      if (!name) {
        name = this.$("#p1")[0]
      } 
      if (!name) {
        name = "unknown"
      } 
      if (name.firstChild) {
        name = name.firstChild.data
      }
      this.#author = name
    }
    return this.#author
  }

  get conferenceId() {
    if(!this.#conferenceId) {
      this.#conferenceId = UUID.init(`${this.month}-${this.year}`);
    }
    return this.#conferenceId
  }

  get month() {
    if (!this.#month) {
      let url = this.#talk.reference_url.replace('https://www.churchofjesuschrist.org/general-conference/', '')
      const month = parseInt(url.substring(5,7))
      this.#month = month
    }
    return this.#month;
  }

  get year() {
    if (!this.#year) {
      let url = this.#talk.reference_url.replace('https://www.churchofjesuschrist.org/general-conference/', '')
      const year = parseInt(url.substring(0,4))
      this.#year = year
    }
    return this.#year;
  }

  get callingRole() {
    if(!this.#callingRole) {
      let role = this.$('.author-role')[0] ?
      this.$('.author-role')[0].firstChild.data : this.$('#p2')[0].firstChild.data;

      if (role === undefined || role === null) {
        return '';
      }

      if (role.length > 60) {
        role = 'President of The Church of Jesus Christ of Latter-day Saints';
      }
      this.#callingRole = role
    }
    return this.#callingRole
  }

  get callingTitle() {
    if(!this.#callingTitle) {
      const role = this.callingRole
      const name = scraperHelper.tryGetChildDataWithSelectors(this.$, '.author-name', '#p1');

      // If we know the name, parse for the appropriate title
      if (typeof name !== 'string') {
        const nameElements = name.split(' ');
        const matchingNames = nameElements.filter(
            (el) => scraperHelper.arrayIncludesValue(_validTitles, el));

        if (matchingNames.length > 0) {
          this.#callingTitle = matchingNames[0];
          return this.#callingTitle
        }
      }

      // If we still don't know the title, parse the role for organizations
      if (role && typeof role === 'string') {
        if (scraperHelper.arrayIncludesValue(brotherCallings, role)) {
          this.#callingTitle = 'Brother'
          return this.#callingTitle
        // eslint-disable-next-line max-len
        } else if (scraperHelper.arrayIncludesValue(sisterCallings, role)) {
          this.#callingTitle = 'Sister'
          return this.#callingTitle
        // eslint-disable-next-line max-len
        } else if (scraperHelper.arrayIncludesValue(elderCallings, role)) {
          this.#callingTitle = 'Elder'
          return this.#callingTitle
        } else if (scraperHelper.arrayIncludesValue(bishopCallings, role)) {
          this.#callingTitle = 'Bishop'
          return this.#callingTitle
        }

        // If we still don't know the name, compare against a comprehensive list
        const roleElements = role.split(' ');
        let matchingRoles = roleElements.filter(
            (el) => scraperHelper.arrayIncludesValue(validTitles, el));

        if (matchingRoles.length > 0) {
          this.#callingTitle = matchingRoles[0];
          return this.#callingTitle;
        }

        // If we still don't know, maybe it's embedded in the name
        const nameElements = this.author.split(' ')
        matchingRoles = nameElements.filter(
          (el) => scraperHelper.arrayIncludesValue(validTitles, el));

        if (matchingRoles.length > 0) {
          this.#callingTitle = matchingRoles[0];
          return this.#callingTitle;
        }
      }
    }
    return this.#callingTitle
  }

  get talkDescription() {
    if(!this.#talkDescription) {
      this.#talkDescription = this.$('head > meta:nth-child(6)')[0].attribs.content;
    }
    return this.#talkDescription
  }

  get talkQuote() {
    if(!this.#talkQuote) {
      this.#talkQuote = this.$('.kicker')[0] ? this.$('.kicker')[0].firstChild.data.trim() : null;
    }
    return this.#talkQuote
  }

  get heroUrl() {
    if(!this.#heroUrl) {
      this.#heroUrl = this.$('head > meta:nth-child(7)')[0].attribs.content;
    }
    return this.#heroUrl
  }

  get sessionId() {
    if (!this.#sessionId) {
      this.#sessionId = UUID.init(`${this.sessionName}-${this.conferenceId}`)
    }    
    return this.#sessionId
  }

  get sessionName() {
    if(!this.#sessionName) {
      this.scrapeConferenceDetails()
    }
    return this.#sessionName
  }

  get sessionOrder() {
    if(!this.#sessionOrder) {
      this.scrapeConferenceDetails()
    }
    return this.#sessionOrder
  }

  get conferenceOrder() {
    if(!this.#conferenceOrder) {
      this.scrapeConferenceDetails()
    }
    return this.#conferenceOrder
  }

  scrapeConferenceDetails() {
    let sessionName = '';
    let sessionOrder = -1;

    const sessions = [];

    this.$('li a div p span').each((i, el) => {
      for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        const sessionNode = scraperHelper.getChildElementsWithText(child, 'Session');

        if (sessionNode !== null & sessionNode.length > 0) {
          sessions.push(sessionNode[0].data);
          sessionOrder = -1;
        } else {
          sessionOrder++;
        }
        if (child.data === this.#talk.title) {
          sessionName = sessions[sessions.length - 1];
          sessionOrder = sessionOrder;
          return false;
        }
      }
    });

    this.#sessionName = sessionName
    this.#sessionOrder = sessionOrder
    this.#conferenceOrder = sessions.length - 1
  }

  async load(talk) {
    this.#talk = talk
    await super.load()
  }

  toObject() {
    if (this.author === 'unknown') {
      return null
    }
    return {
      talk_uid: this.#talk.talk_uid,
      description: this.talkDescription,
      quote: this.talkQuote,
      session_order: this.sessionOrder,
      session_uid: this.sessionId, // TODO
      speaker_uid: this.speakerId, // TODO
      speaker: {
        speaker_uid: this.speakerId,
        person_uid: this.personId,
        person: {
          person_uid: this.personId,
          preferred_name: this.personPreferredName,
          first_name: this.personFirstName,
          middle_name: this.personMiddleName,
          last_name: this.personLastName
        },
        calling_uid: this.callingId,
        calling: {
          calling_uid: this.callingId,
          role: this.callingRole,
          title: this.callingTitle
        }
      },
      session: {
        session_uid: this.sessionId, // TODO
        name: this.sessionName,
        conference_order: this.conferenceOrder,
        conference_uid: this.conferenceId, // TODO
        conference: {
          conference_uid: this.conferenceId,
          month: this.month,
          year: this.year
        }
      }
    }
  }

}

module.exports = TalkWebPage
