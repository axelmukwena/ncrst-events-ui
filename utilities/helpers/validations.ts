import { UserType } from "@/types/services";

/**
 * Validates a phone number.
 * @param {string} phoneNumber - The phone number.
 * @returns {ValidatePhoneNumberReturn} The validation result.
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  if (phoneNumber) {
    const e164Format = /^\+[1-9]\d{1,14}$/;
    if (!e164Format.test(phoneNumber)) {
      return false;
    }
    if (phoneNumber.length < 13 || phoneNumber.length > 14) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if a string is a number.
 * @param {string} value - The value to check.
 * @returns {boolean} True if the value is a number.
 */
export const isNumber = (value: string): boolean =>
  Number.isNaN(Number(value)) === false;

/**
 * Checks if user type is internal.
 * @param {UserType} userType - The user type.
 * @returns {boolean | null} True if the user type is internal.
 */
export const isUserInternal = (userType: UserType): boolean | null => {
  if (userType === "daaily") {
    return true;
  }
  if (userType === "client") {
    return false;
  }
  return null;
};
