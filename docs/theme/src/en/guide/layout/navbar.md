---
icon: nav
tags: 
  - enhance
  - layout
category: layout
---

# NavBar

## Enhancement

- Prefix support

  The NavBarItem in the theme configuration has a new `prefix` field. Fill in it to add a prefix to the submenu.

- Icon support

  The NavBarItem in the theme configuration has a new `icon` field. Fill in the FontClass of the corresponding icon to display the corresponding icon.

::: details Navbar configuration for this document

```js {4-18}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      // add icon field to each item to display icon
      { text: 'Home', link: '/en/', icon: 'homefill' },
      { text: 'Guide', link: '/en/guide/', icon: 'creativefill' },
      { text: 'Config', link: '/en/api/', icon: 'api' },
      {
        text: 'Basic',
        icon: 'infofill',
        items: [
          { text: 'Markdown', link: '/en/basic/markdown/', icon: 'markdown' },
          { text: 'Vuepress', link: '/en/basic/vuepress/', icon: 'vue' }
        ]
      },
      {
        text: 'Project',
        icon: 'infofill',
        items: [
          {
            text: 'Changelog',
            link:
              'https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/CHANGELOG.md'
          },
          {
            text: 'Repo',
            link: 'https://github.com/mister-hope/vuepress-theme-hope'
          }
        ]
      }
    ]
  }
}
```

:::

## New feature

- Style changes

  The newly designed navigation bar includes a shadow at the bottom. The text of inactive links in the navigation bar is lightened.

  At the same time, the style of the search box is also adjusted to a rounded rectangle, and the background color of the search box is deepened.

- repo hidden

  You can set `repoDisplay` to `false` in`themeConfig` to cancel the library link display on the right side of the navigation bar.

- Theme color and night mode button

  For details, see the [Themecolor](../feature/themecolor.md) section.

- Full screen button

  For details, see the [Full Screen Button](../feature/fullscreen.md) section.
