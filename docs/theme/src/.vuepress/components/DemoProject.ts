import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import { useLocaleConfig } from "vuepress-shared/client";
import { computed, defineComponent, h, ref, watch } from "vue";

import { SourceIcon } from "@theme-hope/modules/navbar/components/icons";

import type { VNode } from "vue";

import "./demo-project.scss";

export default defineComponent({
  name: "DemoProject",

  props: {
    name: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    preview: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const locale = useLocaleConfig({
      "/": { source: "Source" },
      "/zh/": { source: "源代码" },
      "/ru/": { source: "Исходный код" },
    });
    const background = computed(() =>
      isLinkHttp(props.preview) ? props.preview : withBase(props.preview)
    );

    return (): VNode =>
      h(
        "a",
        {
          class: "demo-project",
          style: {
            background: `url(${background.value}) center/cover no-repeat`,
          },
          href: props.url,
          target: "_blank",
        },
        [
          h("div", { class: "demo-project-info" }, [
            h("div", { class: "demo-project-name" }, props.name),
            h("div", { class: "demo-project-desc" }, props.desc),
          ]),
          h(
            "a",
            {
              class: "demo-project-source",
              href: props.source,
              title: locale.value.source,
              target: "_blank",
            },
            h(SourceIcon)
          ),
        ]
      );
  },
});
