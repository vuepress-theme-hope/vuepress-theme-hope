import { defineComponent, h } from "vue";

import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal.js";
import { useGlobalEncrypt } from "@theme-hope/modules/encrypt/composables/index.js";

import type { VNode } from "vue";

export default defineComponent({
  name: "GlobalEncrypt",

  setup(_props, { slots }) {
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEncrypt();

    return (): VNode | null =>
      isGlobalEncrypted.value
        ? h(PasswordModal, { full: true, onVerify: validateGlobalToken })
        : ((slots["default"]?.() || null) as VNode | null);
  },
});
