/**
 * Get a list of integers from a list of strings
 * @param {string[]} list
 * @returns {number[]} The list of integers
 */
export const getIntergersFromList = (list: string[]): number[] =>
  list.map((item) => Number(item)).filter((item) => !Number.isNaN(item));
