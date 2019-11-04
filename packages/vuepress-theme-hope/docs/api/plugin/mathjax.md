# vuepress-plugin-mathjax <MyBadge text="新增" />

让你的 VuePress 站点中的 Markdown 文件支持 TeX 语法。

## 默认配置说明

添加了公式等格式的支持。当 `themeConfig.markdown.mathjax` 为 `false` 时禁用，当然你也可以通过覆盖插件配置来禁用它。

```js
module.exports = {
  plugins: [
    /** Markdown 文件支持 TeX 语法 */
    ['vuepress-plugin-mathjax', (options.markdown || {}).mathjax !== false]
  ]
};
```

## 配置项

详见 [官方文档](https://vuepress.github.io/zh/plugins/mathjax/#配置项)
