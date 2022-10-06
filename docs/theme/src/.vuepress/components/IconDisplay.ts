import { useRouteLocale } from "@vuepress/client";
import axios from "axios";
import { defineComponent, h, onMounted, ref } from "vue";
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
    const icons = ref<string[]>([]);

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
      const regExp = new RegExp(`\\n\\.(${props.iconPrefix}.*?):before`, "g");
      message = new Message();

      axios
        .get(props.link)
        .then(({ data }) => {
          const icons: string[] = [];
          let result;

          while ((result = regExp.exec(data))) icons.push(result[1]);

          return icons;
        })
        .then((data) => {
          icons.value = data.sort((a, b) => a.localeCompare(b));
        });
    });

    return (): VNode =>
      h(
        "div",
        { class: "icon-display-wrapper" },
        icons.value.map((icon) =>
          h("div", { class: "icon", onClick: () => copyToClipboard(icon) }, [
            h("div", { class: ["iconfont", icon] }),
            h("div", { class: "text" }, icon),
          ])
        )
      );
  },
});
