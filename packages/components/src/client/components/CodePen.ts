import { useScriptTag } from "@vueuse/core";
import { computed, defineComponent, h } from "vue";

import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "CodePen",

  props: {
    link: { type: String, default: "" },
    user: { type: String, default: "" },
    slugHash: { type: String, default: "" },
    title: { type: String, default: "" },
    height: { type: Number, default: 265 },
    theme: {
      type: String as PropType<"default" | "light" | "dark">,
      default: "default",
    },
    defaultTab: {
      type: Array as PropType<string[]>,
      default: () => ["result"],
    },
  },

  setup(props) {
    const getInfo = (): {
      user: string | undefined;
      slugHash: string | undefined;
    } => {
      const result =
        /(?:^(?:https?:)?\/\/codepen.io\/|^\/|^)(.*?)\/(?:pen|embed)\/(.*?)\/?$/.exec(
          props.link
        );

      return {
        user: result?.[1],
        slugHash: result?.[2],
      };
    };

    const user = computed(() => getInfo().user || props.user);

    const slugHash = computed(() => getInfo().slugHash || props.slugHash);

    useScriptTag("https://static.codepen.io/assets/embed/ei.js");

    return (): VNode =>
      h(
        "p",
        {
          class: "codepen",
          "data-height": props.height,
          "data-theme-id": props.theme,
          "data-user": user.value,
          "data-slug-hash": slugHash.value,
          "data-default-tab": props.defaultTab.join(","),
          "data-pen-title": props.title,
          user: props.user,
        },
        [
          h("span", [
            "See the Pen ",
            h("a", { href: props.link }, [props.title]),
            " by ",
            h("a", { href: `https://codepen.io/${user.value}` }, [user.value]),
            " on ",
            h("a", { href: `https://codepen.io` }, ["CodePen"]),
            ".",
          ]),
        ]
      );
  },
});
