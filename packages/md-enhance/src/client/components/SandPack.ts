import { deepAssign } from "@vuepress/helper/client";
import { useMutationObserver } from "@vueuse/core";
import type {
  SandpackPredefinedTemplate,
  SandpackThemeProp,
} from "sandpack-vue3";
import { Sandpack } from "sandpack-vue3";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref } from "vue";

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

    onMounted(() => {
      isDarkmode.value = getDarkmodeStatus();

      // Watch darkmode change
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
          h(Sandpack, {
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
