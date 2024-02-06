import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useRouteLocale, useRouter } from "vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import NotFoundHint from "@theme-hope/components/NotFoundHint";
import SkipLink from "@theme-hope/components/SkipLink";
import { useThemeLocaleData } from "@theme-hope/composables/index";

import "../styles/not-found.scss";

export default defineComponent({
  name: "NotFound",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();

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
                  onClick: () => {
                    void router.push(
                      themeLocale.value.home ?? routeLocale.value,
                    );
                  },
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
