import { colors } from "@vuepress/utils";

import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { ThemePageFrontmatter } from "../../shared/index.js";
import { logger } from "../utils.js";

const DEPRECATED_FRONTMATTER_OPTIONS: [string, string][] = [
  ["authors", "author"],
  ["categories", "category"],
  ["tags", "tag"],
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
  filePathRelative: string | null = null,
): ThemePageFrontmatter & Record<string, unknown> => {
  DEPRECATED_FRONTMATTER_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: frontmatter,
      deprecatedOption,
      newOption,
      scope: `${filePathRelative || ""} frontmatter`,
    }),
  );

  DROPPED_FRONTMATTER_OPTIONS.forEach((item) =>
    droppedLogger(
      frontmatter,
      item[0],
      `${item[1]}${filePathRelative ? ` (found in ${filePathRelative})` : ""}`,
    ),
  );

  if ("meta" in frontmatter) {
    logger.warn(
      `${colors.magenta(
        "meta",
      )} in frontmatter is deprecated in V2, please use ${colors.magenta(
        "head",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    frontmatter["head"] = [
      ...((frontmatter["head"] as unknown[]) || []),
      (frontmatter["meta"] as unknown[]).map((item) => ["meta", item]),
    ];

    delete frontmatter["meta"];
  }

  if ("canonicalUrl" in frontmatter) {
    logger.warn(
      `${colors.magenta(
        "canonicalUrl",
      )} in frontmatter is deprecated, please use ${colors.magenta(
        "head",
      )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
    );

    frontmatter["head"] = [
      ...((frontmatter["head"] as unknown[]) || []),
      ["link", { rel: "canonical", href: frontmatter["canonicalUrl"] }],
    ];

    delete frontmatter["canonicalUrl"];
  }

  if (frontmatter["home"] === true) {
    if (frontmatter["layout"] === "Blog") {
      logger.warn(
        `${colors.magenta(
          "layout: Blog",
        )} in frontmatter is deprecated, please use ${colors.magenta(
          "layout: BlogHome",
        )} instead.${filePathRelative ? `Found in ${filePathRelative}` : ""}`,
      );

      frontmatter["layout"] = "BlogHome";
    }

    // check project homepage
    if (!("layout" in frontmatter))
      DEPRECATED_HOME_FRONTMATTER_OPTIONS.forEach(
        ([deprecatedOption, newOption]) =>
          deprecatedLogger({
            options: frontmatter,
            deprecatedOption,
            newOption,
            scope: `${filePathRelative || ""} frontmatter`,
          }),
      );
  }

  return frontmatter;
};
