import {
  LoadingIcon,
  decodeData,
  deepAssign,
  useDarkMode,
} from "@vuepress/helper/client";
import NoopComponent from "@vuepress/helper/noopComponent";
import type {
  SandpackFiles,
  SandpackOptions,
  SandpackPredefinedTemplate,
  SandpackSetup,
  SandpackThemeProp,
} from "sandpack-vue3";
import type { PropType, VNode } from "vue";
import { computed, defineAsyncComponent, defineComponent, h } from "vue";

import { useSandpackConfig } from "../helpers/index.js";

import "../styles/sandpack.scss";

const getSandpackFiles = (files: string): SandpackFiles =>
  JSON.parse(decodeData(files)) as SandpackFiles;

const getSandpackOptions = (options: string): SandpackOptions =>
  JSON.parse(decodeData(options)) as SandpackOptions;

const getSandpackCustomSetup = (customSetup: string): SandpackSetup =>
  JSON.parse(decodeData(customSetup)) as SandpackSetup;

const SandPackVue3 = defineAsyncComponent({
  loader: () =>
    __VUEPRESS_SSR__
      ? Promise.resolve(NoopComponent)
      : import("sandpack-vue3").then(({ Sandpack }) => Sandpack),
  loadingComponent: LoadingIcon,
});

export default defineComponent({
  name: "SandPack",

  props: {
    /**
     * Sandpack file data
     *
     * 演示文件数据
     */
    files: {
      type: String,
      required: true,
    },

    /**
     * Sandpack title
     *
     * 演示标题
     */
    title: String,

    /**
     * Sandpack template
     *
     * 演示工程模板
     */
    template: String as PropType<SandpackPredefinedTemplate | undefined>,

    /**
     * Sandpack options
     *
     * 演示设置
     */
    options: String,

    /**
     * Sandpack customSetup
     *
     * 自定义设置
     */
    customSetup: String,

    /**
     * Theme
     *
     * 主题
     */
    theme: String as PropType<SandpackThemeProp | undefined>,

    /**
     * RTL layout
     *
     * RTL 布局
     */
    rtl: Boolean,
  },

  setup(props) {
    const isDarkMode = useDarkMode();
    const sandpackConfig = useSandpackConfig();

    const options = computed(() =>
      deepAssign(
        {},
        sandpackConfig.options,
        getSandpackOptions(props.options ?? "{}"),
      ),
    );
    const template = computed(() => props.template ?? sandpackConfig.template);
    const theme = computed(
      () => props.theme ?? (isDarkMode.value ? "dark" : "light"),
    );
    const customSetup = computed(() =>
      deepAssign(
        {},
        sandpackConfig.customSetup,
        getSandpackCustomSetup(props.customSetup ?? "{}"),
      ),
    );

    return (): (VNode | null)[] => [
      h("div", { class: "vp-container sandpack-wrapper" }, [
        props.title
          ? h(
              "div",
              { class: "vp-container-header" },
              h(
                "div",
                { class: "vp-container-title" },
                decodeURIComponent(props.title),
              ),
            )
          : null,
        h(
          "div",
          { class: "sandpack-container" },
          h(SandPackVue3, {
            template: template.value,
            theme: theme.value,
            files: getSandpackFiles(props.files),
            options: options.value,
            customSetup: customSetup.value,
            rtl: props.rtl,
          }),
        ),
      ]),
    ];
  },
});
