import { useRouteLocale } from "@vuepress/client";
import {
  TransitionGroup,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { entries, useLocaleConfig } from "vuepress-shared/client";

import { redirectLocaleConfig, redirectLocales } from "../define.js";

const { localeConfig, switchLocale } = redirectLocaleConfig;

export default defineComponent({
  name: "LanguageSwitch",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const locale = useLocaleConfig(redirectLocales);

    const showModal = ref(false);
    const routePath = ref("");

    const content = computed(() => locale.value.switch);

    onMounted(() => {
      const { languages } = window.navigator;

      for (const language of languages)
        for (const [localePath, langs] of entries(localeConfig))
          if (langs.includes(language))
            if (switchLocale === "direct") {
              void router.replace(
                route.path.replace(routeLocale.value, localePath)
              );
            } else if (switchLocale === "modal") {
              showModal.value = true;
              routePath.value = localePath;
            }
    });

    return (): VNode | null =>
      showModal.value
        ? h(TransitionGroup, { name: "language-switch-fade" }, () =>
            showModal.value
              ? [
                  h("div", {
                    key: "mask",
                    class: "language-switch-mask",
                  }),
                  h(
                    "div",
                    {
                      key: "popup",
                      class: "language-switch-wrapper fullscreen",
                    },
                    [
                      h(
                        "div",
                        {
                          class: "language-switch-content",
                        },
                        content.value
                      ),
                      h("div", { class: "language-switch-footer" }, [
                        h(
                          "button",
                          {
                            type: "button",
                            class: ["language-switch-footer-action", "primary"],
                            onClick: () => router.replace(routePath.value),
                          },
                          ""
                        ),
                        h(
                          "button",
                          {
                            type: "button",
                            class: ["language-switch-footer-action"],
                            onClick: () => {
                              showModal.value = false;
                              routePath.value = "";
                            },
                          },
                          ""
                        ),
                      ]),
                    ]
                  ),
                ]
              : []
          )
        : null;
  },
});
