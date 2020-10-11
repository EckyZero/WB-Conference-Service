'use strict'

const WebPage = require('./WebPage')
const TopicTalksWebPageItem = require('./TopicTalksWebPageItem')

class TopicTalksWebPage extends WebPage {

  constructor({ url }) {
    super({ url })
  }

  async loadItems() {
    this.items = this.$('.lumen-tile').map((i, el) => {
      const options = { $: this.$, el: el }
      const topicTalkItem = new TopicTalksWebPageItem(options)
      return topicTalkItem
    }).get();
    return this.items
  }
}

module.exports = TopicTalksWebPage