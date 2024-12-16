import { isNumber } from "@vuepress/helper/client";
import { useElementHover } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, watch } from "vue";
import { Content } from "vuepress/client";

import { useThemeData } from "@theme-hope/composables/index";

import "../styles/markdown-content.scss";

export default defineComponent({
  name: "MarkdownContent",

  props: {
    /** whether use customized layout */
    custom: Boolean,
  },

  setup(props) {
    const themeData = useThemeData();

    const contentElement = ref<HTMLElement>();

    const isHovered = useElementHover(contentElement, {
      delayEnter: isNumber(themeData.value.focus)
        ? themeData.value.focus
        : 1500,
      delayLeave: 0,
    });

    const enableFocus = computed(
      () =>
        Boolean(themeData.value.focus ?? themeData.value.pure) &&
        isHovered.value,
    );

    onMounted(() => {
      const html = document.documentElement;

      watch(
        enableFocus,
        (value) => {
          if (value) {
            html.classList.add("is-focusing");
          } else {
            html.classList.remove("is-focusing");
          }
        },
        { immediate: true },
      );
    });

    return (): VNode =>
      h(Content, {
        ref: contentElement,
        class: ["theme-hope-content", { custom: props.custom }],
        "vp-content": "",
      });
  },
});
