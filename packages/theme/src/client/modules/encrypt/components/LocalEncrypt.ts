import { defineComponent, h, onMounted, ref } from "vue";

import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { usePathEncrypt } from "@theme-hope/modules/encrypt/composables/index";

import type { VNode } from "vue";

export default defineComponent({
  name: "LocalEncrypt",

  setup(_props, { slots }) {
    const { isEncrypted, validate } = usePathEncrypt();

    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return (): VNode | null =>
      isMounted.value
        ? isEncrypted.value
          ? h(PasswordModal, { full: true, onVerify: validate })
          : ((slots["default"]?.() || null) as VNode | null)
        : null;
  },
});
