import { usePageFrontmatter } from "@vuepress/client";
import type {
  // eslint-disable-next-line import/no-named-default
  default as Reveal,
  RevealOptions,
} from "reveal.js/dist/reveal.esm.js";
import type { PropType, VNode } from "vue";
import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import { useReveal } from "@temp/md-enhance/reveal";

import { useRevealConfig } from "../helpers/index.js";

import "../styles/slides/index.scss";
import "../styles/slides/theme/fonts/league-gothic/league-gothic.css";
import "../styles/slides/theme/fonts/source-sans-pro/source-sans-pro.css";

declare const MARKDOWN_ENHANCE_DELAY: number;

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

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Presentation",

  props: {
    /**
     * Presentation id
     *
     * 幻灯片 id
     */
    id: { type: String, required: true },

    /**
     * Presentation code
     *
     * 幻灯片代码
     */
    code: { type: String, required: true },

    /**
     * Presentation theme
     *
     * 幻灯片主题
     */
    theme: { type: String as PropType<ThemeType>, default: "auto" },
  },

  setup(props) {
    const revealOptions = useRevealConfig();
    const frontmatter = usePageFrontmatter<{ reveal: RevealOptions }>();
    const code = ref("");
    const loading = ref(true);
    const presentationContainer = shallowRef<HTMLElement>();

    let reveal: Reveal | null = null;

    const initRevealJS = async (container: HTMLElement): Promise<Reveal> => {
      const promises: [
        Promise<void>,
        ...Promise<typeof import("reveal.js/dist/reveal.esm.js")>[],
      ] = [
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
        ...useReveal(),
      ];

      const [, revealJS, ...plugins] = await Promise.all(promises);

      const reveal = new revealJS.default(container, {
        backgroundTransition: "slide",
        hash: frontmatter.value.layout === "Slide",
        mouseWheel: frontmatter.value.layout === "Slide",
        transition: "slide",
        slideNumber: true,
        ...revealOptions,
        ...(frontmatter.value.reveal || {}),
        embedded: frontmatter.value.layout !== "Slide",
        plugins: [
          ...plugins.map(({ default: plugin }) => plugin),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ...(revealOptions.plugins ?? []),
        ],
      });

      await reveal.initialize();

      return reveal;
    };

    onMounted(async () => {
      const container = presentationContainer.value;

      if (container) {
        code.value = atou(props.code);

        container.setAttribute("id", props.id);
        container.setAttribute("data-theme", props.theme);

        reveal = await initRevealJS(container);

        loading.value = false;
      }
    });

    onUnmounted(() => {
      reveal?.destroy();
    });

    return (): VNode =>
      h("div", { class: "vp-reveal" }, [
        h(
          "div",
          {
            ref: presentationContainer,
            class: ["reveal", "reveal-viewport"],
          },
          h("div", {
            class: "slides",
            innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${code.value}</script></section>`,
          }),
        ),
        loading.value
          ? h(LoadingIcon, { class: "reveal-loading", height: 400 })
          : null,
      ]);
  },
});
