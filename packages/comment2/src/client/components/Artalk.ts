import { usePageData, useSiteData } from "@vuepress/client";
import { type VNode, defineComponent, h, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { type ArtalkOptions } from "../../shared/index.js";

import "artalk/dist/Artalk.css";
import "../styles/artalk.scss";

declare const COMMENT_OPTIONS: ArtalkOptions;

const artalkOptions = COMMENT_OPTIONS;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Artalk",

  props: {
    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup: (props) => {
    const page = usePageData();
    const route = useRoute();
    const site = useSiteData();

    const artalkContainer = ref<HTMLDivElement>();

    onMounted(() => {
      void import(/* webpackChunkName: "artalk" */ "artalk").then(
        ({ default: _Artalk }) => {
          // FIXME: Typescript type issues
          const Artalk = _Artalk as unknown as typeof _Artalk.default;

          let artalk = new Artalk({
            site: site.value.title,
            ...artalkOptions,
            el: artalkContainer.value!,
            pageTitle: page.value.title,
            darkMode: props.darkmode,
            pageKey: route.path,
          });

          watch(
            () => props.darkmode,
            (value) => {
              artalk.setDarkMode(value);
            }
          );

          watch(
            () => route.path,
            (value) => {
              artalk = new Artalk({
                site: site.value.title,
                ...artalkOptions,
                el: artalkContainer.value!,
                darkMode: props.darkmode,
                pageTitle: page.value.title,
                pageKey: value,
              });
            }
          );
        }
      );
    });

    return (): VNode =>
      h("div", { class: "artalk-wrapper" }, h("div", { ref: artalkContainer }));
  },
});
