import { usePageData, useSiteData } from "@vuepress/client";
import type Artalk from "artalk";
import type { VNode } from "vue";
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { LoadingIcon, isString } from "vuepress-shared/client";

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

    const loaded = ref(false);
    const artalkContainer = shallowRef<HTMLDivElement>();

    let artalk: Artalk.default | null = null;

    const enableArtalk = isString(artalkOptions.server);

    const initArtalk = async (): Promise<void> => {
      const [{ default: _Artalk }] = await Promise.all([
        import(/* webpackChunkName: "artalk" */ "artalk/dist/Artalk.es.js"),
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, artalkOptions.delay || 800);
        }),
      ]);

      // FIXME: Types issue
      const Artalk = _Artalk as unknown as typeof _Artalk.default;

      loaded.value = true;
      await nextTick();

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
    };

    onMounted(() => {
      watch(
        () => props.identifier,
        async () => {
          try {
            artalk?.destroy();
          } catch (err) {
            // do nothing
          }
          await initArtalk();
        },
        { immediate: true },
      );

      watch(
        () => props.darkmode,
        (value) => {
          artalk?.setDarkMode(value);
        },
      );
    });

    return (): VNode | null =>
      enableArtalk
        ? h("div", { class: "artalk-wrapper" }, [
            loaded.value ? null : h(LoadingIcon),
            h("div", { ref: artalkContainer }),
          ])
        : null;
  },
});
