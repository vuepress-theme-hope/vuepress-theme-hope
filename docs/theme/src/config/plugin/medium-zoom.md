---
category: config
tags:
  - plugin
  - config
---

# @vuepress/medium-zoom <MyBadge text="新增" />

这个插件将会使你的图片支持点击缩放。

## 默认配置说明

开启功能并进行了深色模式适配。

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
