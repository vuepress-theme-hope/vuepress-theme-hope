import { isString } from "@vuepress/helper/client";
import type Artalk from "artalk";
import type { VNode } from "vue";
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { usePageData, useSiteData } from "vuepress/client";
import { LoadingIcon } from "vuepress-shared/client";

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

  setup(props) {
    const artalkOptions = useArtalkOptions();
    const page = usePageData();
    const site = useSiteData();

    const loaded = ref(false);
    const artalkContainer = shallowRef<HTMLDivElement>();

    let artalk: Artalk | null = null;

    const enableArtalk = isString(artalkOptions.server);

    const initArtalk = async (): Promise<void> => {
      const [{ default: Artalk }] = await Promise.all([
        import(/* webpackChunkName: "artalk" */ "artalk/dist/Artalk.mjs"),
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, artalkOptions.delay || 800);
        }),
      ]);

      loaded.value = true;
      await nextTick();

      artalk = Artalk.init({
        useBackendConf: false,
        site: site.value.title,
        pageTitle: page.value.title,
        ...artalkOptions,
        el: artalkContainer.value!,
        pageKey: props.identifier,
        darkMode: props.darkmode,
      });

      if (artalkOptions.useBackendConf)
        artalk.on("mounted", () => {
          artalk!.setDarkMode(props.darkmode);
        });
    };

    const updateArtalk = (): void => {
      artalk!.update({
        site: site.value.title,
        pageTitle: page.value.title,
        pageKey: props.identifier,
      });
      artalk!.reload();
    };

    onMounted(() => {
      void initArtalk();

      watch(
        () => props.identifier,
        () => {
          if (artalk) void nextTick().then(() => updateArtalk());
        },
      );

      watch(
        () => props.darkmode,
        (value) => {
          artalk?.setDarkMode(value);
        },
      );
    });

    onUnmounted(() => {
      artalk?.destroy();
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
