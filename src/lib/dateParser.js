
const _monthStrings = [
  'january', 'february', 'march', 'april',
  'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december'];

module.exports = {
  /**
   * Get the integer representation given the month's names
   * @param {string} month - name of the month (in english, 3+ chars)
   * @return {number} - int version of the month (ex: Jan = 1)
   */
  monthStringToInt(month) {
    if (typeof month !== 'string') return null;
    if (month.length < 3) return null;

    const formattedMonth = month.toLowerCase().trim().substring(0, 3);

    const monthInt = _monthStrings.findIndex(
        (el) => el.includes(formattedMonth)) + 1;
    const response = monthInt === 0 ? null : monthInt;

    return response;
  },

  /**
   * Get the string representation given the month's numeric value
   * @param {number} month - int version of the month (ex: Jan = 1)
   * @return {string} - long-name of the month (ex: january)
   */
  intMonthToString(month) {
    if (typeof month !== 'number') return null;

    const foundMonth = _monthStrings[month - 1];
    const monthString = foundMonth ? foundMonth : null;

    return monthString;
  }
}