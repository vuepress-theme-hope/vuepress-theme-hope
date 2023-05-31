import { isLinkExternal } from "@vuepress/shared";
import { type PropType, type VNode, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import HopeIcon from "@theme-hope/components/HopeIcon";

import { type ThemeProjectHomeItemOption } from "../../shared/index.js";

import "../styles/feature-panel.scss";

export default defineComponent({
  name: "FeaturePanel",

  props: {
    /**
     * Feature config
     */
    features: {
      type: Object as PropType<ThemeProjectHomeItemOption[]>,
      default: (): ThemeProjectHomeItemOption[] =>
        [] as ThemeProjectHomeItemOption[],
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
        props.features.length
          ? h(
              "div",
              { class: "vp-features-wrapper" },
              props.features.map(({ icon, title, details, link }) => {
                const children = [
                  h("h3", { class: "vp-feature-header" }, [
                    h(HopeIcon, { icon }),
                    h("span", { innerHTML: title }),
                  ]),
                  h("p", {
                    class: "vp-feature-content",
                    innerHTML: details,
                  }),
                ];

                return link
                  ? isLinkExternal(link)
                    ? h(
                        "a",
                        {
                          class: "vp-feature link",
                          href: link,
                          role: "navigation",
                          "aria-label": title,
                          target: "_blank",
                        },
                        children
                      )
                    : h(
                        RouterLink,
                        {
                          class: "vp-feature link",
                          to: link,
                          role: "navigation",
                          "aria-label": title,
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
