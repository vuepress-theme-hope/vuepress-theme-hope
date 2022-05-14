import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { useEventListener } from "@vueuse/core";
import { usePageFrontmatter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import { debounce } from "ts-debounce";
import { Transition, computed, defineComponent, h, onMounted, ref } from "vue";
import { BacktoTopIcon } from "./icons";

import "../styles/back-to-top.scss";

import type { VNode } from "vue";
import type { BackToTopLocaleConfig } from "../../shared";

declare const BACK_TO_TOP_LOCALES: BackToTopLocaleConfig;

export default defineComponent({
  name: "BackToTop",

  props: {
    threshold: { type: Number, default: 300 },
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter<{ backToTop?: boolean }>();
    const themeData = useThemeData();
    const locale = useLocaleConfig(BACK_TO_TOP_LOCALES);

    /** Scroll distance */
    const scrollTop = ref(0);

    const thresholdDistance = computed<number>(() => {
      const { backToTop } = themeData.value;

      return typeof backToTop === "number" ? backToTop : props.threshold;
    });

    /** Whether to display button */
    const show = computed<boolean>(() => {
      const globalEnable = themeData.value.backToTop !== false;
      const pageEnable = pageFrontmatter.value.backToTop;

      return (
        (pageEnable || (globalEnable && pageEnable !== false)) &&
        scrollTop.value > thresholdDistance.value
      );
    });

    // Get scroll distance
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const scrollHandler = debounce(() => {
      scrollTop.value = getScrollTop();
    }, 100);

    onMounted(() => {
      scrollTop.value = getScrollTop();
    });

    useEventListener("scroll", () => scrollHandler());

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
              h(BacktoTopIcon)
            )
          : null
      );
  },
});
