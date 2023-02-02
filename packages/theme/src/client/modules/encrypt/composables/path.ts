import { isPlainObject } from "@vuepress/shared";
import { useSessionStorage, useStorage } from "@vueuse/core";
import { type ComputedRef, computed } from "vue";
import { useRoute } from "vue-router";
import { keys, startsWith } from "vuepress-shared/client";

import { checkToken } from "@theme-hope/modules/encrypt/utils/index";

import { useEncryptData } from "./utils.js";

const STORAGE_KEY = "VUEPRESS_HOPE_PATH_TOKEN";

export interface EncryptStatus {
  isEncrypted: boolean;
  isDecrypted: boolean;
}

export interface PathEncrypt {
  status: ComputedRef<EncryptStatus>;
  getStatus: (path: string) => EncryptStatus;
  validate: (token: string, keep?: boolean) => void;
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
    isPlainObject(encryptData.value.config)
      ? keys(encryptData.value.config)
          .filter((key) => startsWith(decodeURI(path), key))
          .sort((a, b) => b.length - a.length)
      : [];

  const getStatus = (path: string): EncryptStatus => {
    const matchedKeys = getPathMatchedKeys(path);

    if (matchedKeys.length > 0) {
      const { config = {} } = encryptData.value;

      return {
        isEncrypted: true,
        isDecrypted: matchedKeys.some(
          (key) =>
            (localToken.value[key] &&
              config[key].some((token) =>
                checkToken(localToken.value[key], token)
              )) ||
            (sessionToken.value[key] &&
              config[key].some((token) =>
                checkToken(sessionToken.value[key], token)
              ))
        ),
      };
    }

    return {
      isDecrypted: false,
      isEncrypted: false,
    };
  };

  const status = computed(() => getStatus(route.path));

  const validate = (inputToken: string, keep = false): void => {
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
    status,
    getStatus,
    validate,
  };
};
