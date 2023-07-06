import { useRouteLocale } from "@vuepress/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useLink } from "vue-router";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import NotFoundHint from "@theme-hope/components/NotFoundHint";
import SkipLink from "@theme-hope/components/SkipLink";
import { useThemeLocaleData } from "@theme-hope/composables/index";

import "../styles/not-found.scss";

export default defineComponent({
  name: "NotFound",

  slots: Object as SlotsType<{
    default: () => VNode | VNode[];
  }>,

  setup(_props, { slots }) {
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();

    const { navigate } = useLink({
      to: themeLocale.value.home ?? routeLocale.value,
    });

    return (): VNode[] => [
      h(SkipLink),
      h(CommonWrapper, { noSidebar: true }, () =>
        h(
          "main",
          { id: "main-content", class: "vp-page not-found" },
          slots.default?.() || [
            h(NotFoundHint),
            h("div", { class: "actions" }, [
              h(
                "button",
                {
                  type: "button",
                  class: "action-button",
                  onClick: () => {
                    window.history.go(-1);
                  },
                },
                themeLocale.value.routeLocales.back,
              ),
              h(
                "button",
                {
                  type: "button",
                  class: "action-button",
                  onClick: () => navigate(),
                },
                themeLocale.value.routeLocales.home,
              ),
            ]),
          ],
        ),
      ),
    ];
  },
});
