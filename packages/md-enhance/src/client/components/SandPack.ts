import { decodeData, deepAssign } from "@vuepress/helper/client";
import { useMutationObserver } from "@vueuse/core";
import type {
  SandpackFiles,
  SandpackOptions,
  SandpackPredefinedTemplate,
  SandpackSetup,
  SandpackThemeProp,
} from "sandpack-vue3";
import { Sandpack } from "sandpack-vue3";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref } from "vue";

import { useSandpackConfig } from "../helpers/index.js";
import { getDarkmodeStatus } from "../utils/index.js";

import "../styles/sandpack.scss";

const getSandpackFiles = (files: string): SandpackFiles =>
  JSON.parse(decodeData(files)) as SandpackFiles;

const getSandpackOptions = (options: string): SandpackOptions =>
  JSON.parse(decodeData(options)) as SandpackOptions;

const getSandpackCustomSetup = (customSetup: string): SandpackSetup =>
  JSON.parse(decodeData(customSetup)) as SandpackSetup;

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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const template = computed(() => props.template || sandpackConfig.template);
    const theme = computed(() =>
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
