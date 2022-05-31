import { logger } from "../utils";

export interface DeprecatedLoggerOptions {
  options: Record<string, unknown>;
  deprecatedOption: string;
  newOption: string;
  msg?: string;
  scope?: string;
}

export const deprecatedLogger = ({
  options,
  deprecatedOption,
  newOption,
  msg = "",
  scope = "",
}: DeprecatedLoggerOptions): void => {
  if (deprecatedOption in options) {
    logger.warn(
      `"${deprecatedOption}" is deprecated${
        scope ? ` in ${scope}` : ""
      }, please use "${newOption}" instead.${msg ? `\n${msg}` : ""}`
    );

    if (newOption.includes(".")) {
      const keys = newOption.split(".");
      let temp = options;

      keys.forEach((key, index) => {
        if (index !== keys.length - 1) {
          // ensure level exists
          temp[key] = temp[key] || {};

          temp = temp[key] as Record<string, unknown>;
        } else temp[key] = options[deprecatedOption];
      });
    } else options[newOption] = options[deprecatedOption];

    delete options[deprecatedOption];
  }
};
