'use strict'

module.exports = {
  async executeSyncAsAsync (syncFunction) {
    return new Promise((resolve, reject) => {
      try {
        setImmediate(() => {
          return resolve(syncFunction())
        })
      } catch (e) {
        console.log('Error converting syncFunction to asyncFunction')
        return reject(e)
      }
    })
  },
}
