import { useLocaleConfig } from "vuepress-shared/lib/client";
import { Transition, computed, defineComponent, h, onMounted, ref } from "vue";
import { locales } from "../define";
import { UpdateIcon } from "../components/icons";
import { usePWAEvent, useSkipWaiting } from "../composables";

import type { VNode } from "vue";

import "../styles/popup.scss";

export default defineComponent({
  name: "SWUpdatePopup",

  setup(_props, { slots }) {
    const locale = useLocaleConfig(locales);
    const registration = ref<ServiceWorkerRegistration | null>(null);

    const enabled = computed(() => Boolean(registration.value));

    const reload = (): void => {
      if (registration.value) {
        useSkipWaiting(registration.value);
        registration.value = null;
      }
    };

    onMounted(() => {
      const event = usePWAEvent();

      event.on("updated", (reg) => {
        if (reg) registration.value = reg;
      });
    });

    return (): VNode =>
      h(
        Transition,
        { name: "popup" },
        () =>
          slots["default"]?.({
            enabled: enabled.value,
            reload,
          }) ||
          (enabled.value
            ? h(
                "button",
                {
                  class: "sw-update-popup",
                  tabindex: 0,
                  onClick: () => reload(),
                },
                [
                  locale.value.update,
                  h("span", { class: "icon-wrapper" }, h(UpdateIcon)),
                ]
              )
            : null)
      );
  },
});
