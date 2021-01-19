---
icon: valine
---

# Valine

借助 Valine，插件实现了无后端开启阅读量展示与评论功能。

## 获取 APP ID 和 APP Key

请先 [登录](https://leancloud.cn/dashboard/login.html#/signin) 或 [注册](https://leancloud.cn/dashboard/login.html#/signup) LeanCloud, 进入控制台后点击左下角创建应用。

应用创建好以后，进入刚刚创建的应用，选择左下角的 `设置 > 应用 Key`，然后就能看到你的 `APP ID` 和 `APP Key` 了。

```js
options = {
  type: "valine",
  appId: "...", // your appId
  appKey: "...", // your appKey
};
```

将对应的 `APP ID` 和 `APP Key` 填入， Valine 即配置完成。

Valine 评论的其他配置将在 [配置](../config/valine.md) 中列出。

::: tip

更多配置与使用，请见 [Valine 官方文档](https://valine.js.org)。

:::
