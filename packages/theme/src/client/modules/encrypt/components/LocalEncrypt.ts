import { defineComponent, h } from "vue";

import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal.js";
import { usePathEncrypt } from "@theme-hope/modules/encrypt/composables/index.js";

import type { VNode } from "vue";

export default defineComponent({
  name: "LocalEncrypt",

  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();

    return (): VNode | null =>
      isEncrypted.value
        ? h(PasswordModal, { full: true, onVerify: validateToken })
        : ((slots["default"]?.() || null) as VNode | null);
  },
});
