import { isArray, isPlainObject } from "@vuepress/helper";
import type { NoticeOptions, NoticePluginOptions } from "@vuepress/plugin-notice";
import { noticePlugin } from "@vuepress/plugin-notice";
import type { Plugin } from "vuepress";

/**
 * resolve options for `@vuepress/plugin-notice`
 *
 * @param options Notice plugin options or an array of notice options to enable it with default options
 * @returns Notice plugin instance or null
 */
export const getNoticePlugin = (options?: NoticePluginOptions | NoticeOptions[]): Plugin | null =>
  isArray(options)
    ? noticePlugin({ config: options })
    : isPlainObject(options)
      ? noticePlugin(options)
      : null;
