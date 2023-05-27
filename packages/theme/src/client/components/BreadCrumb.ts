import {
  usePageData,
  usePageFrontmatter,
  useRouteLocale,
} from "@vuepress/client";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  shallowRef,
  watch,
} from "vue";
import { RouterLink, useRouter } from "vue-router";
import { resolveRouteWithRedirect } from "vuepress-shared/client";

import HopeIcon from "@theme-hope/components/HopeIcon";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import { getAncestorLinks } from "@theme-hope/utils/index";

import {
  ArticleInfoType,
  type ThemeNormalPageFrontmatter,
} from "../../shared/index.js";

import "../styles/breadcrumb.scss";

interface BreadCrumbConfig {
  title: string;
  icon?: string | undefined;
  path: string;
}

export default defineComponent({
  name: "BreadCrumb",

  setup() {
    const router = useRouter();
    const page = usePageData();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();

    const config = shallowRef<BreadCrumbConfig[]>([]);

    const enable = computed(
      () =>
        (frontmatter.value.breadcrumb ||
          (frontmatter.value.breadcrumb !== false &&
            themeLocale.value.breadcrumb !== false)) &&
        config.value.length > 1
    );

    const iconEnable = computed(
      () =>
        frontmatter.value.breadcrumbIcon ||
        (frontmatter.value.breadcrumbIcon !== false &&
          themeLocale.value.breadcrumbIcon !== false)
    );

    const getBreadCrumbConfig = (): void => {
      const routes = router.getRoutes();

      const breadcrumbConfig = getAncestorLinks(
        page.value.path,
        routeLocale.value
      )
        .map<BreadCrumbConfig | null>((link) => {
          const route = routes.find((route) => route.path === link);

          if (route) {
            const { meta, path } = resolveRouteWithRedirect(router, route.path);
            const title =
              meta[ArticleInfoType.shortTitle] || meta[ArticleInfoType.title];

            if (title)
              return {
                title,
                icon: meta[ArticleInfoType.icon],
                path,
              };
          }

          return null;
        })
        .filter((item): item is BreadCrumbConfig => item !== null);

      if (breadcrumbConfig.length > 1) config.value = breadcrumbConfig;
    };

    onMounted(() => {
      getBreadCrumbConfig();

      watch(() => page.value.path, getBreadCrumbConfig);
    });

    return (): VNode =>
      h(
        "nav",
        { class: ["vp-breadcrumb", { disable: !enable.value }] },
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
                          ? h(HopeIcon, { icon: item.icon })
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
