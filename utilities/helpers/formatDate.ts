/**
 * Convert date string to Date object
 * @param dateString - date string to convert
 * @returns {Date | null} - the date object
 */
export const stringToDate = (dateString: string | number): Date | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const date = new Date(dateString);
    return date;
  } catch (error) {
    return null;
  }
};

/**
 * Format date to locale
 * @param inputDate - date to format
 * @returns {string} - the formatted date
 */
export const getFormatedDate = (inputDate: string): string => {
  const date = stringToDate(inputDate);
  if (!date) {
    return "";
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  return formattedDate;
};

/**
 * Format time to locale
 * @param inputDate - date to format
 * @returns {string} - the formatted time
 */
export const getTime = (inputDate: string | number): string => {
  const date = stringToDate(inputDate);
  if (!date) {
    return "";
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  return formattedTime;
};

/**
 * Format date to locale
 * @param inputDate - date to format
 * @returns {string} - the formatted date
 */
export const getFormatedDateFromTimestamp = (inputDate: number): string => {
  const date = stringToDate(inputDate);
  if (!date) {
    return "";
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  return formattedDate;
};

/**
 * Format time to locale
 * @param inputDate - date to format
 * @returns {string} - the formatted time
 */
export const getFormatedTimeFromTimestamp = (inputDate: number): string => {
  const date = stringToDate(inputDate);
  if (!date) {
    return "";
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  return formattedTime;
};

/**
 * Get time ago from date
 * @param inputDate - date to format
 * @returns {string} - the formatted time ago
 */
export const getTimeAgo = (inputDate: string | number): string => {
  const date = stringToDate(inputDate);
  if (!date) {
    return "";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let unit = "second";

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${unit}${diffInSeconds !== 1 ? "s" : ""} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  unit = "minute";
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${unit}${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  unit = "hour";
  if (diffInHours < 24) {
    return `${diffInHours} ${unit}${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  unit = "day";
  if (diffInDays < 7) {
    return `${diffInDays} ${unit}${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  unit = "week";
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${unit}${diffInWeeks !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  unit = "month";
  if (diffInMonths < 12) {
    return `${diffInMonths} ${unit}${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  unit = "year";
  return `${diffInYears} ${unit}${diffInYears !== 1 ? "s" : ""} ago`;
};
