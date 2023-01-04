import { isArray, isPlainObject, isString } from "@vuepress/shared";
import { deprecatedLogger, droppedLogger } from "./utils.js";
import { logger } from "../utils.js";

import type {
  SidebarArrayOptions,
  SidebarItem,
  SidebarOptions,
} from "../../shared/index.js";

const handleArraySidebarOptions = (config: unknown[]): SidebarArrayOptions =>
  config
    .map((item) => {
      if (isString(item)) return item;

      if (isPlainObject(item)) {
        const convertConfig: [string, string][] = [
          ["title", "text"],
          ["path", "link"],
          ["collapsable", "collapsible"],
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

        // @ts-ignore
        if (isArray(item.children))
          // @ts-ignore
          handleArraySidebarOptions(item.children as unknown[]);

        return item as SidebarItem;
      }

      return null;
    })
    .filter((item): item is SidebarItem => item !== null);

/**
 * @deprecated You should use V2 standard sidebar config and avoid using it
 */
export const convertSidebarOptions = (
  config: unknown
): SidebarOptions | false => {
  if (config === false) return false;
  if (isArray(config)) return handleArraySidebarOptions(config);

  if (isPlainObject(config) && config)
    return Object.fromEntries(
      Object.entries(config).map<
        [string, SidebarArrayOptions | "structure" | false]
      >(([key, value]) => {
        if (isArray(value)) return [key, handleArraySidebarOptions(value)];

        if (value === "structure" || value === false)
          return [key, <"structure" | false>value];

        logger.error(
          '"sidebar" value should be an array, "structure" or false when setting as an object'
        );

        return [key, false];
      })
    );

  logger.error('"sidebar" config should be an array or object');

  return false;
};
