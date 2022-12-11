import { defineComponent, h } from "vue";

import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo.js";
import InfoList from "@theme-hope/modules/blog/components/InfoList.js";
import CommonWrapper from "@theme-hope/components/CommonWrapper.js";
import SkipLink from "@theme-hope/components/SkipLink.js";
import { useMobile } from "@theme-hope/composables/index.js";

import type { VNode } from "vue";

import "../styles/page.scss";

export default defineComponent({
  name: "BlogCommon",

  setup(_props, { slots }) {
    const isMobile = useMobile();

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        { noSidebar: true },
        {
          default: () => slots["default"]?.(),
          navScreenBottom: () => h(BloggerInfo),
          ...(isMobile.value ? { sidebar: () => h(InfoList) } : {}),
        }
      ),
    ];
  },
});
