import { usePageData } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { entries } from "vuepress-shared";

// devServer only function to handle redirects
export const setupRedirect = async (): Promise<void> => {
  const { redirectConfig } = await import(
    /* webpackChunkName: "redirect-client-config" */ "@internal/redirect/config.js"
  );

  const page = usePageData();
  const router = useRouter();

  watch(
    () => page.value.path,
    (path) => {
      // handle redirects
      for (const [from, to] of entries(redirectConfig))
        if (path === from)
          if (isLinkHttp(to)) window.open(to);
          else void router.replace(to);
    },
    { immediate: true }
  );
};
