import { isLinkHttp } from "@vuepress/shared";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { entries } from "vuepress-shared/client";

import { redirectConfig } from "@temp/redirect/config.js";

import { normalizePath } from "../utils/index.js";

// devServer only function to handle redirects
export const setupRedirect = (): void => {
  const router = useRouter();
  const route = useRoute();

  watch(
    () => route.path,
    (path) => {
      // handle redirects
      for (const [from, to] of entries(redirectConfig))
        if (normalizePath(path.toLowerCase()) === from.toLowerCase())
          if (isLinkHttp(to)) window.open(to);
          else void router.replace(to);
    },
    { immediate: true }
  );
};
