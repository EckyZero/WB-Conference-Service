'use strict'

const WebPage = require('./WebPage')
const TopicWebPageItem = require('./TopicWebPageItem')

class TopicWebPage extends WebPage {

  constructor({ url }) {
    super({ url })
  }

  async loadItems() {
    const items = this.$('.lumen-content').find('.lumen-tile a').map((i, el) => {
      const options = { $: this.$, el: el }
      const topicItem = new TopicWebPageItem(options)
      return topicItem
    }).get();
    this.setItems(items)
  }
}

module.exports = TopicWebPage