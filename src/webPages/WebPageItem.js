'use strict'

class WebPageItem {
  constructor({ $, el, parentPage }) {
    this.$ = $;
    this.el = el;
    this.parentPage = parentPage
  }

  toObject() {
    throw new Error('WebPageItem toObject() must be handled by child class')
  }
}

module.exports = WebPageItem
