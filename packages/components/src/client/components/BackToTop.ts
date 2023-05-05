import { usePageFrontmatter } from "@vuepress/client";
import { useElementSize, useWindowScroll, useWindowSize } from "@vueuse/core";
import {
  Transition,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  shallowRef,
} from "vue";
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
      default: 100,
    },

    /**
     * 是否隐藏浏览进度条
     */
    noProgress: Boolean,
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter<{ backToTop?: boolean }>();
    const locale = useLocaleConfig(BACK_TO_TOP_LOCALES);
    const body = shallowRef<HTMLBodyElement>();
    const { height: bodyHeight } = useElementSize(body);
    const { height: windowHeight } = useWindowSize();

    /** Scroll distance */
    const { y } = useWindowScroll();

    /** Whether to display button */
    const show = computed(
      () =>
        pageFrontmatter.value.backToTop !== false && y.value > props.threshold
    );

    const progress = computed(
      () => y.value / (bodyHeight.value - windowHeight.value)
    );

    onMounted(() => {
      body.value = <HTMLBodyElement>document.body;
    });

    return (): VNode =>
      h(Transition, { name: "fade" }, () =>
        show.value
          ? h(
              "button",
              {
                type: "button",
                class: "back-to-top",
                // hint text
                "aria-label": locale.value.backToTop,
                "data-balloon-pos": "left",
                // Scroll to top
                onClick: () => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                },
              },
              [
                props.noProgress
                  ? null
                  : h(
                      "svg",
                      { class: "scroll-progress" },
                      h("circle", {
                        cx: "50%",
                        cy: "50%",
                        r: "calc(50% - 2px)",
                        style: {
                          "stroke-dasharray": `${
                            Math.PI * progress.value * 100
                          }% ${Math.PI * 100}%`,
                        },
                      })
                    ),
                h(BackToTopIcon),
              ]
            )
          : null
      );
  },
});
