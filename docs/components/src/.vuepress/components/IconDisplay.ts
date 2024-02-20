import { useLocaleConfig } from "@vuepress/helper/client";
import type { CopyCodePluginLocaleConfig } from "@vuepress/plugin-copy-code";
import type { VNode } from "vue";
import { defineComponent, h, onMounted, shallowRef } from "vue";
import { Message } from "vuepress-shared/client";

import "./icon-display.scss";

let message: Message;

declare const __CC_LOCALES__: CopyCodePluginLocaleConfig;

const CHECK_ICON =
  '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg>';

export default defineComponent({
  name: "IconDisplay",

  props: {
    /** Icon assets link */
    link: {
      type: String,
      required: true,
    },

    /** Icon font class prefix */
    iconPrefix: {
      type: String,
      default: "icon-",
    },
  },

  setup(props) {
    const locale = useLocaleConfig(__CC_LOCALES__);
    const icons = shallowRef<string[]>([]);

    const copyToClipboard = (content: string): void => {
      const selection = document.getSelection();

      /** Current selection */
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

      message.pop(`${CHECK_ICON}<span>${locale.value.copied} 🎉</span>`);

      document.body.removeChild(textAreaElement);

      // Recover the previous selection
      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    };

    onMounted(() => {
      const regExp = new RegExp(`\\n\\.(${props.iconPrefix}.*?):before`, "g");

      message = new Message();

      void fetch(props.link)
        .then((res) => res.text())
        .then((data) => {
          const icons: string[] = [];
          let result;

          while ((result = regExp.exec(data)))
            icons.push(result[1].replace(props.iconPrefix, ""));

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
            h("div", { class: ["iconfont", props.iconPrefix + icon] }),
            h("div", { class: "text" }, icon),
          ]),
        ),
      );
  },
});
