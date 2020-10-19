'use strict'

const md5 = require('md5')
const HYPHENS_POSITIONS = [8, 12, 16, 20]

function insert(source, position, value) {
  return [...source.slice(0, position), value, ...source.slice(position)];
}

module.exports = {
  init(baseValue) {
    // to ensure an id can be regnerated from variations of the same string, format consistently
    let trimmedValue = baseValue.trim().toLowerCase().replace(/[^a-zA-Z0-9-]/g,'').replace(' ', '');
    const value = md5(trimmedValue)
    if (typeof value !== 'string') {
      throw new Error(`Value must be string`)
    }
  
    let array = value.split('')
    let offset = 0
    for (const num of HYPHENS_POSITIONS) {
      const position = num + offset++
      array = insert(array, position, '-')
    }
    const uuid = array.join('')
    return uuid
  }
}
