import { isLinkExternal } from "@vuepress/shared";
import { type PropType, type VNode, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import HopeIcon from "@theme-hope/components/HopeIcon";

import { type ThemeProjectHomeFeatureItemOptions } from "../../shared/index.js";

import "../styles/feature-panel.scss";

export default defineComponent({
  name: "FeaturePanel",

  props: {
    /**
     * Feature config
     */
    items: {
      type: Object as PropType<ThemeProjectHomeFeatureItemOptions[]>,
      default: (): ThemeProjectHomeFeatureItemOptions[] =>
        [] as ThemeProjectHomeFeatureItemOptions[],
    },

    /**
     * Feature header
     */
    header: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    return (): VNode =>
      h("div", { class: "feature-panel" }, [
        props.header
          ? h("h2", { class: "feature-header" }, props.header)
          : null,
        props.items.length
          ? h(
              "div",
              { class: "feature-wrapper" },
              props.items.map((feature) => {
                const children = [
                  h("h3", [
                    h(HopeIcon, { icon: feature.icon }),
                    h("span", { innerHTML: feature.title }),
                  ]),
                  h("p", { innerHTML: feature.details }),
                ];

                return feature.link
                  ? isLinkExternal(feature.link)
                    ? h(
                        "a",
                        {
                          class: "feature-item link",
                          href: feature.link,
                          role: "navigation",
                          "aria-label": feature.title,
                          target: "_blank",
                        },
                        children
                      )
                    : h(
                        RouterLink,
                        {
                          class: "feature-item link",
                          to: feature.link,
                          role: "navigation",
                          "aria-label": feature.title,
                        },
                        () => children
                      )
                  : h("div", { class: "feature-item" }, children);
              })
            )
          : null,
      ]);
  },
});
