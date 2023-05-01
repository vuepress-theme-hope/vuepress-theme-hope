import { usePageData } from "@vuepress/client";
import {
  type VNode,
  defineComponent,
  h,
  onMounted,
  shallowRef,
  watch,
} from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import "../styles/skip-link.scss";

export default defineComponent({
  name: "SkipLink",

  props: {
    /** @description Content ID */
    content: {
      type: String,
      default: "main-content",
    },
  },

  setup(props) {
    const page = usePageData();
    const themeLocale = useThemeLocaleData();

    const skipToMainContent = shallowRef<HTMLSpanElement>();

    const focusMainContent = ({ target }: Event): void => {
      const el = document.querySelector(
        (target as HTMLAnchorElement).hash
      ) as HTMLAnchorElement;

      if (el) {
        const removeTabIndex = (): void => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };

        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    };

    onMounted(() => {
      watch(
        () => page.value.path,
        () => skipToMainContent.value!.focus()
      );
    });

    return (): VNode[] => [
      h("span", {
        ref: skipToMainContent,
        tabindex: "-1",
      }),
      h(
        "a",
        {
          href: `#${props.content}`,
          class: "skip-link sr-only",
          onClick: focusMainContent,
        },
        themeLocale.value.routeLocales.skipToContent
      ),
    ];
  },
});
