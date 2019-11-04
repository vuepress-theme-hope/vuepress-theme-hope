# @vuepress/plugin-pwa <MyBadge text="新增" /> <MyBadge text="默认中文" type="warn" />

Progressive Web App Surpport

## 默认配置说明

开启PWA支持，调整弹窗默认语言为中文。同时增加了主题色与夜间模式适配。

默认配置如下：

```js
module.exports = {
  plugins: [
    /** PWA 插件 */
    [
      '@vuepress/pwa', {
        /** 是否注册Service Worker */
        serviceWorker: true,
        /** 是否弹出页面更新提示 */
        updatePopup: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新'
          },
          '/en/': {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    ]
  ]
};
```
