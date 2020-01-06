import { PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';
import { tsoptions } from '@mr-hope/vuepress-shared-utils';

const pluginOption = (options: ThemeColorOptions): PluginOptionAPI => ({
  name: 'theme-color',

  define: () => ({
    THEME_COLOR_OPTIONS: options || {}
  } as Record<string, any>),

  enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

  /** Typescript Support */
  chainWebpack: chainWebpackConfig => {
    chainWebpackConfig.resolve.extensions.add('.ts');

    chainWebpackConfig.module
      .rule('ts')
      .test(/\.ts$/u)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        appendTsSuffixTo: [/\.vue$/u],
        compilerOptions: tsoptions
      });
  }
} as PluginOptionAPI);

module.exports = pluginOption;
