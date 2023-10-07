/**
 * Converts a string to title case.
 * @param {string} input - The string to convert.
 * @returns {string} - The converted string.
 */
export const toTitleCase = (input: string): string =>
  input
    ?.trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") || "";

/**
 * Converts a role to text.
 * @param {string} role - The role to convert.
 * @returns {string} - The converted role.
 */
export const roleToText = (role: string): string => {
  if (!role) {
    return "";
  }
  return toTitleCase(role.replace(/_/g, " "));
};

/**
 * Pluralize a word
 * @param {string} word - the word to pluralize
 * @param {number} count - the number of items
 * @returns {string} - the pluralized word
 */
export const pluralize = (word: string, count: number): string => {
  if (count === 1) {
    return word;
  }

  return word.endsWith("y") && !/[aeiou]y/i.test(word)
    ? `${word.slice(0, word.length - 1)}ies`
    : `${word}s`;
};
