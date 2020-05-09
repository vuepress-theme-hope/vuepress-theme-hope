---
category: config
tags:
  - plugin
  - config
---

# @vuepress/medium-zoom

这个插件将会使你的图片支持点击缩放。

## 默认配置说明

默认配置如下：

```js {4-14}
module.exports = {
  plugins: [
    /** 图片缩放插件 */
    [
      '@vuepress/medium-zoom',
      {
        /** 设置选项 */
        options: {
          /** 缩放后图片的外间距 */
          margin: 16,
          /** 关闭缩放需要滚动的像素数 */
          scrollOffset: 40
        }
      }
    ]
  ]
};
```
