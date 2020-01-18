/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-18 17:52:24
 * @Description: App 增强文件
 *
 * 注册组件，并在 router 的 onReady 周期注册 Service Worker 
 */
/* global SW_BASE_URL */

import { EnhanceApp } from 'vuepress-types';
import SWUpdateEvent from './SWUpdateEvent';
import SWUpdatePopup from './SWUpdatePopup.vue';
import event from './event';
import { register } from 'register-service-worker';

const enhanceApp: EnhanceApp = ({ Vue, router, isServer }) => {
  Vue.component('SWUpdatePopup', SWUpdatePopup);

  // Register service worker
  router.onReady(() => {
    if (process.env.NODE_ENV === 'production' && !isServer)
      register(`${SW_BASE_URL}service-worker.js`, {
        registrationOptions: {},
        ready() {
          console.log('[PWA]: Service worker 已激活');
          event.$emit('sw-ready');
        },

        cached(registration) {
          console.log('[PWA]: 内容以被缓存以离线使用');
          event.$emit('sw-cached', new SWUpdateEvent(registration));
        },

        updated(registration) {
          console.log('[PWA]: 内容已更新');
          event.$emit('sw-updated', new SWUpdateEvent(registration));
        },

        offline() {
          console.log('[PWA]: 无网络链接，APP 以离线模式启动');
          event.$emit('sw-offline');
        },

        error(err) {
          console.error('[PWA]: 注册 Service Worker 出现错误:', err);
          event.$emit('sw-error', err);
        }
      });
  });
};

export default enhanceApp;
