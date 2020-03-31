import { Context, PluginOptionAPI } from 'vuepress-types';
import { ResolvedHopeThemeConfig } from '../types';
import pluginConfig from './lib/plugins';

interface ThemeOptionAPI extends PluginOptionAPI {
  extend?: string;
}

const getAlias = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): Record<string, string> => {
  const { siteConfig } = ctx;
  // Resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      (base) => themeConfig.locales[base].algolia
    );

  const commentEnabled = themeConfig.comment !== false;
  const themeColorEnabled = themeConfig.themeColor !== false;
  const noopModule = 'vuepress-theme-hope/src/lib/noopModule.js';

  return {
    '@AlgoliaSearchBox': isAlgoliaSearch
      ? 'vuepress-theme-hope/src/components/AlgoliaSearchBox.vue'
      : noopModule,
    '@Comment': commentEnabled
      ? '@mr-hope/vuepress-plugin-comment/Comment.vue'
      : noopModule,
    '@PageInfo': commentEnabled
      ? '@mr-hope/vuepress-plugin-comment/PageInfo.vue'
      : noopModule,
    '@ThemeColor': themeColorEnabled
      ? '@mr-hope/vuepress-plugin-theme-color/ThemeColor.vue'
      : noopModule
  };
};

// Theme API.
export = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): ThemeOptionAPI => {
  const config: ThemeOptionAPI = {};

  // 添加文章页面
  if (themeConfig.blog !== false)
    config.additionalPages = [
      {
        path: '/article/',
        frontmatter: { layout: 'BlogEntry' }
      }
    ] as any;

  // 别名配置
  config.alias = getAlias(themeConfig, ctx);

  // 插件选项
  config.plugins = pluginConfig(themeConfig);

  return config;
};
