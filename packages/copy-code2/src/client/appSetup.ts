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

import { useLocaleConfig, Message } from "@mr-hope/vuepress-shared/lib/client";
import { defineClientAppSetup } from "@vuepress/client";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import type { CopyCodeOptions, CopyCodeLocaleConfig } from "../shared";

import "balloon-css/balloon.css";
import "./styles/button.scss";

declare const CODE_COPY_OPIONS: Required<CopyCodeOptions>;
declare const CODE_COPY_LOCALES: CopyCodeLocaleConfig;

const options = CODE_COPY_OPIONS;

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false;

export default defineClientAppSetup(() => {
  const route = useRoute();
  const locale = useLocaleConfig(CODE_COPY_LOCALES);

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

    if (!options.pure)
      message.pop(
        `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg><span>${locale.value.copy}</span>`,
        options.duration
      );

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

      if (options.pure) {
        copyElement.className = "copy-code-pure-button";
        copyElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="icon-copy-code"><path d="M704 896v80c0 26.51-21.49 48-48 48H112c-26.51 0-48-21.49-48-48V240c0-26.51 21.49-48 48-48h144v592c0 61.758 50.242 112 112 112h336zm0-688V0H368c-26.51 0-48 21.49-48 48v736c0 26.51 21.49 48 48 48h544c26.51 0 48-21.49 48-48V256H752c-26.4 0-48-21.6-48-48zm241.942-62.058L814.058 14.058A48 48 0 0 0 780.118 0H768v192h192v-12.118a48 48 0 0 0-14.058-33.94z"/></svg>';
      } else {
        copyElement.className = "copy-code-button";
        copyElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon-copy-code"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 00-6-6H102a6 6 0 00-6 6v20a6 6 0 006 6h180a6 6 0 006-6z" /></svg>';
      }

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
