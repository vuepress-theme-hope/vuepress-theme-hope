import { useRouteLocale } from "@vuepress/client";
import { type VNode, defineComponent, h } from "vue";
import { useLink } from "vue-router";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import NotFoundHint from "@theme-hope/components/NotFoundHint";
import SkipLink from "@theme-hope/components/SkipLink";
import { useThemeLocaleData } from "@theme-hope/composables/index";

import "../styles/not-found.scss";

export default defineComponent({
  name: "NotFound",

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
          { class: "page not-found", id: "main-content" },
          slots["default"]?.() || [
            h(NotFoundHint),
            h("div", { class: "actions" }, [
              h(
                "button",
                {
                  class: "action-button",
                  onClick: () => {
                    window.history.go(-1);
                  },
                },
                themeLocale.value.routeLocales.back
              ),
              h(
                "button",
                { class: "action-button", onClick: () => navigate() },
                themeLocale.value.routeLocales.home
              ),
            ]),
          ]
        )
      ),
    ];
  },
});
