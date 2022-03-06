import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { Transition, defineComponent, h, onMounted, ref } from "vue";
import { locales } from "../define";
import { UpdateIcon } from "../components/icons";
import { usePWAEvent, useUnregister } from "../composables";

import type { VNode } from "vue";

import "../styles/popup.scss";

export default defineComponent({
  name: "SWHintPopup",

  setup(_props, { slots }) {
    const locale = useLocaleConfig(locales);
    const enabled = ref(false);

    const uninstall = (): void => {
      if (enabled.value) {
        void useUnregister().then((isSuccess) => {
          if (isSuccess) window.location.reload();
        });

        enabled.value = false;
      }
    };

    onMounted(() => {
      const event = usePWAEvent();

      event.on("updatefound", () => {
        enabled.value = true;
      });

      event.on("updated", () => {
        enabled.value = false;
      });
    });

    return (): VNode =>
      h(
        Transition,
        { name: "popup" },
        () =>
          slots.default?.({
            enabled: enabled.value,
            uninstall,
          }) ||
          (enabled.value
            ? h(
                "button",
                {
                  class: "sw-hint-popup",
                  tabindex: 0,
                  onClick: () => uninstall(),
                },
                [
                  locale.value.hint,
                  h("span", { class: "icon-wrapper" }, h(UpdateIcon)),
                ]
              )
            : null)
      );
  },
});
