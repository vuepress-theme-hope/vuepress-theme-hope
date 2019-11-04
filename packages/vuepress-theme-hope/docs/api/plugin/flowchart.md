# vuepress-plugin-flowchart <MyBadge text="V0.0.10+" />

让你的 VuePress 站点中的 Markdown 文件支持流程图。

## 配置

默认启用，你也可以在主题配置禁用它：

```js
module.exports = {
  themeConfig: {
    markdown: {
      flowchart: false
    }
  }
};
```

或者你也可以在插件配置中禁用或配置它。下方为默认配置：

```js
module.exports = {
  plugins: [
    ['flowchart', (options.markdown || {}).flowchart !== false]
  ]
};
```
