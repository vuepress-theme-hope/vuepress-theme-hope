import type { App } from "vuepress/core";
import { colors, fs, logger } from "vuepress/utils";

/**
 * @deprecated You should use scss style files in v2 and avoid using it
 */
export const checkLegacyStyle = (app: App): void => {
  if (
    fs.existsSync(app.dir.source(".vuepress/styles/index.styl")) &&
    !fs.existsSync(app.dir.source(".vuepress/styles/index.scss"))
  )
    logger.error(
      `V2 style switched to scss instead of stylus, so you should remove ${colors.magenta("index.styl")} and create ${colors.magenta("index.scss")} under ${colors.cyan(".vuepress/styles.")}`,
    );

  if (
    fs.existsSync(app.dir.source(".vuepress/styles/palette.styl")) &&
    !fs.existsSync(app.dir.source(".vuepress/styles/palette.scss")) &&
    !fs.existsSync(app.dir.source(".vuepress/styles/config.scss"))
  )
    logger.error(
      `V2 style switched to scss instead of stylus, so you should remove ${colors.magenta("palette.styl")} and create ${colors.magenta("config.scss")} / ${colors.magenta("palette.scss")} under ${colors.cyan(".vuepress/styles.")}.`,
    );
};
