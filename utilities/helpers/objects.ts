import crypto from "crypto";

import { Role } from "@/backend/service/utility/types";
import { SelectOptionType } from "@/types/utilities";

import { roleToText } from "./text";
import { isNumber } from "./validations";

/**
 * Swap the keys and values of an object
 * @param {Record<string, string | number>} json The object to swap.
 * @returns {Record<number | string, string>} The swapped object.
 */
export const swapKeyValues = (
  json: Record<string, string | number>
): Record<number | string, string> => {
  const ret: Record<string, string> = {};
  Object.keys(json).forEach((key) => {
    ret[json[key]] = key;
  });
  return ret;
};

/**
 * Get the unique values from an array.
 * @param {string[]} array The array.
 * @returns {string[]} The unique values.
 */
export const getUniqueStrings = (array: string[]): string[] =>
  array.filter((value, index, self) => self.indexOf(value) === index);

/**
 * Convert an enum to an object.
 * @param {Record<string, string | number>} enumObj The enum.
 * @returns {Record<string, string | number>} The object.
 */
export const enumToObject = (enumObj: {
  [key: string]: string | number;
}): { [key: string]: string | number } =>
  Object.keys(enumObj)
    .filter((key) => !isNumber(key))
    .reduce(
      (acc, key) => {
        acc[key] = enumObj[key];
        return acc;
      },
      {} as { [key: string]: string | number }
    );

/**
 * Convert an roles to select options.
 * @param {Role[]} roles The roles.
 * @returns {SelectOptionType[]} The select options.
 */
export const roleToSelectOptions = (roles: Role[]): SelectOptionType[] =>
  roles.map((role) => ({
    name: roleToText(role),
    value: role,
  }));

/**
 * Convert an object to a hash.
 * @param {Record<string, any>} obj The object.
 * @returns {string} The hash.
 */
export const objectToHash = (obj: Record<string, any>): string => {
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(obj));
  return hash.digest("hex");
};
