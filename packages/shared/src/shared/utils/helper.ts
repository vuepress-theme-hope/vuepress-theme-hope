import { isString } from "@vueuse/core";

export { isArray, isPlainObject } from "@vuepress/shared";
export {
  isBoolean,
  isDef,
  isFunction,
  isNumber,
  isObject,
  isString,
} from "@vueuse/core";

/* String helper */

export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix);

export const endsWith = (str: unknown, suffix: string): boolean =>
  isString(str) && str.endsWith(suffix);

/* Object helper */

export const entries = Object.entries;
export const fromEntries = Object.fromEntries;
export const keys = Object.keys;
export const values = Object.values;
