/* global CODE_COPY_OPIONS */
import "@mr-hope/vuepress-plugin-copy-code/style/code.css";
import "balloon-css";
import Message from "./message";
import Vue from "vue";

let message: Message;

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false;

const codeCopyMinxin = Vue.extend({
  mounted(): void {
    message = new Message();

    if (!isMobile() && !CODE_COPY_OPIONS.showInMobile) this.genCopyButton();
  },

  updated(): void {
    if (!isMobile() && !CODE_COPY_OPIONS.showInMobile) this.genCopyButton();
  },

  methods: {
    genCopyButton(): void {
      const selector =
        CODE_COPY_OPIONS.selector || 'div[class*="language-"] pre';

      setTimeout(() => {
        if (typeof selector === "string")
          document
            .querySelectorAll<HTMLElement>(selector)
            .forEach(this.insertCopyButton.bind(this));
        else if (Array.isArray(selector))
          selector.forEach((item) => {
            document
              .querySelectorAll<HTMLElement>(item)
              .forEach(this.insertCopyButton.bind(this));
          });
      }, 1000);
    },

    insertCopyButton(codeBlockElement: HTMLElement): void {
      if (!codeBlockElement.hasAttribute("copy-code-registerd")) {
        const copyElement = document.createElement("div");
        copyElement.className = "copy-code-button";
        copyElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon-copy-code"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 00-6-6H102a6 6 0 00-6 6v20a6 6 0 006 6h180a6 6 0 006-6z" /></svg>';

        copyElement.addEventListener("click", () => {
          this.copyToClipboard(codeBlockElement.innerText);
        });

        copyElement.setAttribute(
          "aria-label",
          CODE_COPY_I18N.hint[this.$localePath || "/"]
        );
        copyElement.setAttribute("data-balloon-pos", "left");

        if (codeBlockElement.parentElement)
          codeBlockElement.parentElement.insertBefore(
            copyElement,
            codeBlockElement
          );
        codeBlockElement.setAttribute("copy-code-registerd", "");
      }
    },

    copyToClipboard(str: string): void {
      const selection = document.getSelection();

      /** 当前选中 */
      const selectedRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      const textAreaElement = document.createElement("textarea");

      textAreaElement.value = str;
      textAreaElement.setAttribute("readonly", "");
      textAreaElement.style.position = "absolute";
      textAreaElement.style.visibility = "hidden";
      document.body.appendChild(textAreaElement);

      textAreaElement.select();
      document.execCommand("copy");
      message.pop(
        CODE_COPY_I18N.copy[this.$localePath || "/"],
        CODE_COPY_OPIONS.duration
      );

      document.body.removeChild(textAreaElement);

      // 恢复之前的选择
      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    },
  },
});

export default codeCopyMinxin;
