# SiteInfo

SiteInfo component, can be used as friend link or project display.

<!-- more -->

## Demo

Basic site info:

<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

```md
<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

Site info with more properties:

<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mister-hope.com"
  logo="https://mister-hope.com/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

```md
<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mister-hope.com"
  logo="https://mister-hope.com/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```

Site info with multiple repos:

<SiteInfo
  name="VuePress Theme Hope"
  desc="A powerful VuePress Theme"
  url="https://theme-hope.vuejs.press"
  logo="https://theme-hope-assets.vuejs.press/logo.svg"
  :repo="['https://github.com/vuepress-theme-hope/vuepress-theme-hope', 'https://gitee.com/vuepress-theme-hope/vuepress-theme-hope']"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

```md
<SiteInfo
  name="VuePress Theme Hope"
  desc="A powerful VuePress Theme"
  url="https://theme-hope.vuejs.press"
  logo="https://theme-hope-assets.vuejs.press/logo.svg"
  :repo="['https://github.com/vuepress-theme-hope/vuepress-theme-hope', 'https://gitee.com/vuepress-theme-hope/vuepress-theme-hope']"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```
