import { useSessionStorage, useStorage } from "@vueuse/core";
import { compareSync } from "bcrypt-ts/browser";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useEncryptData } from "./utils.js";

const STORAGE_KEY = "VUEPRESS_HOPE_GLOBAL_TOKEN";

export interface GlobalEncrypt {
  isEncrypted: ComputedRef<boolean>;
  isDecrypted: ComputedRef<boolean>;
  validate: (token: string, keep?: boolean) => void;
}

export const useGlobalEncrypt = (): GlobalEncrypt => {
  const encryptData = useEncryptData();

  const localToken = useStorage(STORAGE_KEY, "");
  const sessionToken = useSessionStorage(STORAGE_KEY, "");

  // is globally encrypted
  const isEncrypted = computed(() => {
    const { global = false, admin = [] } = encryptData.value;

    return global && admin.length > 0;
  });

  // valid token exists
  const isDecrypted = computed(() => {
    if (isEncrypted.value) {
      if (localToken.value)
        // none of the token matches
        return encryptData.value.admin!.some((hash) =>
          compareSync(localToken.value, hash),
        );

      if (sessionToken.value)
        // none of the token matches
        return encryptData.value.admin!.some((hash) =>
          compareSync(sessionToken.value, hash),
        );
    }

    return false;
  });

  const validate = (inputToken: string, keep = false): void => {
    (keep ? localToken : sessionToken).value = inputToken;
  };

  return {
    isEncrypted,
    isDecrypted,
    validate,
  };
};
