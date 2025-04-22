import { hasGlobalComponent, isNumber } from "@vuepress/helper/client";
import { useElementHover, watchImmediate } from "@vueuse/core";
import type { SlotsType, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  resolveComponent,
} from "vue";
import { Content } from "vuepress/client";

import { useMetaInfo, useThemeData } from "@theme-hope/composables/index";

import "../styles/markdown-content.scss";

export default defineComponent({
  name: "MarkdownContent",

  props: {
    /** whether use customized layout */
    custom: Boolean,
  },

  slots: Object as SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
  }>,

  setup(props, { slots }) {
    const theme = useThemeData();
    const { changelog, contributors } = useMetaInfo();

    const contentElement = ref<HTMLElement>();

    const isHovered = useElementHover(contentElement, {
      delayEnter: isNumber(theme.value.focus) ? theme.value.focus : 1500,
      delayLeave: 0,
    });

    const enableFocus = computed(
      () => Boolean(theme.value.focus ?? theme.value.pure) && isHovered.value,
    );

    onMounted(() => {
      const html = document.documentElement;

      watchImmediate(enableFocus, (value) => {
        if (value) {
          html.classList.add("is-focusing");
        } else {
          html.classList.remove("is-focusing");
        }
      });
    });

    return (): VNode =>
      h("div", { class: { custom: props.custom }, "vp-content": "" }, [
        slots.before?.(),
        h(Content, {
          ref: contentElement,
          id: "markdown-content",
        }),
        slots.after?.(),
        changelog.value && hasGlobalComponent("GitChangelog")
          ? h(resolveComponent("GitChangelog"))
          : null,
        contributors.value === "as-content" &&
        hasGlobalComponent("GitContributors")
          ? h(resolveComponent("GitContributors"))
          : null,
      ]);
  },
});
