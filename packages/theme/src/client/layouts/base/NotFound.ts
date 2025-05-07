import type { Slot } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useRouter } from "vuepress/client";

import MainLayout from "@theme-hope/components/base/MainLayout";
import SkipLink from "@theme-hope/components/base/SkipLink";
import { useData } from "@theme-hope/composables/useData";

export default defineComponent({
  name: "NotFound",

  slots: Object as SlotsType<{
    default?: Slot;

    // navbar
    navScreenTop?: Slot;
    navScreenBottom?: Slot;
  }>,

  setup(_props, { slots }) {
    const { routeLocale, themeLocale } = useData();
    const router = useRouter();

    const getMsg = (): string => {
      const messages = themeLocale.value.routeLocales.notFoundMsg;

      return messages[Math.floor(Math.random() * messages.length)];
    };

    return (): VNode[] => [
      h(SkipLink),
      h(
        MainLayout,
        { noSidebar: true },
        {
          ...slots,
          default: () =>
            h(
              "main",
              { id: "main-content", class: "vp-page not-found" },
              slots.default?.() ?? [
                h("div", { class: "not-found-hint" }, [
                  h("p", { class: "error-code" }, "404"),
                  h(
                    "h1",
                    { class: "error-title" },
                    themeLocale.value.routeLocales.notFoundTitle,
                  ),
                  h(
                    "p",
                    { class: "error-hint", "data-allow-mismatch": "text" },
                    getMsg(),
                  ),
                ]),
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
        },
      ),
    ];
  },
});
