/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 00:19:15
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-18 17:55:45
 * @Description: 判断是否点击在组件外部
 */

/* eslint-disable no-console */
import { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

/** Popup HTML 事件 */
interface PopupHtmlElements extends HTMLElement {
  $vueClickOutside: any;
}

/** Popup 指令函数 */
type PopupDirectiveFunction = (
  el: PopupHtmlElements,
  binding: DirectiveBinding,
  vnode: VNode,
  oldVnode: VNode
) => void;

/** 验证函数 */
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

/** 是否是 Popup */
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

/** 更新命令 */
export const update: PopupDirectiveFunction = (el, binding) => {
  if (validate(binding)) el.$vueClickOutside.callback = binding.value;
};

/** 解绑命令 */
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
