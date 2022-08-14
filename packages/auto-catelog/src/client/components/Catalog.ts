import { computed, defineComponent, h } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import type { PropType, VNode } from "vue";
import type { Router, RouteMeta } from "vue-router";

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
    level: {
      type: Number,
      default: 2,
    },

    showIcon: {
      type: Boolean,
      default: true,
    },

    titleGetter: {
      type: Function as PropType<(meta: RouteMeta) => string>,
      default: (meta: RouteMeta) => meta.title,
    },

    iconGetter: {
      type: Function as PropType<(meta: RouteMeta) => string>,
      default: (meta: RouteMeta) => meta.icon,
    },

    orderGetter: {
      type: Function as PropType<(meta: RouteMeta) => number>,
      default: (meta: RouteMeta) => meta.order || 0,
    },

    shouldIndex: {
      type: Function as PropType<(meta: RouteMeta) => boolean>,
      default: (meta: RouteMeta) => meta.index !== false,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const isEnabled = computed(() => route.path.endsWith("/"));

    const getCatalogInfo = (router: Router): CatalogInfo[] => {
      const routes = router.getRoutes();
      const result: CatalogInfo[] = [];

      routes
        .filter(
          ({ meta, path }) =>
            // it's not current page
            path !== route.path &&
            // path starts with currect path
            path.startsWith(route.path) &&
            // page should be indexed
            props.shouldIndex(meta)
        )
        .map(({ path, meta }) => {
          const levels = route.path
            .substring(route.path.length)
            .split("/").length;

          return {
            title: props.titleGetter(meta),
            icon: props.iconGetter(meta),
            base: path.replace(/\/.*?$/, "/"),
            order: props.orderGetter(meta),
            level: route.path.endsWith("/") ? levels - 1 : levels,
            path,
          };
        })
        .filter(({ level }) => level <= props.level)
        .sort((infoA, infoB) => {
          const level = infoA.level - infoB.level;

          if (level) return level;

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

          // now we are sure both order exisit

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
          const { base } = info;
          const parent = result.find((info) => info.base === base);

          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(info);
          } else if (info.level === 1) result.push(info);
        });

      return result;
    };

    return (): VNode | null => {
      const info = getCatalogInfo(router);

      return isEnabled.value
        ? h("div", { class: "catalog-wrapper" }, [
            h("div", { class: "catalog-title" }, "Catalog"),
            h(
              "div",
              { class: "catalog-content" },
              info.map(({ path, title }) =>
                h(
                  "dl",
                  { class: "inline" },
                  h("dt", h(RouterLink, { to: path }, title || "Unknown"))
                )
              )
            ),
          ])
        : null;
    };
  },
});
