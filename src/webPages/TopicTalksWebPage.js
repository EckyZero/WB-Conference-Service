'use strict'

const { Constants } = require('../configs')
const { UUID } = require('../lib')
const WebPage = require('./WebPage')
const TopicTalksWebPageItem = require('./TopicTalksWebPageItem')

class TopicTalksWebPage extends WebPage {

  getNextPage() {
    if (!this.nextPage) {
      // Depending on the page, we need to offset as when pagination is present,
      // We need to account for the "previous page" and "next page" buttons
      const pageNumber = this.getPageNumber()
      const nextPageNumber = pageNumber + 1

      const attributeNodes = []
      const listNodes = this.$(".pages-nav__list-item > a")

      for (let i = 0; i < Object.keys(listNodes).length; i++) {
        const node = listNodes[i]

        if (typeof node !== 'undefined') {
          attributeNodes.push(node)
        }
      }
      const nextNode = attributeNodes.filter((node) => node.attribs['data-page'] === nextPageNumber.toString())[0]

      if (!nextNode || !nextNode.attribs) return

      const nextUrl = Constants.ROUTE_BASE + nextNode.attribs.href;
      const nextPage = new TopicTalksWebPage({ 
        url: nextUrl, 
        pageNumber: nextPageNumber
      })
      this.setNextPage(nextPage)
    }
    return super.getNextPage()
  }

  async loadItems() {
    await super.loadItems()
    const items = this.$('.lumen-tile').map((i, el) => {
      const options = { $: this.$, el: el, parentPage: this }
      const topicTalkItem = new TopicTalksWebPageItem(options)
      return topicTalkItem
    }).get();
    
    this.setItems(items)
  }
}

module.exports = TopicTalksWebPage
