import type { RequiredSlot } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";

import MainFadeInUpTransition from "@theme-hope/components/base/MainFadeInUpTransition";
import PasswordModal from "@theme-hope/components/encrypt/PasswordModal";
import { useGlobalEncrypt } from "@theme-hope/composables/encrypt/useGlobalEncrypt";

export default defineComponent({
  name: "GlobalEncrypt",

  slots: Object as SlotsType<{
    default: RequiredSlot;
  }>,

  setup(_props, { slots }) {
    const { status, validate } = useGlobalEncrypt();

    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return (): VNode => {
      const { isEncrypted, isLocked, hint } = status.value;

      return h(MainFadeInUpTransition, () =>
        isEncrypted
          ? isMounted.value
            ? isLocked
              ? h(PasswordModal, {
                  full: true,
                  hint,
                  onVerify: validate,
                })
              : slots.default()
            : null
          : slots.default(),
      );
    };
  },
});
