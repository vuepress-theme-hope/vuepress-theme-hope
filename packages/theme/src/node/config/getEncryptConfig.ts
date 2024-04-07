import { entries, fromEntries, isArray, isString } from "@vuepress/helper";
import { hashSync } from "bcrypt-ts/node";

import type { EncryptConfig, EncryptOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

/** @private */
export const getEncryptConfig = (
  encrypt: EncryptOptions = {},
): EncryptConfig => {
  const result: EncryptConfig = {};

  // Handle global token
  if (encrypt.admin) {
    if (encrypt.global) result.global = true;

    if (isString(encrypt.admin)) result.admin = [hashSync(encrypt.admin)];
    else if (isArray(encrypt.admin))
      result.admin = encrypt.admin
        .map((globalToken) => {
          if (isString(globalToken)) return hashSync(globalToken);

          logger.error(`You config "themeConfig.encrypt.admin", but your config is invalid. 

          All password MUST be string. But we found one’s type is ${typeof globalToken}. Please fix it!`);

          return null;
        })
        .filter((item): item is string => item !== null);
    else
      logger.error(
        `You are asking for global encryption but you provide invalid "admin" config. 
        
        Please check "admin" in your "themeConfig.encrypt" config. It can be string or string[], but you are providing ${typeof encrypt.admin}. Please fix it!`,
      );
  }

  if (encrypt.config)
    result.config = fromEntries(
      entries(encrypt.config)
        .map<[string, string[]] | null>(([key, tokens]) => {
          if (isString(tokens)) return [key, [hashSync(tokens)]];

          if (isArray(tokens)) {
            const encryptedTokens = tokens
              .map((token) => {
                if (isString(token)) return hashSync(token);

                logger.error(`You config "themeConfig.encrypt.config", but your config is invalid. 
        
Key ${key}’s value MUST be string or string[]. But it’s type is ${typeof token}. Please fix it!`);

                return null;
              })
              .filter((item): item is string => item !== null);

            if (encryptedTokens.length) return [key, encryptedTokens];

            return null;
          }

          logger.error(
            `You config "themeConfig.encrypt.config", but your config is invalid. 
        
        The value of key ${key} MUST be string or string[]. But not it’s ${typeof tokens}. Please fix it!`,
          );

          return null;
        })
        .filter((item): item is [string, string[]] => item !== null),
    );

  return result;
};
