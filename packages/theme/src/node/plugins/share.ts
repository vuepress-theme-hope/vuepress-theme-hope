import { isPlainObject } from "@vuepress/helper";
import type { SharePluginOptions } from "@vuepress/plugin-share";
import { sharePlugin } from "@vuepress/plugin-share";
import type { Plugin } from "vuepress/core";

/**
 * Resolve options for `@vuepress/plugin-share`
 *
 * 解析 `@vuepress/plugin-share` 的选项
 *
 * @param share - User options / 用户选项
 * @returns Share plugin instance or `null` / 分享插件实例或 `null`
 */
export const getSharePlugin = (share?: SharePluginOptions | false): Plugin | null =>
  isPlainObject(share) ? sharePlugin(share) : null;
