import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import * as wbb from 'workbox-build';
import { Context, PluginOptionAPI } from 'vuepress-types';
import { PWAOptions } from '../types';
import { resolve } from 'path';

// eslint-disable-next-line max-lines-per-function
export = (options: PWAOptions, context: Context): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'pwa',

    define: { SW_BASE_URL: context.base || '/' },

    globalUIComponents: options.popupComponent || 'SWUpdatePopup',

    enhanceAppFiles: resolve(__dirname, './enhanceAppFile.ts'),

    plugins: [
      /** typescript 支持 */
      ['typescript']
    ]
  };

  config.generated = async (): Promise<any> => {
    console.log(chalk.cyan('wait'), 'Generating service worker...');

    const swFilePath = resolve(context.outDir, './service-worker.js');

    await wbb.generateSW({
      swDest: swFilePath,
      globDirectory: context.outDir,
      globPatterns: [
        '**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}'
      ],
      ...(options.generateSWConfig || {})
    });
    await fs.writeFile(
      swFilePath,
      await fs.readFile(resolve(__dirname, './skip-waiting.js'), 'utf8'),
      { flag: 'a' }
    );
  };

  return config;
};
