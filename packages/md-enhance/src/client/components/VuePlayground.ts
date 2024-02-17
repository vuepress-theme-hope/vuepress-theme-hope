import type { Repl, ReplProps, Store } from "@vue/repl";
import { deepAssign } from "@vuepress/helper/client";
import type { Component, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
  version,
} from "vue";
import { LoadingIcon } from "vuepress-shared/client";

import { useVuePlaygroundConfig } from "../helpers/index.js";
import { getVuePlaygroundSettings } from "../utils/index.js";

import "@vue/repl/style.css";
import "../styles/vue-playground.scss";

declare const VUE_PLAYGROUND_MONACO: boolean;

export default defineComponent({
  name: "VuePlayground",

  props: {
    /**
     * Playground title
     *
     * 演示标题
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Playground file data
     *
     * 演示文件数据
     */
    files: { type: String, required: true },

    /**
     * Playground settings
     *
     * 演示设置
     */
    settings: { type: String, default: "{}" },
  },

  setup(props) {
    const {
      vueVersion = version,
      vueRuntimeDevUrl = `https://unpkg.com/@vue/runtime-dom@${vueVersion}/dist/runtime-dom.esm-browser.js`,
      vueRuntimeProdUrl = `https://unpkg.com/@vue/runtime-dom@${vueVersion}/dist/runtime-dom.esm-browser.prod.js`,
      vueServerRendererUrl = `https://unpkg.com/@vue/server-renderer@${vueVersion}/dist/server-renderer.esm-browser.js`,
      ...vuePlaygroundOptions
    } = useVuePlaygroundConfig();
    const loading = ref(true);
    const component = shallowRef<typeof Repl>();
    const store = shallowRef<Store>();
    const editor = shallowRef<Component>();

    const playgroundOptions = computed(() =>
      deepAssign(
        {},
        vuePlaygroundOptions,
        getVuePlaygroundSettings(props.settings),
      ),
    );

    const setupRepl = async (): Promise<void> => {
      const [
        { useStore, useVueImportMap, Repl },
        { default: editorComponent },
      ] = await Promise.all([
        import(/* webpackChunkName: "vue-repl" */ "@vue/repl"),
        VUE_PLAYGROUND_MONACO
          ? import(/* webpackChunkName: "vue-repl" */ "@vue/repl/monaco-editor")
          : import(
              /* webpackChunkName: "vue-repl" */ "@vue/repl/codemirror-editor"
            ),
      ]);

      component.value = Repl;
      editor.value = editorComponent;

      const { importMap, vueVersion } = useVueImportMap({
        runtimeDev: vueRuntimeDevUrl,
        runtimeProd: vueRuntimeProdUrl,
        serverRenderer: vueServerRendererUrl,
      });

      store.value = useStore(
        { builtinImportMap: importMap, vueVersion },
        decodeURIComponent(props.files),
      );
    };

    onMounted(async () => {
      await setupRepl();
      loading.value = false;
    });

    return (): (VNode | null)[] => [
      h("div", { class: "vue-playground-wrapper" }, [
        props.title
          ? h("div", { class: "header" }, decodeURIComponent(props.title))
          : null,
        h("div", { class: "repl-container" }, [
          loading.value
            ? h(LoadingIcon, { class: "preview-loading", height: 192 })
            : null,
          component.value
            ? h(component.value, <ReplProps>{
                ...playgroundOptions.value,
                editor: editor.value,
                store: store.value,
              })
            : null,
        ]),
      ]),
    ];
  },
});
