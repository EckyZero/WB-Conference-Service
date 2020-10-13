'use strict'

const cheerio = require('cheerio');
const { apiClient } = require('../apis')

class WebPage {
  constructor({ url }) {
    this.url = url;
    this.html = null;
    this.items = [];
    this.metadata = null;
  }

  async load() {
    const options = { url: this.url }

    try {
      const response = await apiClient.get(options)
      this.html = response.results

      if (!response.isError) {
        this.$ = cheerio.load(this.html)
      }
    } catch (error) {
      console.log('test')
    }
    return this.html
  }

  async loadItems(metadata = null) {
    throw new Error('WebPage loadItems() to be overridden by children')
  }

  toObject() {
    throw new Error('WebPage toObject() to be overridden by children')
  }
}

module.exports = WebPage
