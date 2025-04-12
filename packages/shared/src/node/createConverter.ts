import { Logger, isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";

export interface DeprecatedLoggerOptions {
  options: Record<string, unknown>;
  old: string;
  new: string;
  msg?: string;
  scope?: string;
}

export interface DroppedLoggerOptions {
  options: Record<string, unknown>;
  old: string;
  new?: string;
  msg?: string;
  scope?: string;
}

export interface Converter {
  deprecatedLogger: (options: DeprecatedLoggerOptions) => void;
  droppedLogger: (options: DroppedLoggerOptions) => void;
}

export const createConverter = (name: string): Converter => {
  const logger = new Logger(name);

  return {
    deprecatedLogger: ({
      options,
      old,
      new: newOption,
      msg,
      scope,
    }: DeprecatedLoggerOptions): void => {
      let deprecatedOptionValue: unknown;
      let hasDeprecatedOption = false;

      if (old.includes(".")) {
        let temp = options;
        const keys = old.split(".");

        for (const [index, key] of keys.entries()) {
          if (key in temp) {
            if (index === keys.length - 1) {
              hasDeprecatedOption = true;
              deprecatedOptionValue = temp[key];
              delete temp[key];
            } else if (isPlainObject(temp[key])) {
              temp = temp[key] as Record<string, unknown>;
            } else break;
          }
        }
      } else if (old in options) {
        deprecatedOptionValue = options[old];
        hasDeprecatedOption = true;
        delete options[old];
      }

      if (hasDeprecatedOption) {
        logger.warn(
          `${colors.magenta(old)} is ${colors.yellow("deprecated")}${
            scope ? ` in ${scope}` : ""
          }, please use ${colors.magenta(newOption)} instead.${
            msg ? ` ${msg}` : ""
          }`,
        );

        if (newOption.includes(".")) {
          const keys = newOption.split(".");
          let temp = options;

          keys.forEach((key, index) => {
            if (index === keys.length - 1) {
              temp[key] = deprecatedOptionValue;
            } else {
              // Ensure level exists
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              temp[key] ||= {};
              temp = temp[key] as Record<string, unknown>;
            }
          });
        } else {
          options[newOption] = deprecatedOptionValue;
        }
      }
    },

    droppedLogger: ({
      options,
      old,
      msg,
      new: newOption,
      scope,
    }: DroppedLoggerOptions): void => {
      let hasDroppedOption = false;

      if (old.includes(".")) {
        let temp = options;
        const keys = old.split(".");

        for (const [index, key] of keys.entries()) {
          if (key in temp) {
            if (index === keys.length - 1) {
              hasDroppedOption = true;
              delete temp[key];
            } else if (isPlainObject(temp[key])) {
              temp = temp[key] as Record<string, unknown>;
            } else break;
          }
        }
      } else if (old in options) {
        hasDroppedOption = true;
        delete options[old];
      }

      if (hasDroppedOption) {
        logger.error(
          `${colors.magenta(old)}${
            scope ? ` in ${scope}` : ""
          } is ${colors.red("no longer supported")}${
            newOption
              ? `, please use ${colors.magenta(newOption)} instead.`
              : ""
          }${msg ? `\n${msg}` : ""}`,
        );
      }
    },
  };
};
