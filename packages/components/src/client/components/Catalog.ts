import { computed, defineComponent, h } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import FontIcon from "./FontIcon.js";

import type { PropType, VNode } from "vue";
import type { RouteMeta } from "vue-router";

import "../styles/catalog.scss";

interface CatalogInfo {
  title: string;
  icon: string;
  base: string;
  order: number;
  level: number;
  path: string;
  children?: CatalogInfo[];
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Catalog",

  props: {
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
     * Whether to hide icon
     *
     * 是否隐藏图标
     */
    hideIcon: Boolean,

    /**
     * Page title getter
     *
     * 页面标题获取器
     */
    titleGetter: {
      type: Function as PropType<(meta: RouteMeta) => string>,
      default: (meta: RouteMeta) => meta["title"],
    },

    /**
     * Page icon getter
     *
     * 页面图标获取器
     */
    iconGetter: {
      type: Function as PropType<(meta: RouteMeta) => string>,
      default: (meta: RouteMeta) => meta["icon"],
    },

    /**
     * Page order getter
     *
     * 页面排序获取器
     */
    orderGetter: {
      type: Function as PropType<(meta: RouteMeta) => number>,
      default: (meta: RouteMeta) => meta["order"] || 0,
    },

    /**
     * Page should be indexed getter
     *
     * 页面是否应该被索引的获取器
     */
    shouldIndex: {
      type: Function as PropType<(meta: RouteMeta) => boolean>,
      default: (meta: RouteMeta) => meta["index"] !== false,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const isEnabled = computed(() => route.path.endsWith("/"));

    const getCatalogInfo = (): CatalogInfo[] => {
      const routes = router.getRoutes();
      const result: CatalogInfo[] = [];

      routes
        .filter(
          ({ meta, path }) =>
            // filter real page
            ((path.endsWith(".html") && !path.endsWith("/index.html")) ||
              path.endsWith("/")) &&
            // exclude 404 page and current page
            path !== "/404.html" &&
            path !== route.path &&
            // path starts with current path
            path.startsWith(route.path) &&
            // page should be indexed
            props.shouldIndex(meta)
        )
        .map(({ path, meta }) => {
          const level = path.substring(route.path.length).split("/").length;

          return {
            title: props.titleGetter(meta),
            icon: props.iconGetter(meta),
            base: path.replace(/\/[^/]+\/?$/, "/"),
            order: props.orderGetter(meta),
            level: path.endsWith("/") ? level - 1 : level,
            path,
          };
        })
        .filter(({ title, level }) => level <= props.level || !title)
        .sort((infoA, infoB) => {
          const level = infoA.level - infoB.level;

          if (level) return level;

          // check README.md, it should be first one
          if (infoA.path.endsWith("/index.html")) return -1;
          if (infoB.path.endsWith("/index.html")) return 1;

          // infoA order is absent
          if (infoA.order === null) {
            // infoB order is absent
            if (infoB.order === null)
              // compare title
              return infoA.title.localeCompare(infoB.title);

            // infoB order is present
            return infoB.order;
          }

          // infoB order is absent
          if (infoB.order === null) return infoA.order;

          // now we are sure both order exist

          // infoA order is positive
          if (infoA.order > 0) {
            if (infoB.order > 0) return infoA.order - infoB.order;

            return -1;
          }

          // both order are negative
          if (infoB.order < 0) return infoA.order - infoB.order;

          return 1;
        })
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
                (item) => item.path === base.replace(/\/[^/]+\/$/, "/")
              );

              if (grandParent) {
                const parent = grandParent.children?.find(
                  (item) => item.path === base
                );

                if (parent) (parent.children ??= []).push(info);
              }
            }
          }
        });

      return result;
    };

    const info = computed(() => getCatalogInfo());

    return (): VNode | null => {
      return isEnabled.value
        ? h("div", { class: "catalog-wrapper" }, [
            // TODO: Add locale
            h("h2", { class: "main-title" }, "Catalog"),

            ...info.value.map(
              ({ children = [], icon, path, title }, mainIndex) => [
                h(
                  "h3",
                  {
                    id: title,
                    class: ["child-title", { "has-children": children.length }],
                  },
                  [
                    h("a", { href: `#${title}`, class: "header-anchor" }, "#"),
                    h(RouterLink, { class: "catalog-title", to: path }, () => [
                      !props.hideIcon && icon ? h(FontIcon, { icon }) : null,
                      `${mainIndex + 1}. ${title || "Unknown"}`,
                    ]),
                  ]
                ),
                children.length
                  ? h(
                      "ul",
                      { class: "child-catalog-wrapper" },
                      children.map(
                        ({ children = [], icon, path, title }, index) =>
                          h("li", { class: "catalog-item" }, [
                            h(
                              "div",
                              {
                                class: [
                                  "sub-title",
                                  { "has-children": children.length },
                                ],
                              },
                              [
                                h(
                                  "a",
                                  { href: `#${title}`, class: "header-anchor" },
                                  "#"
                                ),
                                h(
                                  RouterLink,
                                  { class: "catalog-title", to: path },
                                  () => [
                                    !props.hideIcon && icon
                                      ? h(FontIcon, { icon })
                                      : null,
                                    `${mainIndex + 1}.${index + 1} ${
                                      title || "Unknown"
                                    }`,
                                  ]
                                ),
                              ]
                            ),
                            children.length
                              ? h(
                                  "div",
                                  { class: "sub-catalog-wrapper" },
                                  children.map(
                                    ({ icon, path, title }, subIndex) =>
                                      h(
                                        RouterLink,
                                        {
                                          class: "sub-catalog-item",
                                          to: path,
                                        },
                                        () => [
                                          !props.hideIcon && icon
                                            ? h(FontIcon, { icon })
                                            : null,
                                          `${mainIndex + 1}.${index + 1}.${
                                            subIndex + 1
                                          } ${title || "Unknown"}`,
                                        ]
                                      )
                                  )
                                )
                              : null,
                          ])
                      )
                    )
                  : null,
              ]
            ),
          ])
        : null;
    };
  },
});
