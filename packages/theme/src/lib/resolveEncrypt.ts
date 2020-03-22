/*
 * @Author: Mr.Hope
 * @Date: 2020-01-20 12:21:33
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-22 15:19:19
 * @Description: 处理密码加密
 */

import * as md5 from 'md5';
import { EncryptOptions } from '../../types';

/**
 * 处理密码配置
 *
 * @param encrypt 加密配置选项
 */
const resolveEncrypt = (encrypt: EncryptOptions): void => {
  // 处理全局密码
  if (encrypt.global)
    if (typeof encrypt.global === 'string')
      encrypt.global = md5(encrypt.global);
    else if (Array.isArray(encrypt.global))
      encrypt.global = encrypt.global.map((globalPassword) =>
        md5(globalPassword)
      );
    else
      throw new Error(
        `[vuepress-theme-hope]: You asked for global Encrtption but you did not specific valid global Password. 

Please add "global" option your "themeConfig.encrypt" config. It can be string or string[].`
      );

  // 处理密码配置
  const passwordConfig = encrypt.config || {};

  Object.keys(passwordConfig).forEach((key) => {
    const password = passwordConfig[key];

    if (typeof password === 'string') passwordConfig[key] = md5(password);
    else if (Array.isArray(password))
      passwordConfig[key] = password.map((configPassword) => {
        if (typeof configPassword === 'string') return md5(configPassword);

        throw new Error(`[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 

Key ${key}'s value MUST be string or string[]. But ${configPassword} 's type is ${typeof configPassword}. Please fix it`);
      });
    else
      throw new Error(
        `[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 

The value of key ${key} MUST be string or string[]. But not it's ${typeof password}. Please fix it`
      );
  });
};

export default resolveEncrypt;
