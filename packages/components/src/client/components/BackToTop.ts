import { useEventListener, useDebounceFn } from "@vueuse/core";
import { usePageFrontmatter } from "@vuepress/client";
import { Transition, computed, defineComponent, h, onMounted, ref } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";
import { BackToTopIcon } from "./icons.js";

import "../styles/back-to-top.scss";

import type { VNode } from "vue";
import type { BackToTopLocaleConfig } from "../../shared/index.js";

declare const BACK_TO_TOP_LOCALES: BackToTopLocaleConfig;

export default defineComponent({
  name: "BackToTop",

  props: {
    threshold: { type: Number, default: 300 },
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter<{ backToTop?: boolean }>();
    const locale = useLocaleConfig(BACK_TO_TOP_LOCALES);

    /** Scroll distance */
    const scrollTop = ref(0);

    /** Whether to display button */
    const show = computed<boolean>(
      () =>
        pageFrontmatter.value.backToTop !== false &&
        scrollTop.value > props.threshold
    );

    // Get scroll distance
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    onMounted(() => {
      scrollTop.value = getScrollTop();
    });

    useEventListener(
      "scroll",
      useDebounceFn(() => {
        scrollTop.value = getScrollTop();
      }, 100)
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
                  scrollTop.value = 0;
                },
              },
              h(BackToTopIcon)
            )
          : null
      );
  },
});
