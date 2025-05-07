import type { VNode } from "vue";
import { defineComponent, h, shallowRef } from "vue";
import { onContentUpdated } from "vuepress/client";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/base/skip-link.scss";

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
    const themeLocale = useThemeLocale();

    const skipToMainContent = shallowRef<HTMLSpanElement>();

    const focusMainContent = ({ target }: Event): void => {
      const el = document.querySelector<HTMLElement>(
        (target as HTMLAnchorElement).hash,
      );

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

    onContentUpdated(() => {
      skipToMainContent.value?.focus();
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
          class: "vp-skip-link sr-only",
          onClick: focusMainContent,
        },
        themeLocale.value.routeLocales.skipToContent,
      ),
    ];
  },
});
