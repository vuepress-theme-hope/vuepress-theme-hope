import { useEventListener } from "@vueuse/core";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import {
  useNavigate,
  useRelatedLinks,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import "../styles/page-nav.scss";

export default defineComponent({
  name: "PageNav",

  setup() {
    const themeLocale = useThemeLocaleData();
    const navigate = useNavigate();

    const { prevLink, nextLink } = useRelatedLinks();

    useEventListener("keydown", (event): void => {
      if (event.altKey)
        if (event.key === "ArrowRight") {
          if (nextLink.value) {
            navigate(nextLink.value.link);
            event.preventDefault();
          }
        } else if (event.key === "ArrowLeft") {
          if (prevLink.value) {
            navigate(prevLink.value.link);
            event.preventDefault();
          }
        }
    });

    return (): VNode | null =>
      prevLink.value || nextLink.value
        ? h("nav", { class: "vp-page-nav" }, [
            prevLink.value
              ? h(AutoLink, { class: "prev", config: prevLink.value }, () => [
                  h("div", { class: "hint" }, [
                    h("span", { class: "arrow start" }),
                    themeLocale.value.metaLocales.prev,
                  ]),
                  h("div", { class: "link" }, [
                    h(HopeIcon, {
                      icon: prevLink.value?.icon,
                    }),
                    prevLink.value?.text,
                  ]),
                ])
              : null,
            nextLink.value
              ? h(AutoLink, { class: "next", config: nextLink.value }, () => [
                  h("div", { class: "hint" }, [
                    themeLocale.value.metaLocales.next,
                    h("span", { class: "arrow end" }),
                  ]),
                  h("div", { class: "link" }, [
                    nextLink.value?.text,
                    h(HopeIcon, {
                      icon: nextLink.value?.icon,
                    }),
                  ]),
                ])
              : null,
          ])
        : null;
  },
});
