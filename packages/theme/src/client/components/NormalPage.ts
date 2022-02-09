import { defineComponent, h, resolveComponent } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import PageAnchor from "@theme-hope/components/PageAnchor";
import PageMeta from "@theme-hope/components/PageMeta";
import PageNav from "@theme-hope/components/PageNav";
import PageTitle from "@theme-hope/components/PageTitle";
import PasswordModal from "@theme-hope/module/encrypt/components/PasswordModal";
import { usePathEncrypt } from "@theme-hope/module/encrypt/composables";

import type { VNode } from "vue";

import "../styles/page.scss";

export default defineComponent({
  name: "NormalPage",

  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();

    return (): VNode =>
      h(
        "main",
        { class: "page", id: "main-content" },
        isEncrypted.value
          ? h(PasswordModal, { onVerify: validateToken })
          : [
              slots.top?.(),
              h(PageTitle),
              h(PageAnchor),
              h(MarkdownContent),
              h(PageMeta),
              h(PageNav),
              h(resolveComponent("PageComment")),
              slots.bottom?.(),
            ]
      );
  },
});
