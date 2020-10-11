'use strict'

const hash = require('object-hash')

class DistinctArray extends Array {

  constructor(items, key) {
    if (!items) return super()

    const distinctObject = {}
    for(let i = 0; i < items.length; i++) {
      const objectAtIndex = items[i];
      let objectAtIndexKey
      
      if (key) {
        // If comparison key is included, look only at the property for comparisons
        objectAtIndexKey = objectAtIndex[key]
      } else {
        // if no comparison key is included, compare the entire contents of the object
        objectAtIndexKey = hash(objectAtIndex)
      }
      // store the object in the hash table with the key for it's index
      // this will override any existing objects with the same key, enforcing distinct-ness
      if (objectAtIndexKey) {
        distinctObject[objectAtIndexKey] = objectAtIndex
      }
    }
    // Return all the values as they are now distinct by key
    const distinctArray = Object.values(distinctObject)
    return super(...distinctArray)
  }
}

module.exports = DistinctArray