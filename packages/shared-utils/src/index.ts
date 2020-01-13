import {
  deepAssign as deepAssignFunction,
  deepAssignReverse as deepAssignReverseFunction
} from './assign';
import i18nConfig from './i18n';
export { HopeLangLocalesConfig, LangLocalesConfig } from './i18n/config';

export {
  HopeNavBarConfigItem,
  HopeNavBarConfig,
  HopeSideBarConfigItem,
  HopeSideBarConfig,
  NavBarConfig,
  SideBarConfigItem,
  SideBarConfig
} from './types';

export const deepAssign = deepAssignFunction;
export const deepAssignReverse = deepAssignReverseFunction;

export const i18n = i18nConfig;

export default { deepAssign, deepAssignReverse, i18n };
