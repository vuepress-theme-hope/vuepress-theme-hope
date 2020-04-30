import { Context, PluginOptionAPI } from 'vuepress-types';
import { CommentOptions } from '../types';
import readingTime from './reading-time';

export = (
  options: CommentOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'comment',

    define: () =>
      ({
        COMMENT_OPTIONS: options
      } as Record<string, any>),

    plugins: [
      /** Typescript Support */
      ['typescript']
    ],

    extendPageData($page): void {
      ($page as any).readingTime = readingTime(
        // eslint-disable-next-line no-underscore-dangle
        $page._strippedContent,
        options.wordPerminute || themeConfig.wordPerminute || 300
      );
    }
  };

  if (options.type === 'vssue')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(['@vssue/vuepress-plugin-vssue', options]);

  return config;
};
