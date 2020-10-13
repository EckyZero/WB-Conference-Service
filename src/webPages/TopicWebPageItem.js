'use strict'

const { UUID } = require('../lib')
const WebPageItem = require('./WebPageItem')
const { Constants } = require('../configs')

class TopicWebPageItem extends WebPageItem {

  #id
  #title
  #count
  #tag
  #url

  get id() {
    if (!this.#id) {
      this.#id = UUID.init(this.tag)
    }
    return this.#id;
  }

  get title() {
    if (!this.#title) {
      const topicCounts = this.el.firstChild.data.split('(');
      this.#title = topicCounts[0].trim()
    }
    return this.#title;
  }

  get count() {
    if (!this.#count) {
      const topicCounts = this.el.firstChild.data.split('(');
      this.#count = topicCounts[1] ? parseInt(topicCounts[1].trim().slice(0, -1)) : null;
    }
    return this.#count;
  }

  get tag() {
    if (!this.#tag) {
      const topicCounts = this.el.firstChild.data.split('(');
      const name = topicCounts[0].trim();
      this.#tag = name.replace(/\s/g, '-').toLowerCase();
    }
    return this.#tag;
  }

  get url() {
    if(!this.#url) {
      this.#url = Constants.ROUTE_BASE + this.el.attribs.href;
    }
    return this.#url;
  }

  toObject() {
    return {
      topic_uid: this.id,
      title: this.title,
      tag: this.tag,
      talks_count: this.count,
      reference_url: this.url
    }
  }
}

module.exports = TopicWebPageItem
