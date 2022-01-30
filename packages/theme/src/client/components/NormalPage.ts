import { defineComponent, h, resolveComponent } from "vue";
import MarkdownContent from "./MarkdownContent";
import PageMeta from "./PageMeta";
import PageNav from "./PageNav";
import PageTitle from "./PageTitle";
import PasswordModal from "./PasswordModal";
import { usePathEncrypt } from "../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "NormalPage",

  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();

    return (): VNode =>
      h(
        "main",
        { class: "page" },
        isEncrypted.value
          ? h(PasswordModal, { page: true, onVerify: validateToken })
          : [
              slots.top?.(),
              h(PageTitle),
              h(MarkdownContent),
              h(PageMeta),
              h(PageNav),
              h(resolveComponent("PageComment")),
              slots.bottom?.(),
            ]
      );
  },
});
