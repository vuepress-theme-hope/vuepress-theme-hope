import { defineComponent, h, onMounted, ref } from "vue";

import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { useGlobalEncrypt } from "@theme-hope/modules/encrypt/composables/index";

import type { VNode } from "vue";

export default defineComponent({
  name: "GlobalEncrypt",

  setup(_props, { slots }) {
    const { isEncrypted, validate } = useGlobalEncrypt();

    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return (): VNode =>
      h(FadeSlideY, () =>
        isMounted.value
          ? isEncrypted.value
            ? h(PasswordModal, { full: true, onVerify: validate })
            : slots["default"]?.()
          : null
      );
  },
});
