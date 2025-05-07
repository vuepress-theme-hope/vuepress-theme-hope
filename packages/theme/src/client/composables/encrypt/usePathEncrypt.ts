import { isPlainObject, keys, startsWith } from "@vuepress/helper/client";
import { useSessionStorage, useStorage } from "@vueuse/core";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { usePage } from "vuepress/client";

import type { EncryptStatus } from "@theme-hope/composables/encrypt/typings";
import { useEncryptConfig } from "@theme-hope/composables/encrypt/useEncryptConfig";
import { isTokenMatched } from "@theme-hope/utils/encrypt/isTokenMatched";

const STORAGE_KEY = "VUEPRESS_HOPE_PATH_TOKEN";

export interface PathEncrypt {
  status: ComputedRef<EncryptStatus>;
  getStatus: (path: string) => EncryptStatus;
  validate: (token: string, keep?: boolean) => void;
}

export const usePathEncrypt = (): PathEncrypt => {
  const page = usePage();
  const encryptData = useEncryptConfig();

  const localTokenConfig = useStorage<Record<string, string>>(STORAGE_KEY, {});
  const sessionTokenConfig = useSessionStorage<Record<string, string>>(
    STORAGE_KEY,
    {},
  );

  const getPathMatchedKeys = (path: string): string[] =>
    isPlainObject(encryptData.value.config)
      ? keys(encryptData.value.config)
          .filter((key) => startsWith(decodeURI(path), key))
          .sort((a, b) => b.length - a.length)
      : [];

  const getStatus = (path: string): EncryptStatus => {
    const { config = {} } = encryptData.value;

    const matchedKeys = getPathMatchedKeys(path);

    if (matchedKeys.length > 0) {
      const firstKeyWithHint = matchedKeys.find((key) => config[key].hint);

      return {
        isEncrypted: true,
        isLocked: matchedKeys.some(
          (key) =>
            (localTokenConfig.value[key]
              ? config[key].tokens.every(
                  (token) =>
                    !isTokenMatched(localTokenConfig.value[key], token),
                )
              : true) &&
            (sessionTokenConfig.value[key]
              ? config[key].tokens.every(
                  (token) =>
                    !isTokenMatched(sessionTokenConfig.value[key], token),
                )
              : true),
        ),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        hint: firstKeyWithHint ? config[firstKeyWithHint].hint! : "",
      };
    }

    return {
      isEncrypted: false,
      isLocked: false,
      hint: "",
    };
  };

  const status = computed(() => getStatus(page.value.path));

  const validate = (inputToken: string, keep = false): void => {
    const { config = {} } = encryptData.value;
    const matchedKeys = getPathMatchedKeys(page.value.path);

    // Some of the tokens matches
    for (const hitKey of matchedKeys)
      if (
        config[hitKey].tokens.some((token) => isTokenMatched(inputToken, token))
      ) {
        (keep ? localTokenConfig : sessionTokenConfig).value[hitKey] =
          inputToken;

        break;
      }
  };

  return {
    status,
    getStatus,
    validate,
  };
};
