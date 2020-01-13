import { CommentOptions } from './globals';
import { PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';

export = (options: CommentOptions): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'comment',

    define: () =>
      ({
        COMMENT_OPTIONS: options || {}
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
  };

  if (options && options.type === 'vssue')
    config.plugins = [['@vssue/vuepress-plugin-vssue', options]];

  return config;
};
