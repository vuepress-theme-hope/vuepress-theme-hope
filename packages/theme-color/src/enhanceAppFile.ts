import './styles/index.styl';
import { EnhanceApp } from 'vuepress-types';
import ThemeColor from './ThemeColor.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('ThemeColor', ThemeColor);
};

export default enhanceApp;
