import { isArray, isPlainObject, isString } from "@vuepress/helper";
import { colors } from "vuepress/utils";

import { deprecatedLogger } from "./utils.js";
import type {
  AutoLinkOptions,
  NavbarGroupOptions,
  NavbarLinkOptions,
  NavbarOptions,
} from "../../shared/index.js";
import { logger } from "../utils.js";

type LegacyNavbarOptions = (
  | string
  | AutoLinkOptions
  | (NavbarGroupOptions & { items?: (AutoLinkOptions | string)[] })
)[];

const handleNavbarOptions = (config: LegacyNavbarOptions): NavbarOptions =>
  config
    .map((item) => {
      if (isString(item)) return item;

      if (isPlainObject(item)) {
        deprecatedLogger({
          // @ts-expect-error: Type is too narrow
          options: item,
          deprecatedOption: "items",
          newOption: "children",
          scope: "navbar",
        });

        if ("children" in item && isArray(item.children))
          handleNavbarOptions(item.children);

        return item as NavbarLinkOptions | NavbarGroupOptions;
      }

      return null;
    })
    .filter(
      (item): item is NavbarLinkOptions | NavbarGroupOptions | string =>
        item !== null,
    );

/**
 * @deprecated You should use V2 standard navbar config and avoid using it
 */
export const convertNavbarOptions = (
  config: unknown,
): NavbarOptions | false => {
  if (config === false) return false;
  if (isArray(config)) return handleNavbarOptions(config as NavbarOptions);

  logger.error(`${colors.magenta("navbar")} config should be an array`);

  return false;
};

/**
 * @deprecated You should use V2 standard navbar config and avoid using it
 */
export const convertNavbarLayoutOptions = (
  options: Record<string, unknown>,
): void => {
  // Handle navbar layout
  if (isPlainObject(options.navbarLayout)) {
    if ("left" in options.navbarLayout) {
      logger.warn(
        `To have better meaning under RTL layout, ${colors.magenta(
          "navbarLayout.left",
        )}" option is deprecated, please use ${colors.magenta(
          "navbarLayout.start",
        )} instead`,
      );
      options.navbarLayout.start = options.navbarLayout.left as string[];
    }

    if ("right" in options.navbarLayout) {
      logger.warn(
        `To have better meaning under RTL layout, ${colors.magenta(
          "navbarLayout.right",
        )}" option is deprecated, please use ${colors.magenta(
          "navbarLayout.end",
        )} instead`,
      );
      options.navbarLayout.end = options.navbarLayout.right as string[];
    }
  }
};
