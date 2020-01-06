/* eslint-disable no-console */
/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 00:19:15
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-05 12:53:12
 * @Description: 判断是否点击在组件外部
 */

const validate = binding => {
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

const isPopup = (popupItem, elements) => {
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

const isServer = vNode =>
  typeof vNode.componentInstance !== 'undefined' &&
  vNode.componentInstance.$isServer;

module.exports = {
  bind(el, binding, vNode) {
    if (!validate(binding)) return;

    // Define Handler and cache it on the element
    const handler = e => {
      if (!vNode.context) return;

      // Some components may have related popup item, on which we shall prevent the click outside event handler.
      const elements = e.path || (e.composedPath && e.composedPath());

      if (elements && elements.length > 0) elements.unshift(e.target);

      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements))
        return;

      el.$vueClickOutside.callback(e);
    };

    // Add Event Listeners
    el.$vueClickOutside = {
      handler,
      callback: binding.value
    };
    if (!isServer(vNode)) document.addEventListener('click', handler);
  },

  update(el, binding) {
    if (validate(binding)) el.$vueClickOutside.callback = binding.value;
  },

  unbind(el, binding, vNode) {
    // Remove Event Listeners
    if (!isServer(vNode))
      document.removeEventListener('click', el.$vueClickOutside.handler);
    delete el.$vueClickOutside;
  }
};
