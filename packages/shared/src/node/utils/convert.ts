import { colors } from "@vuepress/utils";

import { Logger } from "./logger.js";

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
      if (old in options) {
        console.warn(
          `${colors.magenta(old)} is ${colors.yellow("deprecated")}${
            scope ? ` in ${scope}` : ""
          }, please use "${colors.magenta(newOption)}" instead.${
            msg ? `\n${msg}` : ""
          }`,
        );

        if (newOption.includes(".")) {
          const keys = newOption.split(".");
          let temp = options;

          keys.forEach((key, index) => {
            if (index !== keys.length - 1) {
              // ensure level exists
              temp[key] = temp[key] || {};

              temp = temp[key] as Record<string, unknown>;
            } else {
              temp[key] = options[old];
            }
          });
        } else {
          options[newOption] = options[old];
        }

        delete options[old];
      }
    },

    droppedLogger: ({
      options,
      old,
      msg,
      new: newOption,
    }: DroppedLoggerOptions): void => {
      if (old in options) {
        logger.error(
          `"${colors.magenta(old)}" is ${colors.red("removed")}${
            newOption
              ? `, please use ${colors.magenta(newOption)} instead.`
              : " and no longer supported"
          }${msg ? `\n${msg}` : ""}`,
        );

        delete options[old];
      }
    },
  };
};
