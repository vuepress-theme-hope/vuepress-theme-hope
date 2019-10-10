/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:15:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-09 10:26:59
 * @Description: Vuepress增强配置
 */

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  const themeConfig = siteData.themeConfig;

  // 设置图标前缀
  if (themeConfig.iconPrefix === undefined) themeConfig.iconPrefix = 'icon-';

  // 设置默认页脚
  if (!themeConfig.footer)
    themeConfig.footer = { text: 'MIT Licensed | Copyright © 2019-present Mr.Hope' };
  else if (!themeConfig.footer.text)
    themeConfig.footer.text = 'MIT Licensed | Copyright © 2019-present Mr.Hope';
};
