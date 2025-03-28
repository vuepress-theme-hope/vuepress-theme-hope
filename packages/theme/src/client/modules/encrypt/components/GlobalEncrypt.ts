import type { SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";
import { RenderDefault } from "vuepress-shared/client";

import { FadeInUpTransition } from "@theme-hope/components/transitions/index";
import { usePure } from "@theme-hope/composables/index";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { useGlobalEncrypt } from "@theme-hope/modules/encrypt/composables/index";

export default defineComponent({
  name: "GlobalEncrypt",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { status, validate } = useGlobalEncrypt();
    const isPure = usePure();

    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return (): VNode => {
      const { isEncrypted, isLocked, hint } = status.value;

      return h(isPure.value ? RenderDefault : FadeInUpTransition, () =>
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
