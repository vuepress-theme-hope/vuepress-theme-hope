import { useSessionStorage, useStorage } from "@vueuse/core";
import { compareSync } from "bcrypt-ts/browser";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import type { EncryptStatus } from "@theme-hope/composables/encrypt/typings";
import { useEncryptConfig } from "@theme-hope/composables/encrypt/useEncryptConfig";

const STORAGE_KEY = "VUEPRESS_HOPE_GLOBAL_TOKEN";

export interface GlobalEncrypt {
  status: ComputedRef<EncryptStatus>;
  validate: (token: string, keep?: boolean) => void;
}

export const useGlobalEncrypt = (): GlobalEncrypt => {
  const encryptData = useEncryptConfig();

  const storageToken = useStorage(STORAGE_KEY, "");
  const sessionToken = useSessionStorage(STORAGE_KEY, "");

  const status = computed(() => {
    const { global = false, admin } = encryptData.value;

    // Is globally encrypted
    const isEncrypted = global && Boolean(admin?.tokens.length);

    const isLocked =
      // Valid token exists
      isEncrypted
        ? storageToken.value
          ? // None of the token matches
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            encryptData.value.admin!.tokens.every(
              (hash) => !compareSync(storageToken.value, hash),
            )
          : // None of the token matches
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            encryptData.value.admin!.tokens.every(
              (hash) => !compareSync(sessionToken.value, hash),
            )
        : false;

    return {
      isEncrypted,
      isLocked,
      hint: admin?.hint ?? "",
    };
  });

  const validate = (inputToken: string, keep = false): void => {
    (keep ? storageToken : sessionToken).value = inputToken;
  };

  return {
    status,
    validate,
  };
};
