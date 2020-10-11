'use strict'

const md5 = require('md5')

const HYPHENS_POSITIONS = [8, 12, 16, 20]
const VALUE_REGEXP = /^[0-9A-Fa-f]{32}$/

class UUID extends String {
  constructor(baseValue) {
    const value = md5(baseValue)
    if (typeof value !== 'string') {
      throw new Error(`Value must be string`)
    }
    if (!VALUE_REGEXP.test(value)) {
      throw new Error(`Value must be string of 32 hexadecimal numbers`)
    }
  
    let array = value.split('')
    let offset = 0
    for (const num of HYPHENS_POSITIONS) {
      const position = num + offset++
      array = insert(array, position, '-')
    }
    const uuid = array.join('')
    super(uuid)
  }
}

function insert(source, position, value) {
  return [...source.slice(0, position), value, ...source.slice(position)];
}

module.exports = UUID
