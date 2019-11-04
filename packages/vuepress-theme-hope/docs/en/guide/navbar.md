---
icon: nav
---

# NavBar

## Icon support

The NavBarItem in the theme configuration adds a `icon` field. Fill in the FontClass of the icon, then the navbar will display the icon.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      // You can add icon fields to display icon
      { text: 'Home', link: '/en/', icon: 'homefill' },
      { text: 'Guide', link: '/en/guide/', icon: 'creativefill' },
      { text: 'Config', link: '/en/api/', icon: 'code' },
      {
        text: 'Basic', icon: 'infofill', items: [
          { text: 'Markdown', link: '/en/basic/markdown/', icon: 'markdown' },
          { text: 'Vuepress', link: '/en/basic/vuepress/', icon: 'vue' }
        ]
      }
    ],

  }
}
```

## Theme color and Night mode

See the [Themecolor](themecolor.md) section for details.

## Fullscreen Button <MyBadge text="Beta" type="warning" />

Enable by default.

You can set `fullscreen` field to `false` in the theme configuration to cancel it.

::: tip
Currently, this feature is in the beta phase, and it will automatically be hidden according to the browser's judgment when it encounters an environment that does not support full screen in the future.
:::

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    fullsreen: false // Enable by default
  }
}
```

## Other Enhancement

### Style Change

The newly designed navigation bar contains the shadow at the bottom.

### Hide Repo

You can set `themeConfig.repoDisplay` in `.vuepress/config.js` to `false` to cancel the repo link display on the right side of navbar.
