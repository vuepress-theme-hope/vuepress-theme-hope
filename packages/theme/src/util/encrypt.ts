import { EncryptOptions } from '../../types';

/**
 * 全局加密状态
 * @param encryptOptions 加密配置
 * @param password 当前输入的密码
 */
export const globalEncryptStatus = (
  encryptOptions: EncryptOptions,
  password: string
): boolean => {
  if (encryptOptions && encryptOptions.globalEncrypt && encryptOptions.global) {
    const { global } = encryptOptions;
    /** 全局密码 */
    const globalPasswords = typeof global === 'string' ? [global] : global;
    /** 全局密码匹配结果 */
    const result = globalPasswords.filter(
      globalPassword => globalPassword === password
    );

    return result.length === 0;
  }

  return false;
};

/**
 * 路径命中的键
 *
 * @param encryptOptions 加密配置
 * @param path 需要判断的路径
 * @param passwordConfig 当前输入的密码
 */
export const pathHitKeys = (
  encryptOptions: EncryptOptions | undefined,
  path: string
): string[] => {
  if (encryptOptions && typeof encryptOptions.config === 'object') {
    /** 配置键名 */
    const keys = Object.keys(encryptOptions.config);
    /** 命中键名 */
    const hitKeys = keys
      .filter(key => path.indexOf(key) === 0)
      .sort((x, y) => y.length - x.length);

    return hitKeys;
  }

  return [];
};

/**
 * 路径加密状态
 *
 * @param encryptOptions 加密配置
 * @param path 需要判断的路径
 * @param passwordConfig 当前输入的密码
 */
export const pathEncryptStatus = (
  encryptOptions: EncryptOptions | undefined,
  path: string,
  passwordConfig: Record<string, string>
): boolean => {
  /** 命中键名 */
  const hitKeys = pathHitKeys(encryptOptions, path);

  if (hitKeys.length !== 0) {
    /** 配置项 */
    const { config } = encryptOptions as Required<EncryptOptions>;

    /** 正确键值 */
    const correctKeys = hitKeys.filter(key => {
      const keyConfig = config[key];
      /** 命中的密码 */
      const hitPasswords =
        typeof keyConfig === 'string' ? [keyConfig] : keyConfig;
      /** 比较结果 */
      const result = hitPasswords.filter(
        password => passwordConfig[key] === password
      );

      return result.length !== 0;
    });

    return correctKeys.length === 0;
  }

  return false;
};
