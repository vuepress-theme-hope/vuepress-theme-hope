import type { EncryptOptions } from "../types";

export const getPathMatchedKeys = (
  encryptOptions: EncryptOptions | undefined,
  path: string
): string[] =>
  encryptOptions && typeof encryptOptions.config === "object"
    ? Object.keys(encryptOptions.config)
        .filter((key) => path.startsWith(key))
        .sort((a, b) => b.length - a.length)
    : [];

export const getPathEncryptStatus = (
  encryptOptions: EncryptOptions | undefined,
  passwordConfig: Record<string, string>,
  path: string
): boolean => {
  const hitKeys = getPathMatchedKeys(encryptOptions, path);

  if (hitKeys.length !== 0) {
    const { config } = encryptOptions as Required<EncryptOptions>;

    return !hitKeys.some((key) => {
      const keyConfig = config[key];
      const hitPasswords =
        typeof keyConfig === "string" ? [keyConfig] : keyConfig;

      return hitPasswords.some((password) => passwordConfig[key] === password);
    });
  }

  return false;
};
