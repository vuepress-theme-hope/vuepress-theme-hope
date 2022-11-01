import { deprecatedLogger, droppedLogger } from "./utils.js";
import { logger } from "../utils.js";

import type { HopeThemePageFrontmatter } from "../../shared/index.js";

const DEPRECATED_FRONTMATTER_OPTIONS: [string, string][] = [
  ["authors", "author"],
  ["categories", "category"],
  ["tags", "tags"],
  ["time", "date"],
  ["visitor", "pageview"],
  ["sidebarDepth", "headerDepth"],
  ["copyrightText", "copyright"],
  ["anchorDisplay", "toc"],
  ["updateTime", "lastUpdated"],
  ["contributor", "contributors"],
  ["editLinks", "editLink"],
];

const DEPRECATED_HOME_FRONTMATTER_OPTIONS: [string, string][] = [
  ["title", "heroText"],
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
  frontmatter: Record<string, unknown>,
  filePathRelative = ""
): HopeThemePageFrontmatter & Record<string, unknown> => {
  DEPRECATED_FRONTMATTER_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: frontmatter,
      deprecatedOption,
      newOption,
      scope: `${filePathRelative || ""} frontmatter`,
    })
  );

  DROPPED_FRONTMATTER_OPTIONS.forEach((item) =>
    droppedLogger(
      frontmatter,
      ...item,
      `${filePathRelative ? `Found in ${filePathRelative}` : ""}`
    )
  );

  if ("meta" in frontmatter) {
    logger.warn(
      `"meta" in frontmatter is deprecated in V2, please use "head" instead.${
        filePathRelative ? `Found in ${filePathRelative}` : ""
      }`
    );

    frontmatter["head"] = [
      ...((frontmatter["head"] as unknown[]) || []),
      (frontmatter["meta"] as unknown[]).map((item) => ["meta", item]),
    ];

    delete frontmatter["meta"];
  }

  if ("canonicalUrl" in frontmatter) {
    logger.warn(
      `"canonicalUrl" in frontmatter is deprecated, please use "head" instead.${
        filePathRelative ? `Found in ${filePathRelative}` : ""
      }`
    );

    frontmatter["head"] = [
      ...((frontmatter["head"] as unknown[]) || []),
      ["link", { rel: "canonical", href: frontmatter["canonicalUrl"] }],
    ];

    delete frontmatter["canonicalUrl"];
  }

  // check homepage
  if (frontmatter["home"] === true && !("layout" in frontmatter)) {
    DEPRECATED_HOME_FRONTMATTER_OPTIONS.forEach(
      ([deprecatedOption, newOption]) =>
        deprecatedLogger({
          options: frontmatter,
          deprecatedOption,
          newOption,
          scope: `${filePathRelative || ""} frontmatter`,
        })
    );
  }

  return frontmatter;
};
