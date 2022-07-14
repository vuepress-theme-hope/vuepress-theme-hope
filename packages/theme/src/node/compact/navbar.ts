import { deprecatedLogger } from "./utils";
import { logger } from "../utils";

import type {
  HopeThemeNavbarConfig,
  HopeThemeNavbarItem,
  HopeThemeNavbarGroup,
} from "../../shared";

const handleNavbarConfig = (config: unknown[]): HopeThemeNavbarConfig =>
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (Array.isArray(item.children))
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          handleNavbarConfig(item.children as unknown[]);

        return item as HopeThemeNavbarItem | HopeThemeNavbarGroup;
      }

      return null;
    })
    .filter(
      (item): item is HopeThemeNavbarItem | HopeThemeNavbarGroup | string =>
        item !== null
    );

/**
 * @deprecated You should use V2 standard navbar config and avoid using it
 */
export const convertNavbarConfig = (
  config: unknown
): HopeThemeNavbarConfig | false => {
  if (config === false) return false;
  if (Array.isArray(config)) return handleNavbarConfig(config);

  logger.error('"navbar" config should be an array');

  return false;
};
