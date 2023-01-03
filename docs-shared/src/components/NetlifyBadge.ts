import { defineComponent, h } from "vue";
// @ts-ignore
import { useDarkMode } from "@theme-hope/modules/outlook/composables/index";
import type { VNode } from "vue";

declare const IS_NETLIFY: boolean;

export default defineComponent({
  name: "NetlifyBadge",

  setup() {
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
              alt: "Deploys by Netlify",
            })
          )
        : null;
  },
});
