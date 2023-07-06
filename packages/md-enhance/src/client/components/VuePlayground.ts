import type { Repl, ReplProps, ReplStore } from "@vue/repl";
import type { EditorComponentType } from "@vue/repl/codemirror-editor";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";
import { LoadingIcon, deepAssign } from "vuepress-shared/client";

import { useVuePlaygroundConfig } from "../helpers/index.js";
import { getVuePlaygroundSettings } from "../utils/index.js";

import "@vue/repl/style.css";
import "../styles/vue-playground.scss";

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
    const vuePlaygroundOptions = useVuePlaygroundConfig();
    const loading = ref(true);
    const component = shallowRef<typeof Repl>();
    const store = shallowRef<ReplStore>();
    const editor = shallowRef<EditorComponentType>();

    const playgroundOptions = computed(() =>
      deepAssign(
        {},
        vuePlaygroundOptions,
        getVuePlaygroundSettings(props.settings),
      ),
    );

    const setupRepl = async (): Promise<void> => {
      const [{ ReplStore, Repl }, { default: codeMirror }] = await Promise.all([
        import(/* webpackChunkName: "vue-repl" */ "@vue/repl"),
        import(
          /* webpackChunkName: "vue-repl" */ "@vue/repl/codemirror-editor"
        ),
      ]);

      component.value = Repl;
      editor.value = codeMirror;
      store.value = new ReplStore({
        serializedState: decodeURIComponent(props.files),
      });

      if (playgroundOptions.value.vueVersion)
        await store.value.setVueVersion(playgroundOptions.value.vueVersion);
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
        h(
          "div",
          {
            class: "repl-container",
          },
          [
            loading.value
              ? h(LoadingIcon, { class: "preview-loading", height: 192 })
              : null,
            component.value
              ? h(component.value, <ReplProps>{
                  editor: editor.value,
                  store: store.value,
                  autoResize: true,
                  ...playgroundOptions.value,
                  layout: "horizontal",
                })
              : null,
          ],
        ),
      ]),
    ];
  },
});
