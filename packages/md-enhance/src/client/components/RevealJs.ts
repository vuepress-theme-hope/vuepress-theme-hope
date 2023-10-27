import { usePageFrontmatter } from "@vuepress/client";
import type Reveal from "reveal.js/dist/reveal.esm.js";
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

import { useRevealJs } from "@temp/md-enhance/revealjs-plugins.js";

import { useRevealJsConfig } from "../helpers/index.js";

import "../styles/revealjs/index.scss";
import "../styles/revealjs/theme/fonts/league-gothic/league-gothic.css";
import "../styles/revealjs/theme/fonts/source-sans-pro/source-sans-pro.css";

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
  name: "RevealJs",

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
    const revealOptions = useRevealJsConfig();
    const frontmatter = usePageFrontmatter<{ revealJs: Reveal.Options }>();
    const code = ref("");
    const loading = ref(true);
    const presentationContainer = shallowRef<HTMLElement>();

    let reveal: Reveal.Api | null = null;

    const initRevealJs = async (
      container: HTMLElement,
    ): Promise<Reveal.Api> => {
      const promises: [Promise<void>, ...ReturnType<typeof useRevealJs>] = [
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
        ...useRevealJs(),
      ];

      const [, revealJs, ...plugins] = await Promise.all(promises);

      const reveal = new revealJs.default(container, {
        backgroundTransition: "slide",
        hash: frontmatter.value.layout === "Slide",
        mouseWheel: frontmatter.value.layout === "Slide",
        transition: "slide",
        slideNumber: true,
        ...revealOptions,
        ...(frontmatter.value.revealJs || {}),
        embedded: frontmatter.value.layout !== "Slide",
        markdown: {
          // FIXME: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/67226
          // @ts-ignore
          separator: "^\r?\\n---\r?\n$",
          // @ts-ignore
          verticalSeparator: "^\r?\n--\r?\n$",
        },

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

        reveal = await initRevealJs(container);

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
            innerHTML: `<section data-markdown><script type="text/template">${code.value}</script></section>`,
          }),
        ),
        loading.value
          ? h(LoadingIcon, { class: "reveal-loading", height: 400 })
          : null,
      ]);
  },
});
