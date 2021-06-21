import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { useRouteLocale } from "@vuepress/client";
import Common from "@Common";
import Page404Icon from "../components/icons/Page404.vue";
import { useThemeLocaleData } from "../composables";

import type { VNode } from "vue";

export default defineComponent({
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

    return (): VNode =>
      h(
        Common,
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
                themeLocale.value.back
              ),
              h(
                RouterLink,
                { to: themeLocale.value.home ?? routeLocale.value },
                themeLocale.value.backToHome ?? "Back to home"
              ),
            ]),
        }
      );
  },
});
