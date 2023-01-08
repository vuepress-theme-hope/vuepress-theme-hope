import { defineComponent, h } from "vue";

import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { useGlobalEncrypt } from "@theme-hope/modules/encrypt/composables/index";

import type { VNode } from "vue";

export default defineComponent({
  name: "GlobalEncrypt",

  setup(_props, { slots }) {
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEncrypt();

    return (): VNode =>
      h(FadeSlideY, () =>
        isGlobalEncrypted.value
          ? h(PasswordModal, { full: true, onVerify: validateGlobalToken })
          : slots["default"]?.()
      );
  },
});
