import type { VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  resolveComponent,
  shallowRef,
  watch,
} from "vue";
import {
  RouteLink,
  resolveRoute,
  usePageData,
  usePageFrontmatter,
  useRouteLocale,
} from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import { getAncestorLinks } from "@theme-hope/utils/index";

import type {
  PageInfoData,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";
import { PageInfo } from "../../shared/index.js";

import "../styles/breadcrumb.scss";

interface BreadCrumbConfig {
  title: string;
  icon?: string | undefined;
  path: string;
}

export default defineComponent({
  name: "BreadCrumb",

  setup() {
    const page = usePageData();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();

    const config = shallowRef<BreadCrumbConfig[]>([]);

    const enable = computed(
      () =>
        (frontmatter.value.breadcrumb ??
          themeLocale.value.breadcrumb ??
          true) &&
        config.value.length > 1,
    );

    const enableIcon = computed(
      () =>
        frontmatter.value.breadcrumbIcon ??
        themeLocale.value.breadcrumbIcon ??
        true,
    );

    const getBreadCrumbConfig = (): void => {
      const breadcrumbConfig = getAncestorLinks(
        page.value.path,
        routeLocale.value,
      )
        .map<BreadCrumbConfig | null>(({ link, name }) => {
          const { path, meta, notFound } = resolveRoute<PageInfoData>(link);

          if (notFound || meta[PageInfo.breadcrumbExclude]) return null;

          return {
            title: meta[PageInfo.shortTitle] || meta[PageInfo.title] || name,
            icon: meta[PageInfo.icon],
            path,
          };
        })
        .filter((item): item is BreadCrumbConfig => item !== null);

      if (breadcrumbConfig.length > 1) config.value = breadcrumbConfig;
    };

    onMounted(() => {
      watch(() => page.value.path, getBreadCrumbConfig, { immediate: true });
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
                      RouteLink,
                      {
                        to: item.path,
                        property: "item",
                        typeof: "WebPage",
                      },
                      () => [
                        // Icon
                        enableIcon.value
                          ? h(resolveComponent("VPIcon"), { icon: item.icon })
                          : null,
                        // Text
                        h(
                          "span",
                          { property: "name" },
                          item.title || "Unknown",
                        ),
                      ],
                    ),
                    // Meta
                    h("meta", { property: "position", content: index + 1 }),
                  ],
                ),
              ),
            )
          : [],
      );
  },
});
