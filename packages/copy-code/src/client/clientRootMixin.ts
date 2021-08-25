import Message from "./message";
import Vue from "vue";

import "./style/code.styl";
import "balloon-css";

let message: Message;

const i18n = CODE_COPY_I18N;
const options = CODE_COPY_OPIONS;

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false;

const codeCopyMinxin = Vue.extend({
  mounted(): void {
    message = new Message();

    if (!isMobile() || options.showInMobile) this.genCopyButton();
  },

  updated(): void {
    if (!isMobile() || options.showInMobile) this.genCopyButton();
  },

  methods: {
    genCopyButton(): void {
      const selector =
        options.selector ||
        '.theme-default-content div[class*="language-"] pre';

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
        const copyElement = document.createElement("button");
        copyElement.className = "copy-code-button";
        copyElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon-copy-code"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 00-6-6H102a6 6 0 00-6 6v20a6 6 0 006 6h180a6 6 0 006-6z" /></svg>';

        copyElement.addEventListener("click", () => {
          this.copyToClipboard(codeBlockElement.innerText);
        });

        copyElement.setAttribute(
          "aria-label",
          i18n[this.$localePath || "/"].hint
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

    copyToClipboard(code: string): void {
      const selection = document.getSelection();

      /** current selection */
      const selectedRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

      const textAreaElement = document.createElement("textarea");

      textAreaElement.value = code;
      textAreaElement.setAttribute("readonly", "");
      textAreaElement.style.position = "absolute";
      textAreaElement.style.top = "-9999px";
      document.body.appendChild(textAreaElement);

      textAreaElement.select();
      document.execCommand("copy");

      if (options.duration !== 0)
        message.pop(i18n[this.$localePath || "/"].copy, options.duration);

      document.body.removeChild(textAreaElement);

      // recover the previous selection
      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    },
  },
});

export default codeCopyMinxin;
