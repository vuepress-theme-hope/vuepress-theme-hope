/** 默认配置 */
export default {
  // eslint-disable-next-line no-process-env
  base: process.env.VuePress_BASE || '/',

  theme: 'hope',

  themeConfig: { locales: {} },

  /** 是否只支持常青树浏览器 */
  evergreen: true // 设置为 true 后将不会兼容 IE 等老旧浏览器
};
