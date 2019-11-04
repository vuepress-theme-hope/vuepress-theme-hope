# vuepress-plugin-flowchart <MyBadge text="V0.0.10+" />

Let the Markdown file support flow chart in your VuePress site

## Configuration

Enable by default, you can disable it by:

```js
module.exports = {
  themeConfig: {
    markdown: {
      flowchart: false
    }
  }
};
```

Or you can disable or config it in `plugin` config.

Below is the default config:

```js
module.exports = {
  plugins: [
    ['flowchart', (options.markdown || {}).flowchart !== false]
  ]
};
```
