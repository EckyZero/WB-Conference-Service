'use strict';

module.exports = {
  /**
   * Parse the first name from a full name
   * @param {string} fullName - first/middle/last name of an individual
   * @return {string} - first name of the full name
   */
  parseFirstName(fullName) {
    if (!fullName) return null;

    const names = fullName.split(' ');

    const firstName = this.trimName(names[0]);

    return firstName;
  },

  /**
   * Parse the middle name from a full name
   * @param {string} fullName - first/middle/last name of an individual
   * @return {string} - middle name of the full name
   */
  parseMiddleName(fullName) {
    if (!fullName) return null;

    const names = fullName.split(' ');

    if (names.length < 2) return null;

    // If we only have a first & last, ignore trying to parse the middle name
    const name = names.length === 2 ? null : names[1];
    const middleName = this.trimName(name);

    return middleName;
  },

  /**
   * Parse the last name from a full name
   * @param {string} fullName - first/middle/last name of an individual
   * @return {string} - last name of the full name
   */
  parseLastName(fullName) {
    if (!fullName) return null;

    const names = fullName.split(' ');

    if (names.length < 2) return null;

    // Last name is at a different index if we don't have a middle name
    const name = names.length === 2 ? names[1] : names[2];
    const lastName = this.trimName(name);

    return lastName;
  },

  /**
   * Removes any annotations in the name (ex: .)
   * @param {string} name - name to trim
   * @return {string} - the name with annotations removed
   */
  trimName(name) {
    if (!name) return null;

    const trimmedName = name.replace(/\./g, '').trim();

    return trimmedName;
  }
}

