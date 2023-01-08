import { defineComponent, h } from "vue";

import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { usePathEncrypt } from "@theme-hope/modules/encrypt/composables/index";

import type { VNode } from "vue";

export default defineComponent({
  name: "LocalEncrypt",

  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();

    return (): VNode =>
      h(FadeSlideY, () =>
        isEncrypted.value
          ? h(
              "main",
              { class: "page", id: "main-content" },
              h(PasswordModal, {
                full: true,
                onVerify: validateToken,
              })
            )
          : slots["default"]?.() || null
      );
  },
});
