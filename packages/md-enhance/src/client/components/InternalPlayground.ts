import { ReplStore, Repl } from "@vue/repl";
import { defineComponent, h, onMounted, ref, reactive } from "vue";

import { LOADING_SVG, CODE_SVG } from "./icons";
import { useExternalPlayground } from "../composables";
import { parsePlaygroundSettings } from "../utils";

import type { ReplProps } from "@vue/repl";
import type { VNode } from "vue";

import "@vue/repl/style.css";
import "../styles/playground.scss";

export default defineComponent({
  name: "InternalPlayground",

  props: {
    id: { type: String, required: true },
    config: { type: String, required: true },
    title: { type: String, default: "" },
    settings: { type: String, default: "{}" },
  },

  setup(props) {
    const playgroundContainer = ref<HTMLElement | null>(null);

    const loading = ref(true);

    const playgroundOptions = parsePlaygroundSettings(props.settings);
    const playgroundInternalOptions = playgroundOptions.internal || {};
    const showCode = ref(playgroundInternalOptions.showCode || false);

    const { encoded } = useExternalPlayground(
      props.config,
      playgroundOptions.external || {}
    );

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
      sfcOptions: playgroundInternalOptions.sfcOptions || {},
      layout: playgroundInternalOptions.layout || "vertical",
      ssr: playgroundInternalOptions.ssr || false,
    });

    const setupRepl = async (): Promise<void> => {
      if (!replProps.store) replProps.store = replStore.value;

      if (playgroundInternalOptions.vueVersion)
        await replStore.value.setVueVersion(
          playgroundInternalOptions.vueVersion
        );
    };

    onMounted(async () => {
      await setupRepl();
      loading.value = false;
    });

    return (): (VNode | null)[] => [
      h(
        "div",
        {
          ref: playgroundContainer,
          class: "playground-container internal",
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
                  class: "op-btn code",
                  href: "javascript:;",
                  innerHTML: CODE_SVG,
                  onclick: () => (showCode.value = !showCode.value),
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
