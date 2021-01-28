import { hashSync } from "bcryptjs";

import type { EncryptOptions } from "../types";

export const resolveEncrypt = (encrypt: EncryptOptions): void => {
  // handle global password
  if (encrypt.global)
    if (typeof encrypt.global === "string")
      encrypt.global = hashSync(encrypt.global, 10);
    else if (Array.isArray(encrypt.global))
      encrypt.global = encrypt.global.map((globalPassword) =>
        hashSync(globalPassword, 10)
      );
    else
      throw new Error(
        `[vuepress-theme-hope]: You asked for global Encrtption but you did not specific valid global Password. 

Please add "global" option your "themeConfig.encrypt" config. It can be string or string[].`
      );

  const passwordConfig = encrypt.config || {};

  Object.keys(passwordConfig).forEach((key) => {
    const password = passwordConfig[key];

    if (typeof password === "string")
      passwordConfig[key] = hashSync(password, 10);
    else if (Array.isArray(password))
      passwordConfig[key] = password.map((configPassword) => {
        if (typeof configPassword === "string")
          return hashSync(configPassword, 10);

        throw new Error(`[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 
        
Key ${key}'s value MUST be string or string[]. But it’s type is ${typeof configPassword}. Please fix it`);
      });
    else
      throw new Error(
        `[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 

The value of key ${key} MUST be string or string[]. But not it’s ${typeof password}. Please fix it`
      );
  });
};
