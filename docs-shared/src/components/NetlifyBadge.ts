import { ClientOnly } from "@vuepress/client";
import { type VNode, defineComponent, h } from "vue";

// @ts-ignore
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

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
    const { isDarkmode } = useDarkmode();

    return (): VNode | null =>
      IS_NETLIFY
        ? h(ClientOnly, () =>
            h(
              "a",
              { href: "https://www.netlify.com", target: "_blank" },
              h("img", {
                src: `https://www.netlify.com/img/global/badges/netlify-${
                  isDarkmode.value ? "dark" : "light"
                }.svg`,
                alt: props.alt,
              })
            )
          )
        : null;
  },
});
