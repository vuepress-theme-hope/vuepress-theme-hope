/**
 * Forked from https://github.com/element-plus/element-plus/blob/dev/packages/directives/click-outside/index.ts
 *
 * MIT License
 *
 * Copyright (c) 2020-PRESENT Element Plus
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
 */

import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from "vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler;
    bindingFn: (...args: unknown[]) => unknown;
  }[]
>;

const nodeList: FlushList = new Map();

let startClick: MouseEvent;

if (!__VUEPRESS_SSR__) {
  document.addEventListener("mousedown", (event: MouseEvent) => {
    startClick = event;
  });
  document.addEventListener("mouseup", (event: MouseEvent) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(event, startClick);
      }
    }
  });
}

const createDocumentHandler = (
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler => {
  let excludes: HTMLElement[] = [];

  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else if ((binding.arg as unknown) instanceof HTMLElement) {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg as unknown as HTMLElement);
  }

  return (mouseup, mousedown) => {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: HTMLElement | null;
      }>
    ).popperRef;
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown?.target as Node;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;

    const isTargetExcluded =
      (excludes.length &&
        excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement));
    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) ||
        popperRef.contains(mouseDownTarget));

    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    binding.value(mouseup, mousedown);
  };
};

export const clickOutSideDirective: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // there could be multiple handlers on the element
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    nodeList.get(el)!.push({
      documentHandler: createDocumentHandler(el, binding),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      bindingFn: binding.value,
    });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const handlers = nodeList.get(el)!;
    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue
    );
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      bindingFn: binding.value,
    };

    if (oldHandlerIndex >= 0) {
      // replace the old handler to the new handler
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el: HTMLElement) {
    // remove all listeners when a component unmounted
    nodeList.delete(el);
  },
};
