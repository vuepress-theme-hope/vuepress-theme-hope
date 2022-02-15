import katex from "katex";
import { defineComponent, h, ref, watch } from "vue";

import type { VNode } from "vue";

import "./katex-playground.scss";
export default defineComponent({
  name: "KatexPlayground",

  setup() {
    const input =
      ref(`\\frac {\\partial^r} {\\partial \\omega^r} \\left(\\frac {y^{\\omega}} {\\omega}\\right)
= \\left(\\frac {y^{\\omega}} {\\omega}\\right) \\left\\{(\\log y)^r + \\sum_{i=1}^r \\frac {(-1)^ Ir \\cdots (r-i+1) (\\log y)^{ri}} {\\omega^i} \\right\\}`);

    const result = ref("");
    const inError = ref(false);

    const katexRender = () => {
      try {
        result.value = katex.renderToString(input.value, {
          displayMode: true,
          throwOnError: true,
        });
        inError.value = false;
      } catch (err) {
        result.value = err.toString();
        inError.value = true;
      }
    };

    watch(input, katexRender, { immediate: true });

    return (): VNode =>
      h("div", { class: "katex-playground" }, [
        h("textarea", {
          name: "katex-playground",
          id: "katex-playground",
          cols: "30",
          rows: "10",
          placeholder: "Input your tex here",
          value: input.value,
          onInput: ({ target }: InputEvent) => {
            input.value = (target as HTMLInputElement).value;
          },
        }),
        h("p", {
          class: ["katex-block", { "katex-error": inError.value }],
          innerHTML: result.value || "Here will be the render result",
        }),
      ]);
  },
});
