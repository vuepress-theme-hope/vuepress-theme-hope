import type { SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";
import { RenderDefault } from "vuepress-shared/client";

import { FadeSlideY } from "@theme-hope/components/transitions/index";
import { usePure } from "@theme-hope/composables/index";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { useGlobalEncrypt } from "@theme-hope/modules/encrypt/composables/index";

export default defineComponent({
  name: "GlobalEncrypt",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { isDecrypted, isEncrypted, validate } = useGlobalEncrypt();
    const isPure = usePure();

    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return (): VNode =>
      h(isPure.value ? RenderDefault : FadeSlideY, () =>
        isEncrypted.value
          ? isMounted.value
            ? isDecrypted.value
              ? slots.default()
              : h(PasswordModal, { full: true, onVerify: validate })
            : null
          : slots.default(),
      );
  },
});
