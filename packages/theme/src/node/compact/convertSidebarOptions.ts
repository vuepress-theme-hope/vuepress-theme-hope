import {
  entries,
  fromEntries,
  isArray,
  isPlainObject,
  isString,
} from "@vuepress/helper";
import { colors } from "vuepress/utils";

import { deprecatedLogger, droppedLogger } from "./utils.js";
import type {
  SidebarArrayOptions,
  SidebarItem,
  SidebarOptions,
} from "../../shared/index.js";
import { logger } from "../utils.js";

const handleArraySidebarOptions = (
  config: SidebarArrayOptions,
): SidebarArrayOptions =>
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
            // @ts-ignore
            options: item,
            deprecatedOption,
            newOption,
            scope: "sidebar",
          }),
        );

        // @ts-ignore
        droppedLogger(item, "sidebarDepth", "Found in sidebar");

        if ("children" in item && isArray(item.children))
          handleArraySidebarOptions(item.children);

        return item as SidebarItem;
      }

      return null;
    })
    .filter((item): item is SidebarItem => item !== null);

/**
 * @deprecated You should use V2 standard sidebar config and avoid using it
 */
export const convertSidebarOptions = (
  config: unknown,
): SidebarOptions | false => {
  if (config === false || config === "structure") return config;

  if (isArray(config))
    return handleArraySidebarOptions(config as SidebarArrayOptions);

  if (isPlainObject(config) && config)
    return fromEntries(
      entries(config).map<[string, SidebarArrayOptions | "structure" | false]>(
        ([key, value]) => {
          if (isArray(value))
            return [
              key,
              handleArraySidebarOptions(value as SidebarArrayOptions),
            ];

          if (value === "structure" || value === false)
            return [key, <"structure" | false>value];

          logger.error(
            '"sidebar" value should be an array, "structure" or false when setting as an object',
          );

          return [key, false];
        },
      ),
    );

  logger.error(
    `${colors.magenta(
      "sidebar",
    )} config should be: an array, an object, "structure" or false`,
  );

  return false;
};
