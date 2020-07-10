import {
  deepAssign as deepAssignFunction,
  deepAssignReverse as deepAssignReverseFunction,
} from "./assign";
import domFunction from "./dom";
import i18nConfig from "./i18n";

export const capitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const strictCapitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

export const deepAssign = deepAssignFunction;
export const deepAssignReverse = deepAssignReverseFunction;

export const dom = domFunction;

export const i18n = i18nConfig;

export default { deepAssign, deepAssignReverse, i18n };
