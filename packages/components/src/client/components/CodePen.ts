import { useScriptTag } from "@vueuse/core";
import { computed, defineComponent, onMounted, h } from "vue";

import type { PropType, VNode } from "vue";

import "../styles/code-pen.scss";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __CPEmbed: (selector: string) => void;
  }
}

export default defineComponent({
  name: "CodePen",

  props: {
    link: { type: String, default: "" },
    user: { type: String, default: "" },
    slugHash: { type: String, default: "" },
    title: { type: String, default: "" },
    height: { type: Number, default: 380 },
    theme: {
      type: String as PropType<"default" | "light" | "dark">,
      default: "default",
    },
    defaultTab: {
      type: Array as PropType<string[]>,
      default: () => ["result"],
    },
    status: {
      type: String as PropType<"autoload" | "preview" | "clicktorun">,
      default: "preview",
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

    onMounted(() => {
      if (props.status !== "clicktorun") {
        const intervalID = setInterval(() => {
          if (window.__CPEmbed) {
            window.__CPEmbed(`.codepen-${slugHash.value}`);
            clearInterval(intervalID);
          }
        }, 500);
      }
    });

    return (): VNode =>
      h(
        "div",
        {
          class: ["codepen-wrapper", `codepen-${slugHash.value}`],
          "data-height": props.height,
          "data-theme-id": props.theme,
          "data-user": user.value,
          "data-slug-hash": slugHash.value,
          "data-default-tab": props.defaultTab.join(","),
          "data-pen-title": props.title,
          "data-preview": props.status === "preview",
          user: props.user,
        },
        [
          props.status === "clicktorun"
            ? h(
                "button",
                {
                  class: "codepen-button",
                  onClick: () => {
                    window.__CPEmbed(`.codepen-${slugHash.value}`);
                  },
                },
                "Run Code"
              )
            : null,
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
