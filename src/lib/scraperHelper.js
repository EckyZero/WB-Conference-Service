'use strict'

module.exports = {
  getChildElementsWithText(parentElement, textToFind) {
    const childElements = [];

    // don't look further if there is no parent
    if (!parentElement) return childElements;
    // don't look further if there is no parent
    if (!parentElement.data) return childElements;

    // successful match
    if (parentElement.data.includes(textToFind)) return [parentElement];

    // check safety of children before recursevly looking further
    if (parentElement.childNodes === null ||
        parentElement.childNodes.length === 0) return childElements;

    for (let i = 0; i < parentElement.childNodes.length; i++) {
      const childElement = this.getChildElementsWithText(textToFind);
      if (childElement != null) {
        childElements.push(childElements);
      }
    }
    return childElements;
  },

  /**
   * Attempt multiple times with different selectors to get data
   * Depending on the age of the page the site used different selectors
   * @param {jQuery} $ - Parser used to inspect the element
   * @param {string} firstKey - first selector to query by
   * @param {string} secondKey - backup selector to query by
   * @return {string} - data for element
   */
  tryGetChildDataWithSelectors($, firstKey, secondKey) {
    let data;
    const nodeArray = $(firstKey);

    if (!nodeArray || nodeArray.length === 0) {
      if (typeof secondKey === 'string') {
        data = this.tryGetChildDataWithSelectors($, secondKey);
      } else {
        return null;
      }
    }
    const firstNode = nodeArray[0];

    if (firstNode) {
      const firstChild = firstNode.firstChild;
      if (firstChild) {
        data = firstChild.data.trim();
      }
    }
    return data;
  },

   /**
   * Do any values in the array match the passed in value?
   * @param {*} valArray - array to search
   * @param {*} val  - value to find in the array
   * @return {boolean} - true/false depending on if the value was found
   */
  arrayIncludesValue(valArray, val) {
    if (typeof val !== 'string' && typeof val !== 'number') return
    if (typeof valArray !== 'Array' && typeof valArray !== 'object') return

    const includes = valArray.some((el) => new RegExp(el, 'ig').test(val));

    return includes;
  }
}