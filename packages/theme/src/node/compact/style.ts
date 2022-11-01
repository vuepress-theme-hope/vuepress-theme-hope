import { fs, logger } from "@vuepress/utils";
import type { App } from "@vuepress/core";

/**
 * @deprecated You should use scss style files in v2 and avoid using it
 */
export const checkStyle = (app: App): void => {
  if (
    fs.existsSync(app.dir.source(".vuepress/styles/index.styl")) &&
    !fs.existsSync(app.dir.source(".vuepress/styles/index.scss"))
  ) {
    logger.error(
      "V2 style switched to scss instead of stylus, so you should remove index.styl and create index.scss under .vuepress/styles."
    );
  }

  if (
    fs.existsSync(app.dir.source(".vuepress/styles/palette.styl")) &&
    !fs.existsSync(app.dir.source(".vuepress/styles/palette.scss")) &&
    !fs.existsSync(app.dir.source(".vuepress/styles/config.scss"))
  ) {
    logger.error(
      "V2 style switched to scss instead of stylus, so you should remove palette.styl and create config.scss and palette.scss under .vuepress/styles."
    );
  }
};
