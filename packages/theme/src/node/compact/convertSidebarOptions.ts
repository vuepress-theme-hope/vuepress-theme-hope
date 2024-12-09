import {
  entries,
  fromEntries,
  isArray,
  isPlainObject,
  isString,
} from "@vuepress/helper";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared";

import type {
  SidebarArrayOptions,
  SidebarItemOptions,
  SidebarOptions,
} from "../../shared/index.js";
import { logger } from "../utils.js";

const { deprecatedLogger, droppedLogger } = createConverter("theme sidebar");

const handleArraySidebarOptions = (
  config: SidebarArrayOptions,
  localePath: string,
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

        convertConfig.forEach(([oldOption, newOption]) => {
          deprecatedLogger({
            // @ts-expect-error: Type is too narrow
            options: item,
            old: oldOption,
            new: newOption,
            scope: localePath,
          });
        });

        droppedLogger({
          // @ts-expect-error: Type is too narrow
          options: item,
          old: "sidebarDepth",
          scope: localePath,
        });

        if ("children" in item && isArray(item.children))
          handleArraySidebarOptions(item.children, localePath);

        return item as SidebarItemOptions;
      }

      return null;
    })
    .filter((item): item is SidebarItemOptions => item !== null);

/**
 * @deprecated You should use V2 standard sidebar config and avoid using it
 */
export const convertSidebarOptions = (
  config: unknown,
  localePath = "",
): SidebarOptions | false => {
  if (config === false || config === "structure") return config;

  if (isArray(config))
    return handleArraySidebarOptions(config as SidebarArrayOptions, localePath);

  if (isPlainObject(config))
    return fromEntries(
      entries(config).map<[string, SidebarArrayOptions | "structure" | false]>(
        ([key, value]) => {
          if (isArray(value))
            return [
              key,
              handleArraySidebarOptions(
                value as SidebarArrayOptions,
                `${localePath} > ${key}`,
              ),
            ];

          if (value === "structure" || value === false)
            return [key, value as "structure" | false];

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
