import { type Repl, type ReplProps, type ReplStore } from "@vue/repl";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
} from "vue";
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

    const playgroundOptions = computed(() =>
      deepAssign(
        {},
        vuePlaygroundOptions,
        getVuePlaygroundSettings(props.settings)
      )
    );

    const setupRepl = async (): Promise<void> => {
      const { ReplStore, Repl } = await import(
        /* webpackChunkName: "vue-repl" */ "@vue/repl"
      );

      component.value = Repl;
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
                  store: store.value,
                  autoResize: true,
                  ...playgroundOptions.value,
                  layout: "horizontal",
                })
              : null,
          ]
        ),
      ]),
    ];
  },
});
