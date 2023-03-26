import { useRouteLocale } from "@vuepress/client";
import {
  usePreferredLanguages,
  useScrollLock,
  useSessionStorage,
} from "@vueuse/core";
import {
  TransitionGroup,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  redirectLocaleConfig,
  redirectLocaleEntries,
  redirectLocales,
} from "../define.js";

import "../styles/language-switch.scss";

const { switchLocale } = redirectLocaleConfig;

interface LocaleInfo {
  lang: string;
  localePath: string;
}

export default defineComponent({
  name: "LanguageSwitch",

  setup() {
    const languages = usePreferredLanguages();
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const storage = useSessionStorage<Record<string, boolean>>(
      "VUEPRESS_REDIRECT_LOCALES",
      {}
    );

    const showModal = ref(false);

    const info = computed<LocaleInfo | null>(() => {
      for (const language of languages.value)
        for (const [localePath, langs] of redirectLocaleEntries)
          if (langs.includes(language)) {
            if (localePath === routeLocale.value) return null;

            return {
              lang: language,
              localePath,
            };
          }

      return null;
    });

    const targetRoute = computed(() =>
      info.value
        ? route.path.replace(routeLocale.value, info.value.localePath)
        : null
    );

    const locale = computed(() => {
      if (info.value) {
        const { lang, localePath } = info.value;
        const locales = [
          redirectLocales[routeLocale.value],
          redirectLocales[localePath],
        ];

        return {
          hint: locales.map(({ hint }) => hint.replace("$1", lang)),
          switch: locales
            .map(({ switch: switchText }) => switchText.replace("$1", lang))
            .join(" / "),
          cancel: locales.map(({ cancel }) => cancel).join(" / "),
        };
      }

      return null;
    });

    watch(
      info,
      () => {
        if (!storage.value[routeLocale.value])
          if (info.value) {
            if (switchLocale === "direct")
              void router.replace(targetRoute.value!);
            else if (switchLocale === "modal") showModal.value = true;
          } else {
            showModal.value = false;
          }
      },
      { immediate: true }
    );

    onMounted(() => {
      const isLocked = useScrollLock(document.body);

      watch(
        showModal,
        (value) => {
          isLocked.value = value;
        },
        { immediate: true }
      );

      onUnmounted(() => {
        isLocked.value = false;
      });
    });

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
                        locale.value?.hint.map((text) => h("p", text))
                      ),
                      h(
                        "button",
                        {
                          type: "button",
                          class: "lang-modal-action primary",
                          onClick: () => {
                            storage.value[routeLocale.value] = true;
                            void router.replace(targetRoute.value!);
                          },
                        },
                        locale.value?.switch
                      ),
                      h(
                        "button",
                        {
                          type: "button",
                          class: "lang-modal-action",
                          onClick: () => {
                            storage.value[routeLocale.value] = true;
                            showModal.value = false;
                          },
                        },
                        locale.value?.cancel
                      ),
                    ]
                  ),
                ]
              : []
          )
        : null;
  },
});
