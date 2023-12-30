import { useMutationObserver } from "@vueuse/core";
import type {
  Sandpack,
  SandpackPredefinedTemplate,
  SandpackThemeProp,
} from "sandpack-vue3";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";
import { LoadingIcon, deepAssign } from "vuepress-shared/client";

import { useSandpackConfig } from "../helpers/index.js";
import {
  getDarkmodeStatus,
  getSandpackCustomSetup,
  getSandpackFiles,
  getSandpackOptions,
} from "../utils/index.js";

import "../styles/sandpack.scss";

export default defineComponent({
  name: "SandPack",

  props: {
    /**
     * Sandpack title
     *
     * 演示标题
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Sandpack template
     *
     * 演示工程模板
     */
    template: {
      type: String as PropType<SandpackPredefinedTemplate>,
      default: "",
    },

    /**
     * Sandpack file data
     *
     * 演示文件数据
     */
    files: { type: String, required: true },

    /**
     * Sandpack options
     *
     * 演示设置
     */
    options: { type: String, default: "{}" },

    /**
     * Sandpack customSetup
     *
     * 自定义设置
     */
    customSetup: { type: String, default: "{}" },

    /**
     * Theme
     *
     * 主题
     */
    theme: {
      type: String as PropType<SandpackThemeProp>,
      default: "",
    },

    /**
     * RTL layout
     *
     * RTL 布局
     */
    rtl: Boolean,
  },

  setup(props) {
    const sandpackConfig = useSandpackConfig();

    const isDarkmode = ref(false);
    const component = shallowRef<typeof Sandpack>();

    const options = computed(() =>
      deepAssign({}, sandpackConfig.options, getSandpackOptions(props.options)),
    );
    const template = computed(() => props.template || sandpackConfig.template);
    const theme = computed(() =>
      props.theme || isDarkmode.value ? "dark" : "light",
    );
    const customSetup = computed(() =>
      deepAssign(
        {},
        sandpackConfig.customSetup,
        getSandpackCustomSetup(props.customSetup),
      ),
    );

    const setupSandpack = (): Promise<void> =>
      import(/* webpackChunkName: "sandpack-vue3" */ "sandpack-vue3").then(
        ({ Sandpack }) => {
          component.value = Sandpack;
        },
      );

    onMounted(() => {
      void setupSandpack();

      isDarkmode.value = getDarkmodeStatus();

      // watch darkmode change
      useMutationObserver(
        document.documentElement,
        () => {
          isDarkmode.value = getDarkmodeStatus();
        },
        {
          attributeFilter: ["class", "data-theme"],
          attributes: true,
        },
      );
    });

    return (): (VNode | null)[] => [
      h("div", { class: "sandpack-wrapper" }, [
        props.title
          ? h("div", { class: "header" }, decodeURIComponent(props.title))
          : null,
        h(
          "div",
          { class: "sandpack-container" },
          component.value
            ? h(component.value, {
                template: template.value,
                theme: theme.value,
                files: getSandpackFiles(props.files),
                options: options.value,
                customSetup: customSetup.value,
                rtl: props.rtl,
              })
            : h(LoadingIcon, { class: "preview-loading", height: 192 }),
        ),
      ]),
    ];
  },
});
