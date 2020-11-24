import { ComponentI18NConfig, Langs } from "@mr-hope/vuepress-shared";

export interface ComponentOptions {
  /**
   * 主目录所对应的语言。
   *
   * The language of the home directory.
   *
   * @default 'en-US'
   */
  baseLang?: Langs;
}

declare global {
  const COMPONENT_I18N: Record<string, ComponentI18NConfig>;
}
