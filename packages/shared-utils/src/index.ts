import i18nConfig from './i18n';
import loaderOptions from './loaderOptions';

export {
  HopeLangLocalesConfig,
  HopeNavBarConfig,
  HopeSideBarConfigItem,
  HopeSideBarConfig,
  LangLocalesConfig,
  NavBarConfig,
  SideBarConfigItem,
  SideBarConfig
} from './i18n/config';

export const i18n = i18nConfig;
export const tsOptions = loaderOptions;

export default { i18n, tsOptions };
