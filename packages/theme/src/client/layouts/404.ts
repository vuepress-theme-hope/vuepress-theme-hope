import { defineComponent, h } from "vue";
import { useLink } from "vue-router";
import { useRouteLocale } from "@vuepress/client";
import CommonWrapper from "@CommonWrapper";
import { Page404Icon } from "../components/icons";
import { useThemeLocaleData } from "../composables";

import type { VNode } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Page404",

  setup() {
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();

    const getMsg = (): string => {
      const messages = themeLocale.value.routeLocales["404msg"];

      return messages[Math.floor(Math.random() * messages.length)];
    };

    const { navigate } = useLink({
      to: themeLocale.value.home ?? routeLocale.value,
    });

    return (): VNode =>
      h(
        CommonWrapper,
        { sidebar: false },
        {
          default: () =>
            h("main", { class: "page not-found" }, [
              h(Page404Icon),
              h("blockquote", getMsg()),
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
        }
      );
  },
});
