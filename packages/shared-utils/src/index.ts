import {
  deepAssign as deepAssignFunction,
  deepAssignReverse as deepAssignReverseFunction
} from './assign';
import i18nConfig from './i18n';

export * from '../types';

export const capitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

export const deepAssign = deepAssignFunction;
export const deepAssignReverse = deepAssignReverseFunction;

export const i18n = i18nConfig;

export default { deepAssign, deepAssignReverse, i18n };
