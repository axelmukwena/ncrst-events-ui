/**
 * Copy text to clipboard
 * @param text
 * @returns {Promise<boolean>}
 */
export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};
