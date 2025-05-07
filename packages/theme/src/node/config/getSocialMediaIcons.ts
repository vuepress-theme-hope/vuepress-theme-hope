import {
  entries,
  isLinkHttp,
  isPlainObject,
  isString,
  startsWith,
} from "@vuepress/helper";
import { fs } from "vuepress/utils";

import type { ThemeData } from "../../shared/index.js";
import { TEMPLATE_FOLDER, logger } from "../utils.js";

/** @private */
export const getSocialMediaIcons = (
  themeData: ThemeData,
): Record<string, string> => {
  const iconData: Record<string, string> = {};

  const isIconInvalid = (
    key: string,
    value: string | { icon: string; link: string },
  ): boolean => {
    if (isString(value)) {
      const templatePath = `${TEMPLATE_FOLDER}/socialMediaIcons/${key.toLocaleLowerCase()}.svg`;

      if (fs.existsSync(templatePath)) {
        iconData[key] = fs.readFileSync(templatePath, { encoding: "utf-8" });

        return false;
      }

      logger.warn(
        `${key} is not a built-in media, you should provide an icon for it!`,
      );

      return true;
    }

    if (isPlainObject(value)) {
      if (
        // It's a link
        isLinkHttp(value.icon) ||
        // It’s a svg string
        startsWith(value.icon, "<svg")
      )
        return false;

      logger.warn(
        `${key}'s icon ${value.icon} in blog media config is invalid!`,
      );

      return true;
    }

    logger.warn(`${key} icon in blog media config has an invalid config!`);

    return true;
  };

  entries(themeData.blog?.medias ?? {}).forEach(([key, value]) => {
    if (isIconInvalid(key, value)) delete themeData.blog?.medias?.[key];
  });

  entries(themeData.locales).forEach(([path, { blog }]) => {
    entries(blog?.medias ?? {}).forEach(([key, value]) => {
      if (isIconInvalid(key, value))
        delete themeData.locales[path].blog?.medias?.[key];
    });
  });

  return iconData;
};
