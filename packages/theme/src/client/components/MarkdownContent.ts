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
import { Content, usePageFrontmatter } from "vuepress/client";

import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

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
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();

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

    const showContributors = computed(
      () =>
        frontmatter.value.contributors ??
        themeLocale.value.contributors ??
        true,
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
          class: ["markdown-content"],
        }),
        slots.after?.(),
        hasGlobalComponent("GitChangelog")
          ? h(resolveComponent("GitChangelog"))
          : null,
        showContributors.value && hasGlobalComponent("GitContributors")
          ? h(resolveComponent("GitContributors"))
          : null,
      ]);
  },
});
