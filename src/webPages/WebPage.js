'use strict'

const {} = require('../lib/timer')
const cheerio = require('cheerio');
const { apiClient } = require('../apis');
const timer = require('../lib/timer');

class WebPage {
  #url = null;
  #html = null;
  #items = [];
  #pageNumber = null
  #nextPage = null;
  
  constructor({ url, pageNumber }) {
    this.#url = url;
    this.#pageNumber = pageNumber
  }

  getItems() {
    let results = [...this.#items]
    if (this.#nextPage) {
      results = [...this.#items, ...this.#nextPage.getItems()]
    }
    return results
  }

  setItems(list) {
    this.#items = list
  }

  getNextPage() {
    return this.#nextPage
  }

  setNextPage(page) {
    return this.#nextPage = page
  }

  getPageNumber() {
    return this.#pageNumber
  }

  async load() {
    console.log(`Loading page "${this.#url}"`)
    const options = { url: this.#url }

    try {
      const response = await apiClient.get(options)
      this.#html = response.results

      if (!response.isError) {
        this.$ = cheerio.load(this.#html)
      }
    } catch (error) {
      console.log('test')
    }

    if (this.getNextPage()) {
      await timer.sleep(10000)
      await this.#nextPage.load()
    }

    return this.#html
  }

  async loadItems() {
    console.log(`Loading items for page "${this.#pageNumber}"`)
    if (this.#nextPage) {
      await this.#nextPage.loadItems()
    }
  }

  toObject() {
    throw new Error('WebPage toObject() to be overridden by children')
  }
}

module.exports = WebPage
