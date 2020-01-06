# @vuepress/plugin-pwa <MyBadge text="New" /> <MyBadge text="Default Chinese" type="warn" />

Progressive Web App Surpport

## Default configuration instructions

Enable PWA support and adjust the default language of the popup to Chinese. At the same time, the theme color and night mode adaptation are added.

The default configuration is as follows:

```js
module.exports = {
  plugins: [
    [
      '@vuepress/pwa', {
        /** whether to register Service Worker */
        serviceWorker: true,
        /** whether to popup update notice */
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
