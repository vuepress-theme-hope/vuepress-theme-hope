import { hashSync } from "bcryptjs";

import type { HopeThemeEncryptOptions } from "../shared";

export const resolveEncrypt = (encrypt: HopeThemeEncryptOptions): void => {
  // handle global token
  if (encrypt.global)
    if (typeof encrypt.global === "string")
      encrypt.global = hashSync(encrypt.global, 10);
    else if (Array.isArray(encrypt.global))
      encrypt.global = encrypt.global.map((globalToken) => {
        if (typeof globalToken === "string") return hashSync(globalToken, 10);

        throw new Error(
          `[vuepress-theme-hope]: You config "themeConfig.encrypt.global", but your config is invalid. 

          All password MUST be string. But we found one’s type is ${typeof globalToken}. Please fix it!`
        );
      });
    else
      throw new Error(
        `[vuepress-theme-hope]: You are asking for global encryption but you provide invalid "global" config. 

Please check "global" in your "themeConfig.encrypt" config. It can be string or string[], but you are providing ${typeof encrypt.global}. Please fix it!`
      );

  const tokenConfig = encrypt.config || {};

  Object.keys(tokenConfig).forEach((key) => {
    const token = tokenConfig[key];

    if (typeof token === "string") tokenConfig[key] = hashSync(token, 10);
    else if (Array.isArray(token))
      tokenConfig[key] = token.map((configToken) => {
        if (typeof configToken === "string") return hashSync(configToken, 10);

        throw new Error(`[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 
        
Key ${key}’s value MUST be string or string[]. But it’s type is ${typeof configToken}. Please fix it!`);
      });
    else
      throw new Error(
        `[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 

The value of key ${key} MUST be string or string[]. But not it’s ${typeof token}. Please fix it!`
      );
  });
};
