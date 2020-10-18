'use strict'

module.exports = {
  currentTime() {
    return process.hrtime();
  },

  /**
   * Get milleseconds since start
   * @param {Array} start - the time array object from the currentTime() method
   * @return {number} - double since start
   */
  getMillisecondsSinceTime(start) {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  },

  /**
   * Sleep the main thread for the allotted milliseconds
   * @param {number} ms - millesonds to wait
   * @return {Promise} - an awaitable promise for the designated time
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}