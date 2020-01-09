import i18nConfig from './i18n';
import loaderOptions from './loaderOptions';

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

export const i18n = i18nConfig;
export const tsOptions = loaderOptions;

export default { i18n, tsOptions };
