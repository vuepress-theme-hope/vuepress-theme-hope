import { usePageFrontmatter } from "@vuepress/client";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { VPLink } from "vuepress-shared/client";

import HopeIcon from "@theme-hope/components/HopeIcon";
import type { BreadCrumbConfig } from "@theme-hope/composables/index";
import {
  useBreadCrumbConfig,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

import "../styles/breadcrumb.scss";

export default defineComponent({
  name: "BreadCrumb",

  props: {
    /**
     * @description BreadCrumb config
     */
    config: {
      type: Array as PropType<BreadCrumbConfig[]>,
      default: () => useBreadCrumbConfig(),
    },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();

    const enable = computed(
      () =>
        (frontmatter.value.breadcrumb ||
          (frontmatter.value.breadcrumb !== false &&
            themeLocale.value.breadcrumb !== false)) &&
        props.config.length > 1,
    );

    const iconEnable = computed(
      () =>
        frontmatter.value.breadcrumbIcon ||
        (frontmatter.value.breadcrumbIcon !== false &&
          themeLocale.value.breadcrumbIcon !== false),
    );

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
              props.config.map((item, index) =>
                h(
                  "li",
                  {
                    class: { "is-active": props.config.length - 1 === index },
                    property: "itemListElement",
                    typeof: "ListItem",
                  },
                  [
                    h(
                      VPLink,
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
                          item.title || "Unknown",
                        ),
                      ],
                    ),
                    // meta
                    h("meta", { property: "position", content: index + 1 }),
                  ],
                ),
              ),
            )
          : [],
      );
  },
});
