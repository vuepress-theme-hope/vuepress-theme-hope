import { isPlainObject } from "@vuepress/helper";
import type { MediaPluginOptions } from "@vuepress/plugin-media";
import { mediaPlugin } from "@vuepress/plugin-media";
import type { Plugin } from "vuepress/core";

/**
 * Resolve options for `@vuepress/plugin-media`
 *
 * @param media - User options
 * @returns Media plugin instance or `null`
 */
export const getMediaPlugin = (media?: MediaPluginOptions | false): Plugin | null =>
  isPlainObject(media) ? mediaPlugin(media) : null;
