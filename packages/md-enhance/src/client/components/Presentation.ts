import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { LoadingIcon } from "./icons";

import type { PropType, VNode } from "vue";
import type Reveal from "reveal.js/dist/reveal.esm.js";
import type { RevealOptions } from "reveal.js/dist/reveal.esm.js";

declare const MARKDOWN_ENHANCE_DELAY: number;
declare const REVEAL_CONFIG: Partial<RevealOptions>;
declare const REVEAL_PLUGIN_HIGHLIGHT: boolean;
declare const REVEAL_PLUGIN_MATH: boolean;
declare const REVEAL_PLUGIN_NOTES: boolean;
declare const REVEAL_PLUGIN_SEARCH: boolean;
declare const REVEAL_PLUGIN_ZOOM: boolean;

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
  name: "PresentationViewer",

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
          presentationContainer.value?.dataset.code || ""
        );

        presentationElement.value.setAttribute("id", props.id);
        presentationElement.value.setAttribute("data-theme", props.theme);

        const promises: [
          Promise<void>,
          Promise<typeof import("reveal.js/dist/reveal.esm.js")>,
          ...Promise<typeof import("reveal.js/dist/reveal.esm.js")>[]
        ] = [
          new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/dist/reveal.esm.js"
          ),
        ];

        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/markdown/markdown.esm.js"
          )
        );

        if (REVEAL_PLUGIN_HIGHLIGHT)
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/highlight/highlight.esm.js"
            )
          );

        if (REVEAL_PLUGIN_MATH)
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/math/math.esm.js"
            )
          );

        if (REVEAL_PLUGIN_SEARCH)
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/search/search.esm.js"
            )
          );

        if (REVEAL_PLUGIN_NOTES)
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/notes/notes.esm.js"
            )
          );

        if (REVEAL_PLUGIN_ZOOM)
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/zoom/zoom.esm.js"
            )
          );

        // if (REVEAL_PLUGINS.includes("anything"))
        //   promises.push(
        //     import(
        //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/anything/anything.js"
        //     )
        //   );

        // if (REVEAL_PLUGINS.includes("audio"))
        //   promises.push(
        //     import(
        //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/audio-slideshow/audio-slideshow.js"
        //     )
        //   );

        // if (REVEAL_PLUGINS.includes("chalkboard"))
        //   promises.push(
        //     import(
        //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/chalkboard/chalkboard.js"
        //     )
        //   );

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
