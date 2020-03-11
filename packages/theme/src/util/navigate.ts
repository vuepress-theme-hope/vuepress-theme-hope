/*
 * @Author: Mr.Hope
 * @Date: 2019-10-13 14:48:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-11 13:34:00
 * @Description: 导航
 */

import VueRouter, { Route } from 'vue-router';

/**
 * 导航
 *
 * @param url 跳转的网址
 * @param router 路由管理器
 * @param route 当前页面路由
 */
const navigate = (url: string, router: VueRouter, route: Route): void => {
  if (url)
    if (url && url[0] === '/')
      // Inner absolute path
      router.push(url);
    else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
      // Outter url
      if (window) window.open(url);
    } else {
      // Inner relative path
      const base = route.path.slice(0, route.path.lastIndexOf('/'));

      router.push(`${base}/${url}`);
    }
};

export default navigate;
