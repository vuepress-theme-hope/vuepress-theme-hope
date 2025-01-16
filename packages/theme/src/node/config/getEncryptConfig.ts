import {
  entries,
  fromEntries,
  isArray,
  isPlainObject,
  isString,
} from "@vuepress/helper";
import { hashSync } from "bcrypt-ts/node";
import { colors } from "vuepress/utils";

import type {
  EncryptConfig,
  EncryptOptions,
  PasswordConfig,
} from "../../shared/index.js";
import { logger } from "../utils.js";

const hashPasswords = (passwords: unknown, key: string): string[] | null => {
  if (isString(passwords)) return [hashSync(passwords)];

  if (isArray(passwords))
    return passwords
      .map((password) => {
        if (isString(password)) return hashSync(password);

        logger.error(`\
${colors.magenta(key)} config is invalid. 

All password MUST be string. But we found one’s type is ${typeof password}. Please fix it!\
`);

        return null;
      })
      .filter((item): item is string => item !== null);

  logger.error(`\
${colors.magenta(key)} config is invalid. 

All password MUST be string. But we found a ${JSON.stringify(passwords)}. Please fix it!\
`);

  return null;
};

/** @private */
export const getEncryptConfig = ({
  admin,
  config,
  global,
}: EncryptOptions = {}): EncryptConfig => {
  const result: EncryptConfig = {};

  // Handle global token
  if (admin) {
    if (global) result.global = true;

    if (isPlainObject<{ hint: string; password: string[] }>(admin)) {
      const tokens = hashPasswords(admin.password, "encrypt.admin.password");

      if (tokens)
        result.admin = {
          tokens,
          hint: admin.hint,
        };
    } else {
      const tokens = hashPasswords(admin, "encrypt.admin");

      if (tokens) result.admin = { tokens };
    }
  }

  if (config)
    result.config = fromEntries(
      entries(config)
        .map<[string, PasswordConfig] | null>(([key, options]) => {
          if (isPlainObject<{ hint: string; password: string[] }>(options)) {
            const tokens = hashPasswords(
              options.password,
              `encrypt.config[${key}].password`,
            );

            return tokens ? [key, { tokens, hint: options.hint }] : null;
          }

          const tokens = hashPasswords(options, `encrypt.config[${key}]`);

          return tokens ? [key, { tokens }] : null;
        })
        .filter((item): item is [string, PasswordConfig] => item !== null),
    );

  return result;
};
