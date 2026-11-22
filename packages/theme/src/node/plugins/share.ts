import { isPlainObject } from "@vuepress/helper";
import type { SharePluginOptions } from "@vuepress/plugin-share";
import { sharePlugin } from "@vuepress/plugin-share";
import type { Plugin } from "vuepress/core";

/**
 * Resolve options for `@vuepress/plugin-share`
 *
 * 解析 `@vuepress/plugin-share` 的选项
 *
 * @param share - User options, or `true` to use the default share services / 用户选项，或 `true`
 *   表示使用默认分享服务
 * @returns Share plugin instance or `null` / 分享插件实例或 `null`
 */
export const getSharePlugin = (share?: SharePluginOptions | boolean): Plugin | null =>
  share ? sharePlugin(isPlainObject(share) ? share : {}) : null;
