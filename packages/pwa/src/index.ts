import * as fs from 'fs-extra';
import * as logger from '@vuepress/shared-utils/lib/logger';
import * as wbb from 'workbox-build';
import { Context, PluginOptionAPI } from 'vuepress-types';
import { PWAOptions } from '../typings';
import { resolve } from 'path';

// eslint-disable-next-line max-lines-per-function
export = (
  options: PWAOptions,
  { base = '/', outDir, themeConfig }: Context
): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'pwa',

    define: { SW_BASE_URL: base },

    globalUIComponents: options.popupComponent || 'SWUpdatePopup',

    enhanceAppFiles: resolve(__dirname, './enhanceAppFile.ts'),

    /** Typescript Support */
    chainWebpack: chainWebpackConfig => {
      chainWebpackConfig.resolve.extensions.add('.ts');

      chainWebpackConfig.module
        .rule('ts')
        .test(/\.ts$/u)
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          appendTsSuffixTo: [/\.vue$/u, /\.md$/u],
          compilerOptions: { declaration: false }
        });
    }
  };

  const { baseLang } = themeConfig;
  const generateSWConfig = options.generateSWConfig || {};

  // 使用何处的 workbox
  if (!('importWorkboxFrom' in generateSWConfig))
    if (typeof options.internal !== 'undefined')
      generateSWConfig.importWorkboxFrom = options.internal ? 'local' : 'cdn';
    else if (baseLang === 'zh-CN') generateSWConfig.importWorkboxFrom = 'local';

  config.generated = async (): Promise<any> => {
    const swFilePath = resolve(outDir, './service-worker.js');

    logger.wait('Generating service worker...');

    await wbb.generateSW({
      swDest: swFilePath,
      globDirectory: outDir,
      globPatterns: [
        '**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}'
      ],
      ...generateSWConfig
    });
    await fs.writeFile(
      swFilePath,
      await fs.readFile(resolve(__dirname, './skip-waiting.js'), 'utf8'),
      { flag: 'a' }
    );
  };

  return config;
};
