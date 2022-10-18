import { defineUserConfig } from 'vuepress'
import { head } from "./config/head";
import { theme } from "./config/theme";
import { plugins } from "./config/plugins";

// @ts-ignore
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'vuepress-plugin-next-search',
  description: '适配vuepress2的全文搜索工具',
  port: 34567,
  head,
  theme,
  plugins,
  base: '/',
  dest: './dist',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
    '/zh-TW/': {
      lang: 'zh-TW',
    },
    "/en/": {
      lang: "en-US",
    },
  },
})
