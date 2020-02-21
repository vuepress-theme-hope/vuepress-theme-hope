/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-02-21 11:54:49
 * @Description:
 */
import { Context, PluginOptionAPI } from 'vuepress-types';
import { ThemeColorOptions } from '../typings';
import { resolve } from 'path';

export = (options: ThemeColorOptions, context: Context): PluginOptionAPI =>
  ({
    name: 'theme-color',

    define: () =>
      ({
        THEME_COLOR_OPTIONS: options || {}
      } as Record<string, any>),

    enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

    /** Typescript Support */
    chainWebpack: (chainWebpackConfig, isServer): void => {
      if (!context.themeConfig.tsEnable) {
        const { cacheDirectory, cacheIdentifier } = context as any;
        const finalCacheIdentifier = `${cacheIdentifier}isServer:${isServer}`;

        chainWebpackConfig.resolve.extensions.add('.ts');

        chainWebpackConfig.module
          .rule('ts')
          .test(/\.ts$/u)
          .use('cache-loader')
          .loader('cache-loader')
          .options({
            cacheDirectory,
            cacheIdentifier: finalCacheIdentifier
          })
          .end()
          .use('ts-loader')
          .loader('ts-loader')
          .options({
            appendTsSuffixTo: [/\.vue$/u, /\.md$/u],
            compilerOptions: { declaration: false }
          })
          .end();
      }
    }
  } as PluginOptionAPI);
