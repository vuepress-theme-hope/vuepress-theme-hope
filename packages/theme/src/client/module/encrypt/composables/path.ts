import { useStorage, useSessionStorage } from "@vueuse/core";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useEncryptData } from "./utils";
import { checkToken } from "@theme-hope/module/encrypt/utils";

import type { ComputedRef } from "vue";

const STORAGE_KEY = "VUEPRESS_HOPE_PATH_TOKEN";

export interface PathEncrypt {
  isEncrypted: ComputedRef<boolean>;
  getPathEncryptStatus: (path: string) => boolean;
  validateToken: (token: string, keep?: boolean) => void;
}

export const usePathEncrypt = (): PathEncrypt => {
  const route = useRoute();
  const encryptData = useEncryptData();

  const localToken = useStorage<Record<string, string>>(STORAGE_KEY, {});
  const sessionToken = useSessionStorage<Record<string, string>>(
    STORAGE_KEY,
    {}
  );

  const getPathMatchedKeys = (path: string): string[] =>
    typeof encryptData.value.config === "object"
      ? Object.keys(encryptData.value.config)
          .filter((key) => decodeURI(path).startsWith(key))
          .sort((a, b) => b.length - a.length)
      : [];

  const getPathEncryptStatus = (path: string): boolean => {
    const matchedKeys = getPathMatchedKeys(path);

    if (matchedKeys.length !== 0) {
      const { config = {} } = encryptData.value;

      return !matchedKeys.some(
        (key) =>
          (localToken.value[key] &&
            config[key].some((token) =>
              checkToken(localToken.value[key], token)
            )) ||
          (sessionToken.value[key] &&
            config[key].some((token) =>
              checkToken(sessionToken.value[key], token)
            ))
      );
    }

    return false;
  };

  const isEncrypted = computed(() => getPathEncryptStatus(route.path));

  const validateToken = (inputToken: string, keep = false): void => {
    const { config = {} } = encryptData.value;
    const matchedKeys = getPathMatchedKeys(route.path);

    for (const hitKey of matchedKeys) {
      // some of the tokens matches
      if (config[hitKey].filter((token) => checkToken(inputToken, token))) {
        (keep ? localToken : sessionToken).value[hitKey] = inputToken;

        break;
      }
    }
  };

  return {
    isEncrypted,
    getPathEncryptStatus,
    validateToken,
  };
};
