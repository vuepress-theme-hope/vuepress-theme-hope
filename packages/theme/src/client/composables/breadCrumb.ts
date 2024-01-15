import { usePageData, useRouteLocale } from "@vuepress/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import { getAncestorLinks } from "@theme-hope/utils/index";

import { ArticleInfoType } from "../../shared/index.js";

export interface BreadCrumbConfig {
  title: string;
  icon?: string | undefined;
  path: string;
}

export const useBreadCrumbConfig = (): ComputedRef<BreadCrumbConfig[]> => {
  const router = useRouter();
  const page = usePageData();
  const routeLocale = useRouteLocale();
  const routes = router.getRoutes();

  return computed(() =>
    getAncestorLinks(page.value.path, routeLocale.value)
      .map<BreadCrumbConfig | null>(({ link, name }) => {
        const route = routes.find((route) => route.path === link);

        if (route) {
          const { meta, path } = resolveRouteWithRedirect(router, route.path);

          return {
            title:
              meta[ArticleInfoType.shortTitle] ||
              meta[ArticleInfoType.title] ||
              name,
            icon: meta[ArticleInfoType.icon],
            path,
          };
        }

        return null;
      })
      .filter((item): item is BreadCrumbConfig => item !== null),
  );
};
