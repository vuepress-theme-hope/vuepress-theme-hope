import { useLocaleConfig } from "@vuepress/helper/client";
import { useDebounceFn, useEventListener } from "@vueuse/core";
import type { Chart } from "flowchart.ts";
import type { VNode } from "vue";
import { defineComponent, h, onMounted, ref, shallowRef, watch } from "vue";
import { flowchartPresets } from "vuepress-plugin-md-enhance/client";

import "./flowchart-playground.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const id = "flowchart-playground";
const DEFAULT_FLOWCHART = `\
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
`;

const locales = {
  "/": {
    config: "Flowchart Config",
    preset: "Flowchart Preset",
    result: "Render Result",
  },
  "/zh/": {
    config: "流程图配置",
    preset: "流程图预设",
    result: "渲染结果",
  },
};

export default defineComponent({
  name: "FlowChartPlayground",
  setup() {
    const locale = useLocaleConfig(locales);

    let flowchart: Chart | null = null;
    const element = shallowRef<HTMLDivElement>();
    const config = ref(DEFAULT_FLOWCHART);
    const preset = ref<"ant" | "pie" | "vue">("vue");
    const scale = ref(1);

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    onMounted(() => {
      let parseAction: ((input?: string | undefined) => Chart) | null = null;

      void Promise.all([
        import("flowchart.ts"),
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([{ parse }]) => {
        parseAction = parse;
        try {
          flowchart = parse(config.value);

          // Update scale
          scale.value = getScale(window.innerWidth);

          // draw svg to #id
          // @ts-ignore
          flowchart.draw(id, {
            ...flowchartPresets[preset.value],
            scale: scale.value,
          });
        } catch (err) {
          console.log(err);
        }
      });

      watch([config, preset], () => {
        if (parseAction)
          try {
            flowchart = parseAction(config.value);

            // Update scale
            scale.value = getScale(window.innerWidth);

            element.value!.innerHTML = "";

            // draw svg to #id
            // @ts-ignore
            flowchart.draw(id, {
              ...flowchartPresets[preset.value],
              scale: scale.value,
            });
          } catch (err) {
            console.log(err);
          }
      });

      useEventListener(
        "resize",
        useDebounceFn(() => {
          if (flowchart) {
            const newScale = getScale(window.innerWidth);

            if (scale.value !== newScale) {
              scale.value = newScale;

              // @ts-ignore
              flowchart.draw(id, {
                ...flowchartPresets[preset.value],
                scale: newScale,
              });
            }
          }
        }, 100),
      );
    });

    return (): VNode =>
      h("div", { class: "flowchart-playground" }, [
        h(
          "label",
          { for: "flowchart-playground-config" },
          `${locale.value.config}:`,
        ),
        h("textarea", {
          id: "flowchart-playground-config",
          value: config.value,
          onInput: ({ target }: InputEvent) => {
            config.value = (target as HTMLInputElement).value;
          },
        }),
        h("div", [
          h(
            "label",
            { for: "flowchart-playground-preset" },
            `${locale.value.preset}:`,
          ),
          h(
            "select",
            {
              id: "flowchart-playground-preset",
              value: preset.value,
              onChange: ({ target }: Event) => {
                preset.value = (target as HTMLSelectElement).value as
                  | "ant"
                  | "pie"
                  | "vue";
              },
            },
            ["ant", "pie", "vue"].map((preset) =>
              h("option", { value: preset }, preset),
            ),
          ),
        ]),
        h("label", { for: id }, `${locale.value.result}:`),
        h("div", {
          ref: element,
          class: ["flowchart-wrapper", preset.value],
          id,
        }),
      ]);
  },
});
