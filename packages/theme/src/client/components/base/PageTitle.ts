import type { VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";

import PageInfo from "@theme-hope/components/info/PageInfo";
import { useData } from "@theme-hope/composables/useData";
import { usePageInfo } from "@theme-hope/composables/usePageInfo";

import "../../styles/base/page-title.scss";

export default defineComponent({
  name: "PageTitle",

  setup() {
    const { frontmatter, page, themeLocale } = useData();
    const { info, items } = usePageInfo();

    return (): VNode =>
      h("div", { class: "vp-page-title" }, [
        h("h1", [
          themeLocale.value.titleIcon === false
            ? null
            : h(resolveComponent("VPIcon"), { icon: frontmatter.value.icon }),
          page.value.title,
        ]),
        h(PageInfo, {
          info: info.value,
          items: items.value,
        }),
        h("hr"),
      ]);
  },
});
