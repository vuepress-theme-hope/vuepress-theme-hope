import { useStorage, useSessionStorage } from "@vueuse/core";
import { compareSync } from "bcryptjs";
import { computed } from "vue";

import { useEncryptData } from "./utils";

import type { ComputedRef } from "vue";

const STORAGE_KEY = "VUEPRESS_HOPE_GLOBAL_TOKEN";

export interface GlobalEncrypt {
  isGlobalEncrypted: ComputedRef<boolean>;
  validateGlobalToken: (token: string, keep?: boolean) => void;
}

export const useGlobalEcrypt = (): GlobalEncrypt => {
  const encryptData = useEncryptData();

  const localToken = useStorage(STORAGE_KEY, "");
  const sessionToken = useSessionStorage(STORAGE_KEY, "");

  const isGlobalEncrypted = computed(() => {
    if (encryptData.value.global && encryptData.value.admin)
      // none of the token matches
      return (
        (Boolean(localToken.value) &&
          !encryptData.value.admin.some((hash) =>
            compareSync(localToken.value, hash)
          )) ||
        (Boolean(sessionToken.value) &&
          !encryptData.value.admin.some((hash) =>
            compareSync(sessionToken.value, hash)
          ))
      );

    return false;
  });

  const validateGlobalToken = (inputToken: string, keep = false): void => {
    (keep ? localToken : sessionToken).value = inputToken;
  };

  return {
    isGlobalEncrypted,
    validateGlobalToken,
  };
};
