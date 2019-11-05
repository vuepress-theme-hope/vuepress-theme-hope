# vuepress-plugin-mathjax <MyBadge text="New" />

Let the Markdown file in your VuePress site support TeX syntax.

## Default configuration

Added support for formats such as formulas. Disabled when `themeConfig.markdown.mathjax` is `false`, also you can disable it by overriding the plugin configuration.

```js
module.exports = {
  plugins: [
    /** let Markdown files support TeX */
    ['vuepress-plugin-mathjax', (options.markdown || {}).mathjax !== false]
  ]
};
```

## Configuration Item

See [Official Documentation](https://vuepress.github.io/en/plugins/mathjax/#Configs)
