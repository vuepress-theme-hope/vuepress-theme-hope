import { colors } from "@vuepress/utils";
import { isArray, isPlainObject, isString } from "vuepress-shared/node";

import { deprecatedLogger } from "./utils.js";
import {
  type AutoLinkOptions,
  type NavbarGroup,
  type NavbarItem,
  type NavbarOptions,
} from "../../shared/index.js";
import { logger } from "../utils.js";

type LegacyNavbarOptions = (
  | string
  | AutoLinkOptions
  | (NavbarGroup & { items?: (AutoLinkOptions | string)[] })
)[];

const handleNavbarOptions = (config: LegacyNavbarOptions): NavbarOptions =>
  config
    .map((item) => {
      if (isString(item)) return item;

      if (isPlainObject(item) && item) {
        deprecatedLogger({
          // @ts-ignore
          options: item,
          deprecatedOption: "items",
          newOption: "children",
          scope: "navbar",
        });

        if ("children" in item && isArray(item.children))
          handleNavbarOptions(item.children);

        return item as NavbarItem | NavbarGroup;
      }

      return null;
    })
    .filter((item): item is NavbarItem | NavbarGroup | string => item !== null);

/**
 * @deprecated You should use V2 standard navbar config and avoid using it
 */
export const convertNavbarOptions = (
  config: NavbarOptions | unknown
): NavbarOptions | false => {
  if (config === false) return false;
  if (isArray(config)) return handleNavbarOptions(config as NavbarOptions);

  logger.error(`${colors.magenta("navbar")} config should be an array`);

  return false;
};
