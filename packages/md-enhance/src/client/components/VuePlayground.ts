import { ReplStore, Repl } from "@vue/repl";
import { computed, defineComponent, h, onMounted, ref } from "vue";

import { LOADING_SVG, CODE_SVG } from "./icons.js";
import { getVuePlaygroundSettings } from "../utils/index.js";

import type { ReplProps } from "@vue/repl";
import type { VNode } from "vue";

import "@vue/repl/style.css";
import "../styles/vue-playground.scss";

export default defineComponent({
  name: "VuePlayground",

  props: {
    title: { type: String, default: "" },
    files: { type: String, required: true },
    settings: { type: String, default: "{}" },
  },

  setup(props) {
    const loading = ref(true);
    const store = new ReplStore({
      serializedState: decodeURIComponent(props.files),
      showOutput: true,
    });

    const playgroundOptions = computed(() =>
      getVuePlaygroundSettings(props.settings)
    );

    const showCode = ref(playgroundOptions.value.showCode || false);

    const setupRepl = async (): Promise<void> => {
      if (playgroundOptions.value.vueVersion)
        await store.setVueVersion(playgroundOptions.value.vueVersion);
    };

    onMounted(async () => {
      await setupRepl();
      loading.value = false;
    });

    return (): (VNode | null)[] => [
      h("div", { class: "vue-playground-wrapper" }, [
        h("div", { class: "title-wrapper" }, [
          props.title
            ? h("div", { class: "title" }, decodeURIComponent(props.title))
            : null,
          h("div", { class: "actions" }, [
            h("action", {
              class: "button",
              innerHTML: CODE_SVG,
              onClick: () => {
                showCode.value = !showCode.value;
              },
            }),
          ]),
        ]),
        h(
          "div",
          {
            class: [
              "repl-container",
              showCode.value ? "show-code" : "hide-code",
            ],
          },
          [
            loading.value
              ? h("div", {
                  class: ["preview-loading-wrapper"],
                  innerHTML: LOADING_SVG,
                })
              : null,
            h(Repl, <ReplProps>{
              store,
              ...playgroundOptions.value,
            }),
          ]
        ),
      ]),
    ];
  },
});
