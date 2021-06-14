import { useLocaleConfig } from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/client";
import debounce from "lodash.debounce";
import {
  Transition,
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { componentI18n } from "../define";
import { BacktoTopIcon } from "../icons";

import "../styles/back-to-top.scss";

import type { VNode } from "vue";

export default defineComponent({
  name: "BackToTop",

  props: {
    threshold: { type: Number, default: 300 },
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter();
    const themeData = useThemeData();
    const componentLocale = useLocaleConfig(componentI18n);

    /** Scroll distance */
    const scrollTop = ref(0);

    const thresholdDistance = computed<number>(() => {
      const { backToTop } = themeData.value;

      return typeof backToTop === "number" ? backToTop : props.threshold;
    });

    /** Whether to display button */
    const show = computed<boolean>(() => {
      const globalEnable = themeData.value.backToTop !== false;
      const pageEnable = pageFrontmatter.value.backToTop as boolean;

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
      window.addEventListener("scroll", scrollHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scrollHandler);
    });

    return (): VNode =>
      h(
        Transition,
        { name: "fade" },
        {
          default: () =>
            show.value
              ? h(
                  "button",
                  {
                    class: "back-to-top",
                    // hint text
                    ariaLabel: componentLocale.value.backToTop,
                    "data-balloon-pos": "left",
                    // Scroll to top
                    onClick: () => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      scrollTop.value = 0;
                    },
                  },
                  h(BacktoTopIcon)
                )
              : null,
        }
      );
  },
});
