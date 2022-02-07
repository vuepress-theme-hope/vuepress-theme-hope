/**
 * Forked and edited from https://github.com/vxhly/vuepress-plugin-one-click-copy/blob/master/bin/clientRootMixin.js
 *
 * MIT License
 *
 * Copyright (c) 2019 vxhly <pengchengou@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * © 2019 GitHub, Inc.
 */

import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { defineClientAppSetup } from "@vuepress/client";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { locales, options } from "./define";
import Message from "./message";

import "balloon-css/balloon.css";
import "./styles/button.scss";
import "./styles/message.scss";

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false;

export default defineClientAppSetup(() => {
  const route = useRoute();
  const locale = useLocaleConfig(locales);

  let message: Message;

  const copyToClipboard = (code: string): void => {
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
    message.pop(locale.value.copy, options.duration);

    document.body.removeChild(textAreaElement);

    // recover the previous selection
    if (selectedRange && selection) {
      selection.removeAllRanges();
      selection.addRange(selectedRange);
    }
  };

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (!codeBlockElement.hasAttribute("copy-code-registerd")) {
      const copyElement = document.createElement("button");
      copyElement.className = "copy-code-button";
      copyElement.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon-copy-code"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 00-6-6H102a6 6 0 00-6 6v20a6 6 0 006 6h180a6 6 0 006-6z" /></svg>';

      copyElement.addEventListener("click", () => {
        copyToClipboard(codeBlockElement.innerText);
      });

      copyElement.setAttribute("aria-label", locale.value.hint);
      copyElement.setAttribute("data-balloon-pos", "left");

      if (codeBlockElement.parentElement)
        codeBlockElement.parentElement.insertBefore(
          copyElement,
          codeBlockElement
        );
      codeBlockElement.setAttribute("copy-code-registerd", "");
    }
  };

  const genCopyButton = (): void => {
    const selector =
      options.selector || '.theme-default-content div[class*="language-"] pre';

    setTimeout(() => {
      if (typeof selector === "string")
        document
          .querySelectorAll<HTMLElement>(selector)
          .forEach(insertCopyButton);
      else if (Array.isArray(selector))
        selector.forEach((item) => {
          document
            .querySelectorAll<HTMLElement>(item)
            .forEach(insertCopyButton);
        });
    }, options.delay || 500);
  };

  onMounted(() => {
    message = new Message();

    if (!isMobile() || options.showInMobile) genCopyButton();
  });

  watch(
    () => route.path,
    () => {
      if (!isMobile() || options.showInMobile) genCopyButton();
    }
  );
});
