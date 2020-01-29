/*
 * @Author: Mr.Hope
 * @Date: 2020-01-07 21:40:17
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-29 21:59:01
 * @Description: App 增强文件
 * 
 * 导入样式，组测组件
 */
import '../styles/index.styl';
import { EnhanceApp } from 'vuepress-types';
import ThemeColor from './ThemeColor.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('ThemeColor', ThemeColor);
};

export default enhanceApp;
