import { usePageFrontmatter } from "@vuepress/client";
import {
  type default as Reveal,
  type RevealOptions,
} from "reveal.js/dist/reveal.esm.js";
import {
  type PropType,
  type VNode,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import { useReveal } from "@temp/md-enhance/reveal";

import "../styles/slides/index.scss";
import "../styles/slides/theme/fonts/league-gothic/league-gothic.css";
import "../styles/slides/theme/fonts/source-sans-pro/source-sans-pro.css";

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
    const frontmatter = usePageFrontmatter<{ reveal: RevealOptions }>();
    const code = ref("");
    const loading = ref(true);
    const presentationContainer = ref<HTMLElement>();

    let reveal: Reveal | null = null;

    const initRevealJS = async (container: HTMLElement): Promise<Reveal> => {
      const promises: [
        Promise<void>,
        ...Promise<typeof import("reveal.js/dist/reveal.esm.js")>[]
      ] = [
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
        ...useReveal(),
      ];

      const [, revealJS, ...plugins] = await Promise.all(promises);

      const reveal = new revealJS.default(container, {
        plugins: plugins.map(({ default: plugin }) => plugin),
      });

      await reveal.initialize({
        backgroundTransition: "slide",
        hash: frontmatter.value.layout === "Slide",
        mouseWheel: frontmatter.value.layout === "Slide",
        transition: "slide",
        slideNumber: true,
        ...REVEAL_CONFIG,
        ...(frontmatter.value.reveal || {}),
        embedded: frontmatter.value.layout !== "Slide",
      });

      reveal.configure({ backgroundTransition: "slide" });

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
      h("div", { class: "presentation-wrapper" }, [
        h(
          "div",
          {
            ref: presentationContainer,
            class: ["reveal", "reveal-viewport"],
          },
          h("div", {
            class: "slides",
            innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${code.value}</script></section>`,
          })
        ),
        loading.value
          ? h(LoadingIcon, { class: "reveal-loading", height: 400 })
          : null,
      ]);
  },
});
