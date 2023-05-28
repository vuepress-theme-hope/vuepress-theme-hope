import katex from "katex";
import { type VNode, defineComponent, h, ref, watch } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import "katex/dist/katex.css";
import "./katex-playground.scss";

const locales = {
  "/": {
    input: "Input",
    output: "Output",
  },
  "/zh/": {
    input: "输入",
    output: "输出",
  },
};

export default defineComponent({
  name: "KatexPlayground",

  setup() {
    const locale = useLocaleConfig(locales);
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
        result.value = (<Error>err).toString();
        inError.value = true;
      }
    };

    watch(input, katexRender, { immediate: true });

    return (): VNode =>
      h("div", { class: "katex-playground" }, [
        h("h3", locale.value.input),
        h("textarea", {
          name: "katex-playground",
          id: "katex-playground",
          cols: "30",
          rows: "10",
          placeholder: "Input your tex here",
          value: input.value,
          onInput: ({ target }: InputEvent) => {
            input.value = (<HTMLInputElement>target).value;
          },
        }),
        h("h3", locale.value.output),
        h("p", {
          class: ["katex-block", { "katex-error": inError.value }],
          innerHTML: result.value || "Here will be the render result",
        }),
      ]);
  },
});
