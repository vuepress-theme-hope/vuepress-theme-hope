import type { BlogPluginOptions } from "../../../shared/index.js";

export const DEFAULT_OPTIONS: BlogPluginOptions = {
  article: "/article/",
  category: "/category/",
  categoryItem: "/category/:name/",
  tag: "/tag/",
  tagItem: "/tag/:name/",
  encrypted: "/encrypted/",
  slide: "/slide/",
  star: "/star/",
  timeline: "/timeline/",
};

export const getBlogOptions = (
  options?: BlogPluginOptions | boolean
): BlogPluginOptions => ({
  ...DEFAULT_OPTIONS,
  ...(typeof options === "object" ? options : {}),
});
