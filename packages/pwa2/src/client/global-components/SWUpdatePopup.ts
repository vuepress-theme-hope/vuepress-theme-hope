import { useLocaleConfig } from "@mr-hope/vuepress-shared/client";
import { Transition, computed, defineComponent, h, onMounted, ref } from "vue";
import { i18n } from "../define";
import { UpdateIcon } from "../components/icons";
import { usePwaEvent, useSkipWaiting } from "../composables";

import type { VNode } from "vue";

import "../styles/popup.scss";

export default defineComponent({
  name: "SWUpdatePopup",

  setup(_props, { slots }) {
    const locales = useLocaleConfig(i18n);
    const registration = ref<ServiceWorkerRegistration | null>(null);

    const enabled = computed(() => Boolean(registration.value));

    const reload = (): void => {
      if (registration.value) {
        useSkipWaiting(registration.value);
        location.reload(true);

        registration.value = null;
      }
    };

    onMounted(() => {
      const event = usePwaEvent();

      event.on("updated", (reg) => {
        if (reg) {
          registration.value = reg;
        }
      });
    });

    return (): VNode =>
      h(
        Transition,
        { name: "popup" },
        slots.default?.({
          enabled: enabled.value,
          reload,
        }) ||
          (enabled.value
            ? h(
                "div",
                {
                  class: "sw-update-popup",
                  role: "button",
                  tabindex: 0,
                  onClick: () => reload(),
                },
                [
                  locales.value.update,
                  h("span", { class: "update" }, h(UpdateIcon)),
                ]
              )
            : "")
      );
  },
});
