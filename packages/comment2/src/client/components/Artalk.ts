import { usePageData, useSiteData } from "@vuepress/client";
import type Artalk from "artalk";
import {
  type VNode,
  defineComponent,
  h,
  nextTick,
  onMounted,
  shallowRef,
  watch,
} from "vue";
import { isString } from "vuepress-shared/client";

import { useArtalkOptions } from "../helpers/index.js";

import "artalk/dist/Artalk.css";
import "../styles/artalk.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Artalk",

  props: {
    /**
     * The path of the comment
     */
    identifier: {
      type: String,
      required: true,
    },

    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup: (props) => {
    const artalkOptions = useArtalkOptions();
    const page = usePageData();
    const site = useSiteData();

    const artalkContainer = shallowRef<HTMLDivElement>();

    let artalk: Artalk.default | null = null;

    const enableArtalk = isString(artalkOptions.server);

    const initArtalk = async (): Promise<void> => {
      await Promise.all([
        import(/* webpackChunkName: "artalk" */ "artalk"),
        new Promise<void>((resolve) => {
          setTimeout(() => {
            void nextTick().then(resolve);
          }, artalkOptions.delay || 800);
        }),
      ]).then(([{ default: _Artalk }]) => {
        // FIXME: Typescript type issues
        const Artalk = _Artalk as unknown as typeof _Artalk.default;

        try {
          artalk = new Artalk({
            useBackendConf: false,
            site: site.value.title,
            pageTitle: page.value.title,
            ...artalkOptions,
            el: artalkContainer.value!,
            pageKey: props.identifier,
            darkMode: props.darkmode,
          });

          if (artalkOptions.useBackendConf)
            artalk.on("conf-loaded", () => {
              artalk!.setDarkMode(props.darkmode);
            });
        } catch (err) {
          // FIXME: Not sure what the issue is, relevant issue:
          // https://github.com/vuepress/vuepress-next/issues/1249
          // https://github.com/ArtalkJS/Artalk/discussions/367
        }
      });
    };

    onMounted(() => {
      watch(
        () => page.value.path,
        async () => {
          try {
            artalk?.destroy();
          } catch (err) {
            // do nothing
          }
          await initArtalk();
        },
        { immediate: true }
      );

      watch(
        () => props.darkmode,
        (value) => {
          artalk?.setDarkMode(value);
        }
      );
    });

    return (): VNode | null =>
      enableArtalk
        ? h(
            "div",
            { class: "artalk-wrapper" },
            h("div", { ref: artalkContainer })
          )
        : null;
  },
});
