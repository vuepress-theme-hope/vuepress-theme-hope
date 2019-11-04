---
icon: commentfill
---

# 评论功能

借助 Valine，主题实现了无后端开启阅读量展示与评论功能。

## 评论

借助 Valine 插件，本主题支持评论功能。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    valine: {
      appId: '...', // your appId
      appKey: '...' // your appKey
    }
  }  
}
```

关于 Valine 的配置与使用，请见 [Valine官方文档](https://valine.js.org)。

::: tip
本插件对应的配置将在 [配置](../api/readme.md) 中列出。

你可以引导用户到 [Gravatar](http://cn.gravatar.com/) 去设置自己的头像。
:::
