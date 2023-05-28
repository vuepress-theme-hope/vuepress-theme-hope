import {
  type SlotsType,
  Transition,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  shallowRef,
} from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { UpdateIcon } from "../components/icons.js";
import { usePWAEvent } from "../composables/index.js";
import { locales } from "../define.js";
import { skipWaiting } from "../utils/index.js";

import "../styles/popup.scss";

export default defineComponent({
  name: "SWUpdatePopup",

  slots: Object as SlotsType<{
    default?: (props: {
      enabled: boolean;
      reload: () => void;
    }) => VNode[] | VNode;
  }>,

  setup(_props, { slots }) {
    const locale = useLocaleConfig(locales);
    const registration = shallowRef<ServiceWorkerRegistration>();

    const enabled = computed(() => Boolean(registration.value));

    const reload = (): void => {
      if (registration.value) {
        skipWaiting(registration.value);
        registration.value = undefined;
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
          slots.default?.({
            enabled: enabled.value,
            reload,
          }) ||
          (enabled.value
            ? h(
                "button",
                {
                  type: "button",
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
