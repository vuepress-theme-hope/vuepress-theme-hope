---
icon: page
category: layout
tags:
  - layout
---

# 页面

## 图标支持

可以在页面的 `Front Matter` 中配置 `icon` 字段，填入对应图标的 FontClass 即可绑定图标到页面。

该图标会在 **路径导航** 和 **侧边栏** 中使用。

::: details 例子

```md
---
icon: Home
---
```

:::

## 路径导航 <MyBadge text="支持页面配置" />

本主题添加了开箱即用的路径导航支持，配置项为 `breadcrumb`。

无需任何额外配置，一个和主题色相符合的路径导航会显示在页面内容最上方，帮助阅读者理解文档结构。

路径导航的图标显示也<MyBadge text="支持页面配置" />，配置项为 `breadcrumbIcon`。

::: warning
为了保证路径导航更好的提示，建议在每一个路径下创建 readme.md 文件。

否则，路径导航将因对应层级文件夹没有主页，无法生成标题与链接，而自动忽略那一层级。
:::

## 文章信息展示

详见 [文章信息](../feature/page-info.md) 章节。

## 最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

```js
module.exports = {
  themeConfig: {
    lastUpdated: "Last Updated", // string | boolean
  },
};
```

请注意，`themeConfig.lastUpdated` 默认是关闭的，如果给定一个字符串，它将会作为前缀显示(默认值是：`Last Updated`)。

::: warning 使用须知
由于 `lastUpdated` 是基于 `git` 的, 所以你只能在一个基于 `git` 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。
:::

## 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。你也可以使用 `themeConfig` 或 `Front matter` 来明确地重写或者禁用它：

```yaml
---
prev: ./some-other-page
next: false
---

```

## 评论

具体详情请见 [评论](../feature/comment.md) 章节。

## 页脚支持 <MyBadge text="支持页面配置" />

如果希望每个页面都显示页脚，需要将 `themeConfig.footer.display` 设置为 `true`。同时，你可以使用 `themeConfig.footer.copyright` 和 `themeConfig.content` 设置默认的版权信息与页脚内容。

你也可以在页面的 `Front Matter` 中配置 `footer`，`copyright` 与 `medialink` 字段。

- `footer` 字段可以填入字符串或布尔值。

  将 `footer` 设置为 `true` 会显示默认的页脚文字。将 `footer` 设置为 `false` 会禁用该页面的页脚。

  如果你填入一个字符串，它会以 `v-html` 指令的形式插入到页脚的主位置，所以你可以填入 HTMLString。

- `copyright` 字段可以填入本页面的版权信息，同样也支持 HTMLString。这当你引用了来自别处的文章且对方使用了特定许可是很有用的。你也可以填入 `false` 来隐藏特定页面的版权信息。

- `medialink` 字段同 `themeConfig.blog.links` ([具体配置见此](./blog.md#可配置的项目))，你可以在特定页面配置它以展示不同的社交媒体链接，你也可以填入 `false` 来隐藏它。

::: details 例子

启用默认的页脚文字：

```md
---
footer: true
---
```

自定义页脚文字，同时不显示版权信息和媒体链接

```md
---
footer: This website is served by Github Pages
copyright: false
medialink: false
---
```

自定义页脚的内容和版权信息与媒体链接

```md
---
copyright: MIT LICENSE
footer: <a href="https://github.com/Mister-Hope">Mr.Hope</a>
medialink:
  Zhihu: https://zhihu.com
---
```

当你在主题中设置了 `footer.display` 为 true 时，你还可以局部禁用它

```md
---
footer: false
---
```

如果你希望移除默认的 footer 内容同时保持社交媒体与版权信息显示，请传入一个空字符串。

```md
---
footer: ""
---
```

:::

## 特定页面的自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="page">` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面(而只保留导航栏)，你可以再次使用 `Front matter` 来指定这个组件。

```yaml
---
layout: SpecialLayout
---

```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout.vue` 布局。
