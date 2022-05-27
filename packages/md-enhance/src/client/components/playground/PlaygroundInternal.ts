import { defineComponent, h, onMounted, ref, reactive } from "vue";
import type { VNode } from "vue";

import type { ReplProps } from "@vue/repl";
import { ReplStore, Repl } from "@vue/repl";

import "@vue/repl/style.css";
import "../../styles/playground.scss";
import { LOADING_SVG, CODE_SVG } from "../icons";
import { usePlaygroundExternal } from "../../composables/playground";
import { parsePlaygroundSettings } from "../../utils/playground";

export default defineComponent({
  name: "PlaygroundInternal",

  props: {
    title: { type: String, default: "" },
    config: { type: String, required: true },
    settings: { type: String, default: "{}" },
    id: { type: String, required: true },
  },

  setup(props) {
    const playgroundContainer = ref<HTMLElement | null>(null);

    const showCode = ref(false);
    const loading = ref<boolean>(true);

    const playgroundOptions = parsePlaygroundSettings(props.settings);
    const playgroundInternalOptions = playgroundOptions.internal || {};

    const { encoded } = usePlaygroundExternal(
      props.config,
      playgroundOptions.external || {}
    );

    const toggleCode = () => {
      showCode.value = !showCode.value;
    };

    const hideLoading = () => {
      loading.value = false;
    };

    const replStore = ref<ReplStore>(
      new ReplStore({
        serializedState: encoded,
        showOutput: true,
      })
    );
    const replProps: ReplProps = reactive({
      store: replStore,
      autoResize: playgroundInternalOptions.autoResize || true,
      showCompileOutput: playgroundInternalOptions.showCompileOutput || false,
      showImportMap: playgroundInternalOptions.showImportMap || true,
      clearConsole: playgroundInternalOptions.clearConsole || false,
      sfcOptions: playgroundInternalOptions.sfcOptions,
      layout: playgroundInternalOptions.layout || "vertical",
      ssr: playgroundInternalOptions.ssr || false,
    });

    const setupRepl = async () => {
      if (!replProps.store) {
        replProps.store = replStore.value;
      }

      if (playgroundInternalOptions.vueVersion) {
        await replStore.value.setVueVersion(
          playgroundInternalOptions.vueVersion
        );
      }
    };

    onMounted(async () => {
      await setupRepl();
      hideLoading();
    });

    return (): (VNode | null)[] => [
      h(
        "div",
        {
          ref: playgroundContainer,
          class: "playground-container",
          id: props.id,
        },
        [
          h(
            "div",
            {
              class: "title-container",
            },
            [
              props.title
                ? h(
                    "div",
                    { class: "playground-title" },
                    decodeURIComponent(props.title)
                  )
                : null,
              h("div", { class: "op-btns" }, [
                h("a", {
                  class: "op-btn",
                  href: "javascript:;",
                  innerHTML: CODE_SVG,
                  onclick: () => toggleCode(),
                }),
              ]),
            ]
          ),
          h(
            "div",
            {
              class: `preview-container repl-container ${
                showCode.value ? "show-code" : "hide-code"
              }`,
            },
            [
              loading.value
                ? h("div", {
                    class: ["preview-loading-wrapper"],
                    innerHTML: LOADING_SVG,
                  })
                : null,
              h(Repl, replProps),
            ]
          ),
        ]
      ),
    ];
  },
});
