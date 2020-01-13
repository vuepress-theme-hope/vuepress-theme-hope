import { PluginOptionAPI } from 'vuepress-types';
import { ThemeColorOptions } from './globals';
import { resolve } from 'path';

const pluginOption = (options: ThemeColorOptions): PluginOptionAPI =>
  ({
    name: 'theme-color',

    define: () =>
      ({
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
          compilerOptions: { declaration: false }
        });
    }
  } as PluginOptionAPI);

export = pluginOption;
