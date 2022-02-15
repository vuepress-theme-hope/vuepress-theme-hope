import { compareSync } from "bcryptjs";
import { computed, onMounted, ref } from "vue";

import { useEncryptOptions } from "./utils";

import type { ComputedRef } from "vue";

const STORAGE_KEY = "vuepress-theme-hope-global-token";

export interface GlobalEncrypt {
  isGlobalEncrypted: ComputedRef<boolean>;
  validateGlobalToken: (token: string, keep?: boolean) => void;
}

export const useGlobalEcrypt = (): GlobalEncrypt => {
  const options = useEncryptOptions();

  const globalToken = ref("");

  const isGlobalEncrypted = computed(() => {
    if (options.value.global && options.value.admin) {
      const { admin: global } = options.value;
      const globalTokens = typeof global === "string" ? [global] : global;

      // none of the token matches
      return !globalTokens.some((globalPassword) =>
        compareSync(globalToken.value, globalPassword)
      );
    }

    return false;
  });

  const validateGlobalToken = (inputToken: string, keep = false): void => {
    const { admin } = options.value;
    const globalPasswords = typeof admin === "string" ? [admin] : admin || [];

    if (
      // some of the token matches
      globalPasswords.some((token) => compareSync(inputToken, token))
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
