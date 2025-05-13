import { isString } from "@vuepress/helper";
import type { HeadConfig, PageFrontmatter } from "vuepress/shared";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared";

import type { ThemeBasePageFrontmatter } from "../../shared/index.js";
import { logger } from "../utils.js";

const DEPRECATED_FRONTMATTER_OPTIONS: [string, string][] = [
  ["authors", "author"],
  ["time", "date"],
  ["visitor", "pageview"],
  ["copyrightText", "copyright"],
  ["anchorDisplay", "toc"],
  ["updateTime", "lastUpdated"],
  ["contributor", "contributors"],
  ["editLinks", "editLink"],
];

const DEPRECATED_HOME_FRONTMATTER_OPTIONS: [string, string][] = [
  ["darkHeroImage", "heroImageDark"],
  ["action", "actions"],
];

const DROPPED_FRONTMATTER_OPTIONS: [string, string][] = [
  ["metaTitle", "Please use custom resolver to set metaTitle."],
  ["mediaLink", "Social media links are no longer displayed in footer."],
  ["password", "Simple password protection is no longer supported."],
  ["search", "Search plugin no longer support this option."],
];

/**
 * @deprecated You should use V2 standard frontmatter and avoid using it
 */
export const convertFrontmatter = (
  frontmatter: PageFrontmatter & Record<string, unknown>,
  filePathRelative: string,
): ThemeBasePageFrontmatter & Record<string, unknown> => {
  const { deprecatedLogger, droppedLogger } = createConverter("frontmatter");

  DEPRECATED_FRONTMATTER_OPTIONS.forEach(([oldOption, newOption]) => {
    deprecatedLogger({
      options: frontmatter,
      old: oldOption,
      new: newOption,
      scope: filePathRelative ? `${filePathRelative} frontmatter` : "",
    });
  });

  DROPPED_FRONTMATTER_OPTIONS.forEach(([old, msg]) => {
    droppedLogger({
      options: frontmatter,
      old,
      scope: `${filePathRelative ? `${filePathRelative} ` : ""}${msg}`,
    });
  });

  if ("meta" in frontmatter) {
    logger.warn(
      `${colors.magenta(
        "meta",
      )} in frontmatter is deprecated in V2, please use ${colors.magenta(
        "head",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    frontmatter.head = [
      ...(frontmatter.head ?? []),
      ...(frontmatter.meta as Record<string, string>[]).map<HeadConfig>(
        (item) => ["meta", item],
      ),
    ];

    delete frontmatter.meta;
  }

  if ("canonicalUrl" in frontmatter && isString(frontmatter.canonicalUrl)) {
    logger.warn(
      `${colors.magenta(
        "canonicalUrl",
      )} in frontmatter is deprecated, please use ${colors.magenta(
        "head",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    frontmatter.head = [
      ...(frontmatter.head ?? []),
      ["link", { rel: "canonical", href: frontmatter.canonicalUrl }],
    ];

    delete frontmatter.canonicalUrl;
  }

  if (frontmatter.home === true) {
    if (frontmatter.layout === "BlogHome") {
      logger.warn(
        `${colors.magenta(
          "layout: BlogHome",
        )} in frontmatter is deprecated, please use ${colors.magenta(
          "layout: Blog",
        )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
      );

      frontmatter.layout = "Blog";
    }

    // Check project homepage
    if (!("layout" in frontmatter))
      DEPRECATED_HOME_FRONTMATTER_OPTIONS.forEach(([oldOption, newOption]) => {
        deprecatedLogger({
          options: frontmatter,
          old: oldOption,
          new: newOption,
          scope: filePathRelative,
        });
      });
  }

  if (frontmatter.layout === "SlidePage") {
    logger.warn(
      `${colors.magenta(
        "layout: SlidePage",
      )} in frontmatter is deprecated, please use ${colors.magenta(
        "layout: Slides",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    frontmatter.layout = "Slides";
  }

  if (typeof frontmatter.sidebarDepth === "number") {
    logger.warn(
      `${colors.magenta(
        "sidebarDepth",
      )} in frontmatter is deprecated, please use ${colors.magenta(
        "toc.levels",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    if (frontmatter.toc !== false)
      frontmatter.toc = {
        levels: [2, frontmatter.sidebarDepth + 2],
      };
  }

  if (typeof frontmatter.headerDepth === "number") {
    logger.warn(
      `${colors.magenta(
        "headerDepth",
      )} in frontmatter is deprecated, please use ${colors.magenta(
        "toc.levels",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    if (frontmatter.toc !== false)
      frontmatter.toc = {
        levels: [2, frontmatter.headerDepth + 2],
      };
  }

  return frontmatter;
};
