import { droppedLogger, deprecatedLogger } from "./utils";
import { logger } from "../utils";

import type {
  HopeThemeSidebarConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarItem,
} from "../../shared";

const handleArraySidebarConfig = (
  config: unknown[]
): HopeThemeSidebarArrayConfig =>
  config
    .map((item) => {
      if (typeof item === "string") return item;

      if (typeof item === "object") {
        const convertConfig: [string, string][] = [
          ["title", "text"],
          ["path", "link"],
        ];

        convertConfig.forEach(([deprecatedOption, newOption]) =>
          deprecatedLogger({
            options: item as Record<string, unknown>,
            deprecatedOption,
            newOption,
            scope: "sidebar",
          })
        );

        droppedLogger(
          item as Record<string, unknown>,
          "sidebarDepth",
          "Found in sidebar"
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (Array.isArray(item.children))
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          handleArraySidebarConfig(item.children as unknown[]);

        return item as HopeThemeSidebarItem;
      }

      return null;
    })
    .filter((item): item is HopeThemeSidebarItem => item !== null);

/**
 * @deprecated You should use V2 standard sidebar config and avoid using it
 */
export const convertSidebarConfig = (
  config: unknown
): HopeThemeSidebarConfig | false => {
  if (config === false) return false;
  if (Array.isArray(config)) return handleArraySidebarConfig(config);

  if (typeof config === "object" && config)
    return Object.fromEntries(
      Object.entries(config).map<
        [string, HopeThemeSidebarArrayConfig | "structure" | false]
      >(([key, value]) => {
        if (Array.isArray(value)) return [key, handleArraySidebarConfig(value)];

        if (value === "structure" || value === false)
          return [key, value as "structure" | false];

        logger.error(
          '"sidebar" value should be an array, "structure" or false when setting as an object'
        );

        return [key, false];
      })
    );

  logger.error('"sidebar" config should be an array or object');

  return false;
};
