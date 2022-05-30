import { defineComponent, h } from "vue";

import PasswordModal from "@theme-hope/module/encrypt/components/PasswordModal";
import { usePathEncrypt } from "@theme-hope/module/encrypt/composables";

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
