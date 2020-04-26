import { CommentOptions } from '../types';
import { PluginOptionAPI } from 'vuepress-types';

export = (option: CommentOptions): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'comment',

    define: () =>
      ({
        COMMENT_OPTIONS: option
      } as Record<string, any>),

    plugins: [
      /** Typescript Support */
      ['typescript']
    ]
  };

  if (option.type === 'vssue')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(['@vssue/vuepress-plugin-vssue', option]);

  return config;
};
