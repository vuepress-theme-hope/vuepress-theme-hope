import { defineComponent, h, onMounted, reactive, VNode } from "vue";

import { useDarkMode } from "@theme-hope/modules/outlook/composables/index.js";

declare const IS_NETLIFY: boolean;

export default defineComponent({
  name: "NetlifyBadge",

  props: {
    alt: {
      type: String,
      default: "Deploys by Netlify",
    },
  },

  setup(props) {
    const { isDarkMode } = useDarkMode();

    return (): VNode | null =>
      IS_NETLIFY
        ? h(
            "a",
            { href: "https://www.netlify.com", target: "_blank" },
            h("img", {
              src: `https://www.netlify.com/img/global/badges/netlify-${
                isDarkMode.value ? "dark" : "light"
              }.svg`,
              alt: props.alt,
            })
          )
        : null;
  },
});
