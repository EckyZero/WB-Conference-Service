'use strict'

const WebPage = require('./WebPage')
const TopicTalksWebPageItem = require('./TopicTalksWebPageItem')

class TopicTalksWebPage extends WebPage {

  constructor({ url }) {
    super({ url })
  }

  async loadItems() {
    this.items = this.$('.lumen-content').find('.lumen-tile a').map((i, el) => {
      const options = { $: this.$, el: el }
      const topicItem = new TopicTalksWebPageItem(options)
      return topicItem
    }).get();
    return this.items
  }
}

module.exports = TopicTalksWebPage