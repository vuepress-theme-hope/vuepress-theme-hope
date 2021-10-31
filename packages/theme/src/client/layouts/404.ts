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

    const messages = themeLocale.value.notFound ?? ["Not Found"];
    const getMsg = (): string =>
      messages[Math.floor(Math.random() * messages.length)];

    const goBack = (): void => {
      window.history.go(-1);
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
              // TODO: Only show button when can go back
              h(
                "button",
                { class: "action-button", onClick: () => goBack() },
                themeLocale.value.back ?? "Go back"
              ),
              h(
                "button",
                { class: "action-button", onClick: () => navigate() },
                themeLocale.value.backToHome ?? "Back to home"
              ),
            ]),
        }
      );
  },
});
