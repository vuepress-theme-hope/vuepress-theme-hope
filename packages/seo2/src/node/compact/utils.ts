import { logger } from "../utils";

export const droppedLogger = (
  options: Record<string, unknown>,
  droppedOption: string,
  hint = "",
  newOption = ""
): void => {
  if (droppedOption in options) {
    logger.error(
      `"${droppedOption}" is removed${
        newOption
          ? `, please use ${newOption} instead.`
          : " and no longer supported"
      }${hint ? `\n${hint}` : ""}`
    );

    if (!newOption) delete options[droppedOption];
  }
};
