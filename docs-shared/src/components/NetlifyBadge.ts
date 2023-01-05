import { ClientOnly } from "@vuepress/client";
import { defineComponent, h } from "vue";
// @ts-ignore
import { useDarkMode } from "@theme-hope/modules/outlook/composables/index";

import type { VNode } from "vue";

declare const IS_NETLIFY: boolean;

export default defineComponent({
  name: "NetlifyBadge",

  props: {
    /**
     * Badge alt
     */
    alt: {
      type: String,
      default: "Deploys by Netlify",
    },
  },

  setup(props) {
    const { isDarkMode } = useDarkMode();

    return (): VNode | null =>
      IS_NETLIFY
        ? h(ClientOnly, () =>
            h(
              "a",
              { href: "https://www.netlify.com", target: "_blank" },
              h("img", {
                src: `https://www.netlify.com/img/global/badges/netlify-${
                  isDarkMode.value ? "dark" : "light"
                }.svg`,
                alt: props.alt,
              })
            )
          )
        : null;
  },
});
