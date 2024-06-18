import { isArray, isPlainObject } from "@vuepress/helper";
import type {
  NoticeOptions,
  NoticePluginOptions,
} from "@vuepress/plugin-notice";
import { noticePlugin } from "@vuepress/plugin-notice";
import type { Plugin } from "vuepress";

/**
 * @private
 *
 * resolve options for @vuepress/plugin-notice
 */
export const getNoticePlugin = (
  options?: NoticePluginOptions | NoticeOptions[],
): Plugin | null =>
  isArray(options)
    ? noticePlugin({ config: options })
    : isPlainObject(options)
      ? noticePlugin(options)
      : null;
