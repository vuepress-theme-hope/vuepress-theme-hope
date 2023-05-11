import {
  type SlotsType,
  Transition,
  type VNode,
  defineComponent,
  h,
  onMounted,
  ref,
} from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { UpdateIcon } from "./icons.js";
import { usePWAEvent } from "../composables/index.js";
import { locales } from "../define.js";

import "../styles/popup.scss";

export default defineComponent({
  name: "SWHintPopup",

  slots: Object as SlotsType<{
    default?: (props: {
      enabled: boolean;
      uninstall: () => void;
    }) => VNode[] | VNode;
  }>,

  setup(_props, { slots }) {
    const locale = useLocaleConfig(locales);
    const enabled = ref(false);

    const uninstall = (): void => {
      if (enabled.value) {
        // force refresh
        // @ts-ignore
        window.location.reload(true);
        enabled.value = false;
      }
    };

    onMounted(() => {
      const event = usePWAEvent();

      event.on("updatefound", () => {
        void navigator.serviceWorker.getRegistration().then((registration) => {
          // check whether a valid service worker is active
          if (registration && registration.active) enabled.value = true;
        });
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
                  type: "button",
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
