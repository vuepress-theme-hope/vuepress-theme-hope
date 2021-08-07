import type { DirectiveOptions, VNode } from "vue";
import type { DirectiveBinding } from "vue/types/options";

type Event = TouchEvent | MouseEvent;

interface PopupHtmlElement extends HTMLElement {
  $vueClickOutside?: {
    callback: (event: Event) => void;
    handler: (event: Event) => void;
  };
}

type PopupDirectiveFunction = (
  el: PopupHtmlElement,
  binding: DirectiveBinding,
  vnode: VNode,
  oldVnode: VNode
) => void;

const validate = (binding: DirectiveBinding): boolean => {
  if (typeof binding.value !== "function") {
    console.warn(
      "[Vue-click-outside:] provided expression",
      binding.expression,
      "is not a function."
    );

    return false;
  }

  return true;
};

const isPopup = (popupItem: Node, elements: Node[]): boolean => {
  if (!popupItem || !elements) return false;

  for (let i = 0, len = elements.length; i < len; i++)
    try {
      if (popupItem.contains(elements[i])) return true;

      if (elements[i].contains(popupItem)) return false;
    } catch (err) {
      return false;
    }

  return false;
};

const isServer = (vNode: VNode): boolean =>
  typeof vNode.componentInstance !== "undefined" &&
  vNode.componentInstance.$isServer;

export const bind: PopupDirectiveFunction = (el, binding, vNode) => {
  if (!validate(binding)) return;

  // Define Handler and cache it on the element
  const handler = (event: Event): void => {
    if (!vNode.context) return;

    // Some components may have related popup item, on which we shall prevent the click outside event handler.
    // eslint-disable-next-line
    const elements: Node[] =
      // eslint-disable-next-line
      (event as any).path ||
      (event.composedPath ? (event.composedPath() as Node[]) : []);

    if (elements && elements.length > 0) elements.unshift(event.target as Node);

    if (
      el.contains(event.target as Node) ||
      // eslint-disable-next-line
      isPopup((vNode.context as any).popupItem, elements)
    )
      return;

    if (el.$vueClickOutside) el.$vueClickOutside.callback(event);
  };

  // Add Event Listeners
  el.$vueClickOutside = {
    handler,
    callback: binding.value as (event: Event) => void,
  };
  const clickHandler =
    "ontouchstart" in document.documentElement ? "touchstart" : "click";
  if (!isServer(vNode)) document.addEventListener(clickHandler, handler);
};

export const update: PopupDirectiveFunction = (el, binding) => {
  if (validate(binding) && el.$vueClickOutside)
    el.$vueClickOutside.callback = binding.value as (event: Event) => void;
};

export const unbind: PopupDirectiveFunction = (el, _binding, vNode) => {
  // Remove Event Listeners
  const clickHandler =
    "ontouchstart" in document.documentElement ? "touchstart" : "click";
  if (!isServer(vNode) && el.$vueClickOutside)
    document.removeEventListener(clickHandler, el.$vueClickOutside.handler);
  delete el.$vueClickOutside;
};

export default {
  bind,
  update,
  unbind,
} as DirectiveOptions;
