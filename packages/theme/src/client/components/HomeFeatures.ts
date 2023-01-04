import { isLinkExternal } from "@vuepress/shared";
import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import Icon from "@theme-hope/components/Icon";

import type { PropType, VNode } from "vue";
import type { ThemeProjectHomeFeatureItemOptions } from "../../shared/index.js";

export default defineComponent({
  name: "HomeFeatures",

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
    return (): (VNode | null)[] => [
      props.header ? h("h3", props.header) : null,
      props.items.length
        ? h(
            "div",
            { class: "features" },
            props.items?.map((feature) => {
              const children = [
                h("h2", [
                  h(Icon, { icon: feature.icon }),
                  h("span", { innerHTML: feature.title }),
                ]),
                h("p", { innerHTML: feature.details }),
              ];

              return feature.link
                ? isLinkExternal(feature.link)
                  ? h(
                      "a",
                      {
                        class: "feature link",
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
                        class: "feature link",
                        to: feature.link,
                        role: "navigation",
                        "aria-label": feature.title,
                      },
                      () => children
                    )
                : h("div", { class: "feature" }, children);
            })
          )
        : null,
    ];
  },
});
