'use strict'

class WebPageItem {
  constructor({ $, el }) {
    this.$ = $;
    this.el = el;
  }

  toObject() {
    throw new Error('WebPageItem toObject() must be handled by child class')
  }
}

module.exports = WebPageItem
