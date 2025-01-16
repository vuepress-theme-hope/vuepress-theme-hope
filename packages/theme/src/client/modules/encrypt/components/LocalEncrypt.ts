import type { SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";

import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { usePathEncrypt } from "@theme-hope/modules/encrypt/composables/index";

export default defineComponent({
  name: "LocalEncrypt",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { status, validate } = usePathEncrypt();

    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return (): VNode[] | VNode | null => {
      const { isEncrypted, isLocked, hint } = status.value;

      return isEncrypted
        ? isMounted.value
          ? isLocked
            ? h(PasswordModal, {
                showTitle: true,
                full: true,
                hint,
                onVerify: validate,
              })
            : slots.default()
          : null
        : slots.default();
    };
  },
});
