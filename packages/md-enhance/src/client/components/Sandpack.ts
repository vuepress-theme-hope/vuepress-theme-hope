import type { Sandpack, SandpackPredefinedTemplate } from "sandpack-vue3";
// import { Sandpack } from "sandpack-vue3";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";
import { LoadingIcon, deepAssign } from "vuepress-shared/client";

import { useSandpackConfig } from "../helpers/index.js";
import {
  getSandpackCustomSetup,
  getSandpackFiles,
  getSandpackOptions,
} from "../utils/index.js";

import "../styles/sandpack.scss";

export default defineComponent({
  name: "MdSandpack",

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
      type: String,
      default: null,
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
  },

  setup(props) {
    const sandpackConfig = useSandpackConfig();
    const loading = ref(true);
    const component = shallowRef<typeof Sandpack>();

    const template = computed(() =>
      <SandpackPredefinedTemplate>props.template
        ? props.template
        : sandpackConfig.template,
    );

    const sandpackOptions = computed(() =>
      deepAssign({}, sandpackConfig.options, getSandpackOptions(props.options)),
    );

    const sandpacCustomSetup = computed(() =>
      deepAssign(
        {},
        sandpackConfig.customSetup,
        getSandpackCustomSetup(props.customSetup),
      ),
    );

    const setupSandpack = async (): Promise<void> => {
      const [{ Sandpack }] = await Promise.all([
        import(/* webpackChunkName: "sandpack-vue3" */ "sandpack-vue3"),
      ]);

      component.value = Sandpack;
    };

    onMounted(async () => {
      await setupSandpack();
      loading.value = false;
    });

    return (): (VNode | null)[] => [
      h("div", { class: "sandpack-wrapper" }, [
        props.title
          ? h("div", { class: "header" }, decodeURIComponent(props.title))
          : null,
        h(
          "div",
          {
            class: "sandpack-container",
          },
          [
            loading.value
              ? h(LoadingIcon, { class: "preview-loading", height: 192 })
              : null,
            component.value
              ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                h(component.value, {
                  template: template.value,
                  files: getSandpackFiles(props.files),
                  options: {
                    ...sandpackOptions.value,
                  },
                  customSetup: {
                    ...sandpacCustomSetup.value,
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)
              : null,
          ],
        ),
      ]),
    ];
  },
});
