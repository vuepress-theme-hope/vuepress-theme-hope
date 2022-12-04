import { deprecatedLogger } from "./utils.js";
import { logger } from "../utils.js";

import type {
  NavbarOptions,
  NavbarItem,
  NavbarGroup,
} from "../../shared/index.js";

const handleNavbarOptions = (config: unknown[]): NavbarOptions =>
  config
    .map((item) => {
      if (typeof item === "string") return item;

      if (typeof item === "object" && item) {
        deprecatedLogger({
          options: item as Record<string, unknown>,
          deprecatedOption: "items",
          newOption: "children",
          scope: "navbar",
        });

        // @ts-ignore
        if (Array.isArray(item.children))
          // @ts-ignore
          handleNavbarOptions(item.children as unknown[]);

        return item as NavbarItem | NavbarGroup;
      }

      return null;
    })
    .filter((item): item is NavbarItem | NavbarGroup | string => item !== null);

/**
 * @deprecated You should use V2 standard navbar config and avoid using it
 */
export const convertNavbarOptions = (
  config: unknown
): NavbarOptions | false => {
  if (config === false) return false;
  if (Array.isArray(config)) return handleNavbarOptions(config);

  logger.error('"navbar" config should be an array');

  return false;
};
