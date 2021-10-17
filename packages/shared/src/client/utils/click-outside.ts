import type { DirectiveBinding, DirectiveHook, Directive, VNode } from "vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;

export type ClickOutSideHandler = () => void;

type Event = TouchEvent | MouseEvent;

interface TargetElement extends HTMLElement {
  $vueClickOutside?: {
    callback: () => void;
    handler: (event: Event) => void;
  };
}

const validate = (binding: DirectiveBinding): boolean => {
  if (typeof binding.value !== "function") {
    console.warn(
      "[Click Outside Directive]: provided expression",
      binding.value,
      "is not a function."
    );

    return false;
  }

  return true;
};

const isTarget = (target: Node, elements: Node[]): boolean => {
  if (!target || !elements) return false;

  for (let i = 0, len = elements.length; i < len; i++)
    try {
      if (target.contains(elements[i])) return true;

      if (elements[i].contains(target)) return false;
    } catch (err) {
      return false;
    }

  return false;
};

export const mounted: DirectiveHook<TargetElement, null, ClickOutSideHandler> =
  (el, binding, vNode) => {
    if (!validate(binding)) return;

    // Define Handler and cache it on the element
    const handler = (event: Event): void => {
      if (!vNode.component) return;

      // Some components may have related popup item, on which we shall prevent the click outside event handler.
      const elements = event.composedPath?.() as Node[];
      const targetNode = event.target as Node;

      if (elements && elements.length > 0) elements.unshift(targetNode);

      if (el.contains(targetNode) || isTarget(vNode.el as Node, elements))
        return;

      if (el.$vueClickOutside) el.$vueClickOutside.callback();
    };

    // Add Event Listeners
    el.$vueClickOutside = {
      handler,
      callback: binding.value,
    };
    const clickHandler =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";
    if (!__VUEPRESS_SSR__) document.addEventListener(clickHandler, handler);
  };

export const updated: DirectiveHook<TargetElement, VNode, ClickOutSideHandler> =
  (el, binding) => {
    if (validate(binding) && el.$vueClickOutside)
      el.$vueClickOutside.callback = binding.value;
  };

export const beforeUnmount: DirectiveHook<TargetElement> = (el) => {
  // Remove Event Listeners
  const clickHandler =
    "ontouchstart" in document.documentElement ? "touchstart" : "click";
  if (!__VUEPRESS_SSR__ && el.$vueClickOutside)
    document.removeEventListener(clickHandler, el.$vueClickOutside.handler);
  delete el.$vueClickOutside;
};

export const clickOutside: Directive = {
  mounted,
  updated,
  beforeUnmount,
};
