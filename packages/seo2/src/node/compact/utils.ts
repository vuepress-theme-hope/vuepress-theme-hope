import { colors } from "@vuepress/utils";

import { logger } from "../utils.js";

export const droppedLogger = (
  options: Record<string, unknown>,
  droppedOption: string,
  hint = "",
  newOption = "",
): void => {
  if (droppedOption in options) {
    logger.error(
      `"${colors.magenta(droppedOption)}" is ${colors.red("removed")}${
        newOption
          ? `, please use ${colors.magenta(newOption)} instead.`
          : " and no longer supported"
      }${hint ? `\n${hint}` : ""}`,
    );

    if (!newOption) delete options[droppedOption];
  }
};
