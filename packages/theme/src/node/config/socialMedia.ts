import {
  entries,
  isArray,
  isString,
  startsWith,
  values,
} from "@vuepress/helper";
import { fs } from "vuepress/utils";

import type { ThemeData } from "../../shared/index.js";
import { TEMPLATE_FOLDER, logger } from "../utils.js";

/** @private */
export const checkSocialMediaIcons = (
  themeData: ThemeData,
): Record<string, string> => {
  const icons: Record<string, string> = {};

  const checkIcon = (
    key: string,
    value: string | [string, string],
  ): string | false => {
    if (isString(value)) {
      const templatePath = `${TEMPLATE_FOLDER}socialMediaIcons/${key.toLocaleLowerCase()}.svg`;

      if (fs.existsSync(templatePath)) {
        icons[key] = fs.readFileSync(templatePath, { encoding: "utf-8" });

        return value;
      }

      logger.warn(`${key} icon in blog media config not found!`);

      return false;
    }

    if (isArray(value)) {
      // It’s a svg string
      if (startsWith(value[1], "<svg")) {
        icons[key] = value[1];

        return value[0];
      }

      // It’s probably a path
      if (fs.existsSync(value[1])) {
        icons[key] = fs.readFileSync(value[1], { encoding: "utf-8" });

        return value[0];
      }

      logger.warn(`${key}'s icon ${value[1]} in blog media config is invalid!`);

      return false;
    }

    logger.warn(`${key} icon in blog media config has an invalid config!`);

    return false;
  };

  entries(themeData.blog?.medias || {}).forEach(([key, value]) => {
    const result = checkIcon(key, value);

    if (result) themeData.blog!.medias![key] = result;
    else delete themeData.blog!.medias![key];
  });

  if (themeData.locales)
    values(themeData.locales).forEach((localeConfig) => {
      entries(localeConfig.blog?.medias || {}).forEach(([key, value]) => {
        const result = checkIcon(key, value);

        if (result) localeConfig.blog!.medias![key] = result;
        else delete localeConfig.blog!.medias![key];
      });
    });

  return icons;
};
