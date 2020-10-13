import { ComponentI18NConfig } from "@mr-hope/vuepress-shared-utils";

export interface ComponentOptions {
  /**
   * 主目录所对应的语言。
   *
   * The language of the home directory.
   *
   * @default 'en-US'
   */
  baseLang?: string;
}

declare global {
  const COMPONENT_I18N: Record<string, ComponentI18NConfig>;
}
