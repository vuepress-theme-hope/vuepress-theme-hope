import { usePageFrontmatter } from "@vuepress/client";
import { useWindowScroll } from "@vueuse/core";
import { Transition, type VNode, computed, defineComponent, h } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { BackToTopIcon } from "./icons.js";
import { type BackToTopLocaleConfig } from "../../shared/index.js";

import "balloon-css/balloon.css";
import "../styles/back-to-top.scss";

declare const BACK_TO_TOP_LOCALES: BackToTopLocaleConfig;

export default defineComponent({
  name: "BackToTop",

  props: {
    /**
     * Threshold distance in pixels to display the button
     *
     * 显示按钮的阈值距离，单位为像素
     */
    threshold: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter<{ backToTop?: boolean }>();
    const locale = useLocaleConfig(BACK_TO_TOP_LOCALES);

    /** Scroll distance */
    const { y } = useWindowScroll();

    /** Whether to display button */
    const show = computed(
      () =>
        pageFrontmatter.value.backToTop !== false && y.value > props.threshold
    );

    return (): VNode =>
      h(Transition, { name: "fade" }, () =>
        show.value
          ? h(
              "button",
              {
                class: "back-to-top",
                // hint text
                "aria-label": locale.value.backToTop,
                "data-balloon-pos": "left",
                // Scroll to top
                onClick: () => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                },
              },
              h(BackToTopIcon)
            )
          : null
      );
  },
});
