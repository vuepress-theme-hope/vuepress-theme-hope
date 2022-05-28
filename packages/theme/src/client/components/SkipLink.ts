import { defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { VNode } from "vue";

import "../styles/skip-link.scss";

export default defineComponent({
  name: "SkipLink",

  props: {
    content: {
      type: String,
      default: "main-content",
    },
  },

  setup(props) {
    const route = useRoute();
    const backToTop = ref<HTMLSpanElement>();

    watch(
      () => route.path,
      () => backToTop.value!.focus()
    );

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

    return (): VNode[] => [
      h("span", {
        ref: backToTop,
        tabindex: "-1",
      }),
      h(
        "a",
        {
          href: `#${props.content}`,
          class: "skip-link sr-only",
          onClick: focusMainContent,
        },
        "Skip to content"
      ),
    ];
  },
});
