import type { VNode } from "vue";
import { defineComponent, h, nextTick, onMounted, onUnmounted } from "vue";
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
    let removeAfterEach: (() => void) | undefined;

    // Register after mount so server-side rendering never touches `document`.
    onMounted(() => {
      removeAfterEach = router.afterEach((to, from, failure) => {
        if (failure || to.path === from.path) return;

        void nextTick().then(() => {
          const el = document.querySelector<HTMLElement>(`#${props.content}`);

          if (el) focusElement(el);
        });
      });
    });

    onUnmounted(() => {
      removeAfterEach?.();
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
