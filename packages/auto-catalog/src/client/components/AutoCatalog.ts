import { usePageData, useSiteData } from "@vuepress/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import type { RouteMeta } from "vue-router";
import { useRouter } from "vue-router";
import {
  VPLink,
  endsWith,
  keys,
  startsWith,
  useLocaleConfig,
} from "vuepress-shared/client";

import type { AutoCatalogLocaleConfig } from "../../shared/index.js";
import { useAutoCatalogIconComponent } from "../helpers/index.js";

import "../styles/auto-catalog.scss";

declare const AUTO_CATALOG_LOCALES: AutoCatalogLocaleConfig;
declare const AUTO_CATALOG_TITLE_META_KEY: string;
declare const AUTO_CATALOG_ICON_META_KEY: string;
declare const AUTO_CATALOG_ORDER_META_KEY: string;
declare const AUTO_CATALOG_INDEX_META_KEY: string;

export interface AutoCatalogProps {
  base?: string;
  level?: 1 | 2 | 3;
}

interface CatalogInfo {
  title: string;
  icon: string | null;
  base: string;
  order: number | null;
  level: number;
  path: string;
  children?: CatalogInfo[];
}

export default defineComponent({
  name: "AutoCatalog",

  props: {
    /**
     * Catalog Base
     *
     * 目录的基础路径
     *
     * @default current route base
     */
    base: {
      type: String,
      default: "",
    },

    /**
     * Max level of catalog
     *
     * @description only 1,2,3 are supported
     *
     * Catalog 的最大层级
     *
     * @description 目前仅支持 1,2,3
     *
     * @default 3
     */
    level: {
      type: Number,
      default: 3,
    },

    /**
     * Whether show index for catalog
     *
     * 目录是否显示索引
     */
    index: Boolean,

    /**
     * Whether hide `Category` title
     *
     * 是否隐藏 `目录` 标题
     *
     * @default false
     */
    hideHeading: Boolean,
  },

  setup(props) {
    const iconComponent = useAutoCatalogIconComponent();
    const locale = useLocaleConfig(AUTO_CATALOG_LOCALES);
    const page = usePageData();
    const router = useRouter();
    const siteData = useSiteData();

    const CatalogIcon = (icon?: string | null): VNode | null =>
      icon ? h(iconComponent, { icon }) : null;

    const CatalogLink = ({
      title,
      path,
      icon,
      class: className,
    }: {
      title: string;
      path: string;
      icon?: string | null;
      class: string;
    }): VNode =>
      h(VPLink, { class: className, to: path }, () => [
        CatalogIcon(icon),
        title || path,
      ]);

    const shouldIndex = (meta: RouteMeta): boolean => {
      const index = <boolean | undefined>meta[AUTO_CATALOG_INDEX_META_KEY];

      return typeof index === "undefined" || index;
    };

    const getCatalogInfo = (): CatalogInfo[] => {
      const base = props.base || page.value.path.replace(/\/[^/]+$/, "/");
      const routes = router.getRoutes();
      const result: CatalogInfo[] = [];

      routes
        .filter(({ meta, path }) => {
          // filter those under current base
          if (!startsWith(path, base) || path === base) return false;

          if (base === "/") {
            const otherLocales = keys(siteData.value.locales).filter(
              (item) => item !== "/",
            );

            // exclude 404 page and other locales
            if (
              path === "/404.html" ||
              otherLocales.some((localePath) => startsWith(path, localePath))
            )
              return false;
          }

          return (
            // filter real page
            ((endsWith(path, ".html") && !endsWith(path, "/index.html")) ||
              endsWith(path, "/")) &&
            // page should be indexed
            shouldIndex(meta)
          );
        })
        .map(({ path, meta }) => {
          const level = path.substring(base.length).split("/").length;

          return {
            title: <string>meta[AUTO_CATALOG_TITLE_META_KEY] || "",
            icon:
              <string | null | undefined>meta[AUTO_CATALOG_ICON_META_KEY] ||
              null,
            base: path.replace(/\/[^/]+\/?$/, "/"),
            order:
              <number | null | undefined>meta[AUTO_CATALOG_ORDER_META_KEY] ||
              null,
            level: endsWith(path, "/") ? level - 1 : level,
            path,
          };
        })
        .filter(({ title, level }) => title && level <= props.level)
        .sort(
          (
            { title: titleA, level: levelA, path: pathA, order: orderA },
            { title: titleB, level: levelB, path: pathB, order: orderB },
          ) => {
            const level = levelA - levelB;

            if (level) return level;

            // check README.md, it should be first one
            if (endsWith(pathA, "/index.html")) return -1;
            if (endsWith(pathB, "/index.html")) return 1;

            // infoA order is absent
            if (orderA === null) {
              // infoB order is absent
              if (orderB === null)
                // compare title
                return titleA.localeCompare(titleB);

              // infoB order is present
              return orderB;
            }

            // infoB order is absent
            if (orderB === null) return orderA;

            // now we are sure both order exist

            // infoA order is positive
            if (orderA > 0) {
              if (orderB > 0) return orderA - orderB;

              return -1;
            }

            // both order are negative
            if (orderB < 0) return orderA - orderB;

            return 1;
          },
        )
        .forEach((info) => {
          const { base, level } = info;

          switch (level) {
            case 1:
              result.push(info);
              break;

            case 2: {
              const parent = result.find((item) => item.path === base);

              if (parent) (parent.children ??= []).push(info);
              break;
            }

            default: {
              const grandParent = result.find(
                (item) => item.path === base.replace(/\/[^/]+\/$/, "/"),
              );

              if (grandParent) {
                const parent = grandParent.children?.find(
                  (item) => item.path === base,
                );

                if (parent) (parent.children ??= []).push(info);
              }
            }
          }
        });

      return result;
    };

    const info = computed(() => getCatalogInfo());

    return (): VNode => {
      const isDeep = info.value.some((item) => item.children);

      const items = info.value.map(({ children = [], icon, path, title }) => {
        const childLink = CatalogLink({
          title,
          path,
          icon,
          class: "vp-catalog-title",
        });

        return isDeep
          ? [
              h(
                "h3",
                {
                  id: title,
                  class: [
                    "vp-catalog-child-title",
                    { "has-children": children.length },
                  ],
                },
                [
                  h(
                    "a",
                    {
                      href: `#${title}`,
                      class: "header-anchor",
                      "aria-hidden": true,
                    },
                    "#",
                  ),
                  childLink,
                ],
              ),
              children.length
                ? h(
                    props.index ? "ol" : "ul",
                    { class: "vp-child-catalogs" },
                    children.map(({ children = [], icon, path, title }) =>
                      h("li", { class: "vp-child-catalog" }, [
                        h(
                          "div",
                          {
                            class: [
                              "vp-catalog-sub-title",
                              { "has-children": children.length },
                            ],
                          },
                          [
                            h(
                              "a",
                              {
                                href: `#${title}`,
                                class: "header-anchor",
                              },
                              "#",
                            ),
                            h(CatalogLink, {
                              title,
                              path,
                              icon,
                              class: "vp-catalog-title",
                            }),
                          ],
                        ),
                        children.length
                          ? h(
                              props.index ? "ol" : "div",
                              {
                                class: props.index
                                  ? "vp-sub-catalogs"
                                  : "vp-sub-catalogs-wrapper",
                              },
                              children.map(({ icon, path, title }) => {
                                const subLink = h(CatalogLink, {
                                  title,
                                  path,
                                  icon,
                                  class: "",
                                });

                                return props.index
                                  ? h(
                                      "li",
                                      { class: "vp-sub-catalog" },
                                      subLink,
                                    )
                                  : h(CatalogLink, {
                                      title,
                                      path,
                                      icon,
                                      class: "vp-sub-catalog-link",
                                    });
                              }),
                            )
                          : null,
                      ]),
                    ),
                  )
                : null,
            ]
          : h("div", { class: "vp-catalog-child-title" }, childLink);
      });

      return h(
        "div",
        { class: ["vp-catalog-wrapper", { index: props.index }] },
        [
          props.hideHeading
            ? null
            : h("h2", { class: "vp-catalog-main-title" }, locale.value.title),
          info.value.length
            ? props.index
              ? h(
                  "ol",
                  { class: "vp-catalogs" },
                  items.map((item) => h("li", { class: "vp-catalog" }, item)),
                )
              : items
            : h("p", { class: "vp-empty-catalog" }, locale.value.empty),
        ],
      );
    };
  },
});
