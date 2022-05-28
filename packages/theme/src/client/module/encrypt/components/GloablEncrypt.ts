import { defineComponent, h } from "vue";

import PasswordModal from "@theme-hope/module/encrypt/components/PasswordModal";
import { useGlobalEcrypt } from "@theme-hope/module/encrypt/composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "GlobalEncrypt",

  setup(_props, { slots }) {
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEcrypt();

    return (): VNode | null =>
      isGlobalEncrypted.value
        ? h(PasswordModal, { full: true, onVerify: validateGlobalToken })
        : ((slots["default"]?.() || null) as VNode | null);
  },
});
