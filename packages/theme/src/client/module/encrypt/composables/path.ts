import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { useEncryptData } from "./utils";
import { checkToken } from "@theme-hope/module/encrypt/utils";

import type { ComputedRef } from "vue";

const STORAGE_KEY = "vuepress-theme-hope-path-token";

export interface PathEncrypt {
  isEncrypted: ComputedRef<boolean>;
  getPathEncryptStatus: (path: string) => boolean;
  validateToken: (token: string, keep?: boolean) => void;
}

const localConfig = ref<Record<string, string>>({});
const sessionConfig = ref<Record<string, string>>({});

export const usePathEncrypt = (): PathEncrypt => {
  const route = useRoute();
  const options = useEncryptData();

  const getPathMatchedKeys = (path: string): string[] =>
    typeof options.value.config === "object"
      ? Object.keys(options.value.config)
          .filter((key) => path.startsWith(key))
          .sort((a, b) => b.length - a.length)
      : [];

  const getPathEncryptStatus = (path: string): boolean => {
    const matchedKeys = getPathMatchedKeys(path);

    if (matchedKeys.length !== 0) {
      const { config = {} } = options.value;

      return !matchedKeys.some((key) =>
        config[key].some(
          (token) =>
            checkToken(localConfig.value[key], token) ||
            checkToken(sessionConfig.value[key], token)
        )
      );
    }

    return false;
  };

  const isEncrypted = computed(() => getPathEncryptStatus(route.path));

  const validateToken = (inputToken: string, keep = false): void => {
    const { config = {} } = options.value;
    const matchedKeys = getPathMatchedKeys(route.path);

    for (const hitKey of matchedKeys) {
      // some of the tokens matches
      if (config[hitKey].filter((token) => checkToken(inputToken, token))) {
        (keep ? localConfig : sessionConfig).value[hitKey] = inputToken;

        if (keep)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(localConfig.value));
        else
          sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(sessionConfig.value)
          );

        break;
      }
    }
  };

  onMounted(() => {
    try {
      localConfig.value = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      ) as Record<string, string>;
    } catch (err) {
      // do nothing
    }

    try {
      sessionConfig.value = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "{}"
      ) as Record<string, string>;
    } catch (err) {
      // do nothing
    }
  });

  return {
    isEncrypted,
    getPathEncryptStatus,
    validateToken,
  };
};
