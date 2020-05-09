import { Context, PluginOptionAPI } from 'vuepress-types';
import { ReadingTimeOptions } from '../types';
import readingTime from './reading-time';

export = (
  options: ReadingTimeOptions,
  { themeConfig }: Context
): PluginOptionAPI => ({
  name: 'reading-time',

  extendPageData($page): void {
    ($page as any).readingTime = readingTime(
      // eslint-disable-next-line no-underscore-dangle
      $page._strippedContent,
      options.wordPerminute || themeConfig.wordPerminute || 300
    );
  }
});
