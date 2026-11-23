import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { onContentUpdated } from "vuepress/client";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/base/skip-link.scss";

const focusElement = (el: HTMLElement): void => {
  const removeTabIndex = (): void => {
    el.removeAttribute("tabindex");
    el.removeEventListener("blur", removeTabIndex);
  };

  el.setAttribute("tabindex", "-1");
  el.addEventListener("blur", removeTabIndex);
  el.focus();
};

const focusMainContent = ({ target }: Event): void => {
  const el = document.querySelector<HTMLElement>((target as HTMLAnchorElement).hash);

  if (el) focusElement(el);
};

export default defineComponent({
  name: "SkipLink",

  props: {
    /** Content ID */
    content: {
      type: String,
      default: "main-content",
    },
  },

  setup(props) {
    const themeLocale = useThemeLocale();
    let hasMounted = false;

    onContentUpdated((reason) => {
      // The first callback is fired while the initial page is mounted. Moving
      // focus to the main content there would steal focus from the document
      // start, so only restore it after an actual page navigation.
      if (!hasMounted) {
        hasMounted = true;

        return;
      }

      if (reason !== "mounted") return;

      const el = document.querySelector<HTMLElement>(`#${props.content}`);

      if (el) focusElement(el);
    });

    return (): VNode =>
      h(
        "a",
        {
          href: `#${props.content}`,
          class: "vp-skip-link sr-only",
          onClick: focusMainContent,
        },
        themeLocale.value.routerLocales.skipToContent,
      );
  },
});
