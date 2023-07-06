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

import { usePageData } from "@vuepress/client";
import { useClipboard, useEventListener } from "@vueuse/core";
import { nextTick, onMounted, watch } from "vue";
import { Message, useIsMobile, useLocaleConfig } from "vuepress-shared/client";

import {
  copyCodeDelay,
  copyCodeDuration,
  copyCodeFancy,
  copyCodeLocales,
  copyCodeSelector,
  copyCodeShowInMobile,
} from "../define.js";

if (copyCodeFancy)
  void import(
    /* webpackChunkName: "message" */ "vuepress-shared/client/styles/message.scss"
  );

const timeoutIdMap: Map<HTMLElement, NodeJS.Timeout> = new Map();

export const setupCopyCode = (): void => {
  const { copy } = useClipboard({ legacy: true });
  const locale = useLocaleConfig(copyCodeLocales);
  const page = usePageData();
  const isMobile = useIsMobile();

  let message: Message;

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (!codeBlockElement.hasAttribute("copy-code-registered")) {
      const copyElement = document.createElement("button");

      copyElement.type = "button";
      copyElement.classList.add("copy-code-button");
      copyElement.innerHTML = '<div class="copy-icon" />';
      copyElement.setAttribute("aria-label", locale.value.copy);
      copyElement.setAttribute("data-copied", locale.value.copied);

      if (copyCodeFancy) {
        copyElement.classList.add("fancy");
        copyElement.setAttribute("data-balloon-pos", "left");
      }

      if (codeBlockElement.parentElement)
        codeBlockElement.parentElement.insertBefore(
          copyElement,
          codeBlockElement,
        );

      codeBlockElement.setAttribute("copy-code-registered", "");
    }
  };

  const generateCopyButton = (): Promise<void> =>
    nextTick().then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            copyCodeSelector.forEach((item) => {
              document
                .querySelectorAll<HTMLElement>(item)
                .forEach(insertCopyButton);
            });
            resolve();
          }, copyCodeDelay || 500);
        }),
    );

  const copyCodeBlockContent = (
    codeContainer: HTMLDivElement,
    codeContent: HTMLPreElement,
    button: HTMLButtonElement,
  ): void => {
    let { innerText: text = "" } = codeContent;

    if (
      // is shell
      /language-(shellscript|shell|bash|sh|zsh)/.test(
        codeContainer.classList.toString(),
      )
    )
      text = text.replace(/^ *(\$|>) /gm, "");

    void copy(text).then(() => {
      button.classList.add("copied");
      clearTimeout(timeoutIdMap.get(button));

      const timeoutId = setTimeout(() => {
        button.classList.remove("copied");
        button.blur();
        timeoutIdMap.delete(button);
      }, copyCodeDuration);

      timeoutIdMap.set(button, timeoutId);

      if (copyCodeFancy) {
        const CHECK_ICON =
          '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg>';

        message.pop(
          `${CHECK_ICON}<span>${locale.value.hint} 🎉</span>`,
          copyCodeDuration,
        );
      }
    });
  };

  onMounted(() => {
    if (copyCodeFancy) message = new Message();

    if (!isMobile.value || copyCodeShowInMobile) void generateCopyButton();

    useEventListener("click", (event) => {
      const el = event.target as HTMLElement;

      if (el.matches('div[class*="language-"] > button.copy')) {
        const codeContainer = <HTMLDivElement>el.parentElement;
        const preBlock = <HTMLPreElement | null>el.nextElementSibling;

        if (preBlock)
          copyCodeBlockContent(codeContainer, preBlock, <HTMLButtonElement>el);
      } else if (el.matches('div[class*="language-"] div.copy-icon')) {
        const buttonElement = <HTMLButtonElement>el.parentElement;
        const codeContainer = <HTMLDivElement>buttonElement.parentElement;
        const preBlock = <HTMLPreElement | null>(
          buttonElement.nextElementSibling
        );

        if (preBlock)
          copyCodeBlockContent(codeContainer, preBlock, buttonElement);
      }
    });

    watch(
      () => page.value.path,
      () => {
        if (!isMobile.value || copyCodeShowInMobile) void generateCopyButton();
      },
    );
  });
};
