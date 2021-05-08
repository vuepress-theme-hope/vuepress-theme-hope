import type { Plugin } from "@mr-hope/vuepress-types";
import type { CleanUrlOptions } from "../types";

export const cleanUrlPlugin: Plugin<CleanUrlOptions> = ({
  normalSuffix = "",
  indexSuffix = "/",
  notFoundPath = "/404.html",
}) => ({
  name: "clean-url",

  extendPageData(page): void {
    const { regularPath, frontmatter = {} } = page;

    if (!frontmatter.permalink) {
      if (regularPath === "/404.html")
        // path for 404 page
        page.path = notFoundPath;
      else if (regularPath.endsWith(".html"))
        // normal path
        // e.g. foo/bar.md -> foo/bar.html
        page.path = `${regularPath.slice(0, -5)}${normalSuffix}`;
      else if (regularPath.endsWith("/"))
        // index path
        // e.g. foo/index.md -> foo/
        page.path = `${regularPath.slice(0, -1)}${indexSuffix}`;
    }
  },
});
