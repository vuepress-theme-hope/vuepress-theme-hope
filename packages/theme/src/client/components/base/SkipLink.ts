import type { VNode } from "vue";
import { defineComponent, h, nextTick } from "vue";
import { useRouter } from "vuepress/client";

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

// Track the routers that already have a navigation listener, so each app
// focuses the new main content exactly once per navigation.
const observedRouters = new WeakSet<object>();

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
    const router = useRouter();

    // Focus the main content after a navigation instead of using
    // `onContentUpdated`, whose first callback would steal focus while the
    // initial page is mounted.
    if (!observedRouters.has(router)) {
      observedRouters.add(router);

      router.afterEach((to, from) => {
        if (to.path === from.path) return;

        void nextTick().then(() => {
          const el = document.querySelector<HTMLElement>(`#${props.content}`);

          if (el) focusElement(el);
        });
      });
    }

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
