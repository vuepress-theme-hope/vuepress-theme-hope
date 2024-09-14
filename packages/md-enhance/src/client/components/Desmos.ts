import { decodeData } from "@vuepress/helper/client";
import type { VNode } from "vue";
import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  shallowRef,
  toValue,
} from "vue";
import "../styles/desmos.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Desmos",

  props: {
    /**
     * Desmos id
     *
     * 函数图像 id
     */
    id: { type: String, required: true },
    /**
     * Desmos code content
     *
     * 函数图像latex代码
     */
    code: { type: String, required: true },
  },

  setup(props) {
    const desmosContainer = shallowRef<HTMLElement>();
    let calculator: Desmos.Calculator;

    onMounted(async () => {
      // TODO: `desmos` is not official library
      // @ts-expect-error: Type is not accurate
      await import(/* webpackChunkName: "desmos" */ "desmos");
      const Desmos = window.Desmos;
      const config = undefined;
      // TODO: The string `$$` in `code` will be replaced to `,\n` when `mathjax: true`
      const code = decodeData(props.code);
      const expressions = new Array<Desmos.ExpressionState>();
      const regex = /\$(?!\$)(.*?)\$(?!\$)|\$\$(.*?)\$\$/g; // $y=x^2$ $$y=x^2$$
      let match;

      while ((match = regex.exec(code)) !== null) {
        const latex = match[1] || match[2];

        if (latex) expressions.push({ latex });
      }
      calculator = Desmos.GraphingCalculator(toValue(desmosContainer)!, config);
      expressions.forEach((expression) => {
        calculator.setExpression(expression);
      });
    });

    onUnmounted(() => {
      calculator?.destroy();
    });

    return (): (VNode | null)[] => [
      h("div", { class: "desmos-wrapper", id: props.id }, [
        h("div", {
          ref: desmosContainer,
          class: "desmos-container",
        }),
      ]),
    ];
  },
});
