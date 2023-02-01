import { usePageData, useSiteData } from "@vuepress/client";
import Artalk from "artalk";

import { type VNode, defineComponent, h, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { type ArtalkOptions } from "../../shared/index.js";

import "artalk/dist/Artalk.css";

declare const COMMENT_OPTIONS: ArtalkOptions;

const artalkOptions = COMMENT_OPTIONS;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Artalk",

  setup: () => {
    const artalkContainer = ref<HTMLDivElement>();

    const page = usePageData();
    const route = useRoute();
    const site = useSiteData();

    onMounted(() => {
      // FIXME: Typescript type issues
      new (Artalk as unknown as typeof Artalk.default)({
        pageTitle: page.value.title,
        pageKey: route.path,
        site: site.value.title,
        ...artalkOptions,
        el: artalkContainer.value!,
      });
    });

    return (): VNode => h("div", { ref: artalkContainer, id: "artalk" });
  },
});
