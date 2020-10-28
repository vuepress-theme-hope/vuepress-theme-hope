export { deepAssign, deepAssignReverse } from "./assign";

export { changeClass } from "./dom";

export {
  checkLang,
  lang2path,
  path2lang,
  getDefaultLocale,
  getLocale,
} from "./i18n";
export * from "./i18n/config";

export const capitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const strictCapitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
