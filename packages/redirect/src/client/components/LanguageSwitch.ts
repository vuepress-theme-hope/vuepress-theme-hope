import { useRouteLocale } from "@vuepress/client";
import { usePreferredLanguages } from "@vueuse/core";
import {
  TransitionGroup,
  type VNode,
  computed,
  defineComponent,
  h,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { entries, useLocaleConfig } from "vuepress-shared/client";

import { redirectLocaleConfig, redirectLocales } from "../define.js";

import "../styles/language-switch.scss";

const { localeConfig, switchLocale } = redirectLocaleConfig;
const localeEntries = entries(localeConfig);

interface LocaleInfo {
  lang: string;
  localePath: string;
  url: string;
}

export default defineComponent({
  name: "LanguageSwitch",

  setup() {
    const locale = useLocaleConfig(redirectLocales);
    const languages = usePreferredLanguages();
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();

    const showModal = ref(false);

    const info = computed<LocaleInfo | null>(() => {
      for (const language of languages.value)
        for (const [localePath, langs] of localeEntries)
          if (langs.includes(language)) {
            if (localePath === routeLocale.value) return null;

            return {
              lang: language,
              localePath,
              url: route.path.replace(routeLocale.value, localePath),
            };
          }

      return null;
    });

    watch(
      info,
      () => {
        console.log(info.value);
        if (info.value) {
          if (switchLocale === "direct") void router.replace(info.value.url);
          else if (switchLocale === "modal") showModal.value = true;
        } else {
          showModal.value = false;
        }
      },
      { immediate: true }
    );

    return (): VNode | null =>
      showModal.value
        ? h(TransitionGroup, { name: "lang-modal-fade" }, () =>
            showModal.value
              ? [
                  h("div", { key: "mask", class: "lang-modal-mask" }),
                  h(
                    "div",
                    {
                      key: "popup",
                      class: "lang-modal-wrapper",
                    },
                    [
                      h(
                        "div",
                        { class: "lang-modal-content" },
                        locale.value.hint.replace("$1", info.value?.lang || "")
                      ),
                      h("div", { class: "lang-modal-footer" }, [
                        h(
                          "button",
                          {
                            type: "button",
                            class: ["lang-modal-footer-action", "primary"],
                            onClick: () => router.replace(info.value!.url),
                          },
                          locale.value.switch.replace(
                            "$1",
                            info.value?.lang || ""
                          )
                        ),
                        h(
                          "button",
                          {
                            type: "button",
                            class: ["lang-modal-footer-action"],
                            onClick: () => {
                              showModal.value = false;
                            },
                          },
                          locale.value.cancel
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
