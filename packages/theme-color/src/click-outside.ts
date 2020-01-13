/* eslint-disable no-console */
/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 00:19:15
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-13 18:34:37
 * @Description: 判断是否点击在组件外部
 */
import { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

interface PopupHtmlElements extends HTMLElement {
  $vueClickOutside: any;
}

type PopupDirectiveFunction = (
  el: PopupHtmlElements,
  binding: DirectiveBinding,
  vnode: VNode,
  oldVnode: VNode
) => void;

const validate = (binding: DirectiveBinding): boolean => {
  if (typeof binding.value !== 'function') {
    console.warn(
      '[Vue-click-outside:] provided expression',
      binding.expression,
      'is not a function.'
    );

    return false;
  }

  return true;
};

const isPopup = (popupItem: HTMLElement, elements: HTMLElement[]): boolean => {
  if (!popupItem || !elements) return false;

  for (let i = 0, len = elements.length; i < len; i++)
    try {
      if (popupItem.contains(elements[i])) return true;

      if (elements[i].contains(popupItem)) return false;
    } catch (e) {
      return false;
    }

  return false;
};

/** 是否是服务器端代码 */
const isServer = (vNode: VNode): boolean =>
  typeof vNode.componentInstance !== 'undefined' &&
  vNode.componentInstance.$isServer;

export const bind: PopupDirectiveFunction = (el, binding, vNode) => {
  if (!validate(binding)) return;

  // Define Handler and cache it on the element
  const handler = (e: any): void => {
    if (!vNode.context) return;

    // Some components may have related popup item, on which we shall prevent the click outside event handler.
    const elements = e.path || (e.composedPath && e.composedPath());

    if (elements && elements.length > 0) elements.unshift(e.target);

    if (
      el.contains(e.target) ||
      isPopup((vNode.context as any).popupItem, elements)
    )
      return;

    el.$vueClickOutside.callback(e);
  };

  // Add Event Listeners
  el.$vueClickOutside = {
    handler,
    callback: binding.value
  };
  if (!isServer(vNode)) document.addEventListener('click', handler);
};

export const update: PopupDirectiveFunction = (el, binding) => {
  if (validate(binding)) el.$vueClickOutside.callback = binding.value;
};

export const unbind: PopupDirectiveFunction = (el, _binding, vNode) => {
  // Remove Event Listeners
  if (!isServer(vNode))
    document.removeEventListener('click', el.$vueClickOutside.handler);
  delete el.$vueClickOutside;
};

export default {
  bind,
  update,
  unbind
} as DirectiveOptions;
