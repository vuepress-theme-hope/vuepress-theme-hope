import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  watch,
  ref,
  resolveComponent,
} from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/lib/client";

import { useThemeLocaleData } from "@theme-hope/composables";
import { getAncestorLinks } from "@theme-hope/utils";

import type { VNode } from "vue";
import type { HopeThemeNormalPageFrontmatter } from "../../shared";

import "../styles/breadcrumb.scss";

interface BreadCrumbConfig {
  title: string;
  icon?: string;
  path: string;
}

export default defineComponent({
  name: "BreadCrumb",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();

    const config = ref<BreadCrumbConfig[]>([]);

    const enable = computed<boolean>(() => {
      return (
        (frontmatter.value.breadcrumb ||
          (frontmatter.value.breadcrumb !== false &&
            themeLocale.value.breadcrumb !== false)) &&
        config.value.length > 1
      );
    });

    const iconEnable = computed(
      () =>
        frontmatter.value.breadcrumbIcon ||
        (frontmatter.value.breadcrumbIcon !== false &&
          themeLocale.value.breadcrumbIcon !== false)
    );

    const getBreadCrumbConfig = (): void => {
      const routes = router.getRoutes();

      const breadcrumbConfig = getAncestorLinks(route, routeLocale.value)
        .map<BreadCrumbConfig | null>((link) => {
          const route = routes.find((route) => route.path === link);

          if (route) {
            const { meta, path } = resolveRouteWithRedirect(router, route.path);

            if (meta.shortTitle || meta.title)
              return {
                title: meta.shortTitle || meta.title,
                icon: meta.icon,
                path,
              } as BreadCrumbConfig;
          }

          return null;
        })
        .filter((item): item is BreadCrumbConfig => item !== null);

      if (breadcrumbConfig.length > 1) config.value = breadcrumbConfig;
    };

    onMounted(() => {
      void getBreadCrumbConfig();
      watch(() => route.path, getBreadCrumbConfig);
    });

    return (): VNode =>
      h(
        "nav",
        { class: ["breadcrumb", { disable: !enable.value }] },
        enable.value
          ? h(
              "ol",
              {
                vocab: "https://schema.org/",
                typeof: "BreadcrumbList",
              },
              config.value.map((item, index) =>
                h(
                  "li",
                  {
                    class: { "is-active": config.value.length - 1 === index },
                    property: "itemListElement",
                    typeof: "ListItem",
                  },
                  [
                    h(
                      RouterLink,
                      {
                        to: item.path,
                        property: "item",
                        typeof: "WebPage",
                      },
                      () => [
                        // icon
                        iconEnable.value
                          ? h(resolveComponent("FontIcon"), { icon: item.icon })
                          : null,
                        // text
                        h(
                          "span",
                          { property: "name" },
                          item.title || "Unknown"
                        ),
                      ]
                    ),
                    // meta
                    h("meta", { property: "position", content: index + 1 }),
                  ]
                )
              )
            )
          : []
      );
  },
});
