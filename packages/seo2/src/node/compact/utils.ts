import { chalk } from "@vuepress/utils";
import { logger } from "../utils.js";

export const droppedLogger = (
  options: Record<string, unknown>,
  droppedOption: string,
  hint = "",
  newOption = ""
): void => {
  if (droppedOption in options) {
    logger.error(
      `"${chalk.magenta(droppedOption)}" is ${chalk.red("removed")}${
        newOption
          ? `, please use ${chalk.magenta(newOption)} instead.`
          : " and no longer supported"
      }${hint ? `\n${hint}` : ""}`
    );

    if (!newOption) delete options[droppedOption];
  }
};
