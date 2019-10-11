/*
 * @Author: Mr.Hope
 * @Date: 2019-10-09 12:09:44
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-09 12:23:11
 * @Description: 侧边栏处理
 */

/**
 * @description: 处理导航栏
 * @param {string | object}  sidebarConfig 侧边栏配置
 * @param {string}  prefix 路径前缀
 * @return: 
 */
const resolveSideBar = (sidebarConfig, prefix = '') => {
  return sidebarConfig.map(element => {
    if (typeof element === 'string') return `${prefix}${element}`;
    else if (typeof element === 'object') {
      element.children = resolveSideBar(element.children, `${prefix}${element.prefix || ''}`)

      return element;
    }
  });
};

module.exports = resolveSideBar;
