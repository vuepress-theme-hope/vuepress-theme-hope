import { useReveal } from "@temp/md-enhance/reveal";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { LoadingIcon } from "./icons";

import type { PropType, VNode } from "vue";
import type Reveal from "reveal.js/dist/reveal.esm.js";
import type { RevealOptions } from "reveal.js/dist/reveal.esm.js";

declare const MARKDOWN_ENHANCE_DELAY: number;
declare const REVEAL_CONFIG: Partial<RevealOptions>;

type ThemeType =
  | "auto"
  | "black"
  | "white"
  | "league"
  | "beige"
  | "sky"
  | "night"
  | "serif"
  | "simple"
  | "solarized"
  | "blood"
  | "moon";

import "../styles/slides/index.scss";
import "../styles/slides/theme/fonts/league-gothic/league-gothic.css";
import "../styles/slides/theme/fonts/source-sans-pro/source-sans-pro.css";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Presentation",

  props: {
    id: { type: String, required: true },
    theme: { type: String as PropType<ThemeType>, default: "auto" },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<{ reveal: RevealOptions }>();
    const code = ref("");
    const loading = ref(false);
    const presentationContainer = ref<HTMLElement>();
    const presentationElement = ref<HTMLElement>();

    let reveal: Reveal;

    onMounted(() => {
      if (presentationElement.value) {
        code.value = decodeURIComponent(
          presentationContainer.value?.dataset["code"] || ""
        );

        presentationElement.value.setAttribute("id", props.id);
        presentationElement.value.setAttribute("data-theme", props.theme);

        const promises: [
          Promise<void>,
          ...Promise<typeof import("reveal.js/dist/reveal.esm.js")>[]
        ] = [
          new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
          ...useReveal(),
        ];

        void Promise.all(promises).then(([, revealJS, ...plugins]) => {
          reveal = new revealJS.default(
            presentationElement.value as HTMLElement,
            { plugins: plugins.map((plugin) => plugin.default) }
          );

          void reveal
            .initialize({
              backgroundTransition: "slide",
              hash: frontmatter.value.layout === "Slide",
              mouseWheel: frontmatter.value.layout === "Slide",
              transition: "slide",
              slideNumber: true,
              ...REVEAL_CONFIG,
              ...(frontmatter.value.reveal || {}),
              embedded: frontmatter.value.layout !== "Slide",
            })
            .then(() => {
              loading.value = false;
              reveal.configure({ backgroundTransition: "slide" });
            });
        });
      }
    });

    onBeforeUnmount(() => {
      reveal?.destroy();
    });

    return (): VNode =>
      h(
        "div",
        {
          ref: presentationContainer,
          class: {
            "md-enhance-presentation": true,
            loading: loading.value,
          },
        },
        [
          loading.value ? h(LoadingIcon) : null,
          h(
            "div",
            {
              ref: presentationElement,
              class: ["reveal", "reveal-viewport"],
            },
            h("div", {
              class: "slides",
              style: { display: loading.value ? "none" : "block" },
              innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${code.value}</script></section>`,
            })
          ),
        ]
      );
  },
});
