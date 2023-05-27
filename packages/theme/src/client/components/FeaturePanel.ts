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
      h("div", { class: "vp-feature-panel" }, [
        props.header
          ? h("h2", { class: "vp-feature-title" }, props.header)
          : null,
        props.items.length
          ? h(
              "div",
              { class: "vp-features-wrapper" },
              props.items.map((feature) => {
                const children = [
                  h("h3", { class: "vp-feature-header" }, [
                    h(HopeIcon, { icon: feature.icon }),
                    h("span", { innerHTML: feature.title }),
                  ]),
                  h("p", {
                    class: "vp-feature-content",
                    innerHTML: feature.details,
                  }),
                ];

                return feature.link
                  ? isLinkExternal(feature.link)
                    ? h(
                        "a",
                        {
                          class: "vp-feature link",
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
                          class: "vp-feature link",
                          to: feature.link,
                          role: "navigation",
                          "aria-label": feature.title,
                        },
                        () => children
                      )
                  : h("div", { class: "vp-feature" }, children);
              })
            )
          : null,
      ]);
  },
});
