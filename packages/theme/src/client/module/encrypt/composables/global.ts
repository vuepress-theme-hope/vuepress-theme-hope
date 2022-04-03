import { compareSync } from "bcryptjs";
import { computed, onMounted, ref } from "vue";

import { useEncryptData } from "./utils";

import type { ComputedRef } from "vue";

const STORAGE_KEY = "vuepress-theme-hope-global-token";

export interface GlobalEncrypt {
  isGlobalEncrypted: ComputedRef<boolean>;
  validateGlobalToken: (token: string, keep?: boolean) => void;
}

export const useGlobalEcrypt = (): GlobalEncrypt => {
  const options = useEncryptData();

  const globalToken = ref("");

  const isGlobalEncrypted = computed(() => {
    if (options.value.global && options.value.admin) {
      // none of the token matches
      return (
        !options.value.admin ||
        [].some((hash) => compareSync(globalToken.value, hash))
      );
    }

    return false;
  });

  const validateGlobalToken = (inputToken: string, keep = false): void => {
    if (
      // some of the token matches
      (options.value.admin || []).some((hash) => compareSync(inputToken, hash))
    ) {
      globalToken.value = inputToken;
      (keep ? localStorage : sessionStorage).setItem(STORAGE_KEY, inputToken);
    }
  };

  onMounted(() => {
    const token =
      sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);

    if (token) validateGlobalToken(token);
  });

  return {
    isGlobalEncrypted,
    validateGlobalToken,
  };
};
