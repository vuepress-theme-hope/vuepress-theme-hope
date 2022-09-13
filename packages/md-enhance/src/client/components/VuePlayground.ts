import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";

import { LOADING_SVG, CODE_SVG } from "./icons.js";
import { getVuePlaygroundSettings } from "../utils/index.js";

import type { Repl, ReplProps, ReplStore } from "@vue/repl";
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
    const component = shallowRef<typeof Repl | null>(null);
    const store = ref<ReplStore | null>(null);

    const playgroundOptions = computed(() =>
      getVuePlaygroundSettings(props.settings)
    );

    const showCode = ref(playgroundOptions.value.showCode || false);

    const setupRepl = async (): Promise<void> => {
      const { ReplStore, Repl } = await import("@vue/repl");

      component.value = Repl;
      store.value = new ReplStore({
        serializedState: decodeURIComponent(props.files),
        showOutput: true,
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
            component.value
              ? h(component.value, <ReplProps>{
                  store: store.value,
                  ...playgroundOptions.value,
                })
              : null,
          ]
        ),
      ]),
    ];
  },
});
