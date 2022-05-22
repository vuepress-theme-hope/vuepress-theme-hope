import { useRouteLocale } from "@vuepress/client";
import axios from "axios";
import { defineComponent, h, onMounted, reactive } from "vue";
import { Message } from "vuepress-shared/lib/client";

import type { VNode } from "vue";
import type { CopyCodeLocaleConfig } from "vuepress-plugin-copy-code2";

import "./icon-display.scss";

let message: Message;

declare const CODE_COPY_LOCALES: CopyCodeLocaleConfig;

export default defineComponent({
  name: "IconDisplay",

  props: {
    link: {
      type: String,
      required: true,
    },

    iconPrefix: {
      type: String,
      default: "icon-",
    },
  },

  setup(props) {
    const routeLocale = useRouteLocale();
    const icons = reactive<string[]>([]);

    const copyToClipboard = (content: string) => {
      const selection = document.getSelection();

      /** current selection */
      const selectedRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

      const textAreaElement = document.createElement("textarea");

      textAreaElement.value = content;
      textAreaElement.setAttribute("readonly", "");
      textAreaElement.style.position = "absolute";
      textAreaElement.style.top = "-9999px";
      document.body.appendChild(textAreaElement);

      textAreaElement.select();
      document.execCommand("copy");

      message.pop(CODE_COPY_LOCALES[routeLocale.value].copy);

      document.body.removeChild(textAreaElement);

      // recover the previous selection
      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    };

    onMounted(() => {
      message = new Message();

      axios.get(props.link).then(({ data }) => {
        const regExp = new RegExp(`\\n\\.(${props.iconPrefix}.*?):before`, "g");
        let result;

        while ((result = regExp.exec(data))) icons.push(result[1]);
      });
    });

    return (): VNode =>
      h(
        "div",
        { class: "icon-display-wrapper" },
        icons.map((icon) =>
          h("div", { class: "icon", onClick: () => copyToClipboard(icon) }, [
            h("div", { class: ["iconfont", icon] }),
            h("div", { class: "text" }, icon),
          ])
        )
      );
  },
});
