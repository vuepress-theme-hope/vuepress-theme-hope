import { defineComponent, h, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { VNode } from "vue";

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
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const skipToMainContent = ref<HTMLSpanElement>();

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
        () => route.path,
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
