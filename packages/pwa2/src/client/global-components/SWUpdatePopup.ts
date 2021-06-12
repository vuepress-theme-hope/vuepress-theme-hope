import { useRouteLocale } from "@vuepress/client";
import { Transition, computed, defineComponent, h, onMounted, ref } from "vue";
import { i18n } from "../define";
import { UpdateIcon } from "../components/icons";
import { usePwaEvent, useSkipWaiting } from "../composables";

import type { VNode } from "vue";

import "../styles/popup.scss";

export default defineComponent({
  name: "SWUpdatePopup",

  setup(_props, { slots }) {
    const routeLocale = useRouteLocale();
    const registration = ref<ServiceWorkerRegistration | null>(null);

    const enabled = computed(() => Boolean(registration.value));
    const message = computed(() => i18n[routeLocale.value].update);

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
                [message.value, h("span", { class: "update" }, h(UpdateIcon))]
              )
            : "")
      );
  },
});
