---
icon: page
category: layout
---

# 页面

## 图标支持

可以在页面的 `frontmatter` 中配置 `icon` 字段，填入对应图标的 FontClass 即可绑定图标到页面。

该图标会在 **路径导航** 和 **侧边栏** 中使用。

::: details 例子

```md
---
icon: Home
---
```

:::

## 文章信息展示 <MyBadge text="支持局部配置" />

- **作者** <MyBadge text="支持局部配置" />

  可以在页面的 `frontmatter` 中设置 `author` 字段来设置作者名称。

  ::: details 例子

  ```md
  ---
  author: Mr.Hope
  ---
  ```

  :::

  作者姓名也可以在 `themeConfig.author` 中全局配置，这样每篇文章都会显示默认作者。可以在页面的 frontmatter 中设置 `author` 为 `false` 取消作者显示。

- **阅读量** <MyBadge text="支持局部配置" />

  当配置 [评论功能](../feature/comment.md) 后，该功能默认启用。全局配置项为 `valine.visitor`，页面配置项为 `visitor`，你可以将其禁用，或在全局禁用的情况下在特定页面启用。

  ::: details 例子

  ```md
  ---
  visitor: false
  ---
  ```

  :::

- **时间**

  可以在页面的 `frontmatter` 中设置 `time` 字段来设置写作时间。

  ::: details 例子

  ```md
  ---
  time: 2020-1-1
  ---
  ```

  :::

## 评论

具体详情请见 [评论](../feature/comment.md) 章节。

## 页脚支持 <MyBadge text="支持局部配置" />

可以在页面的 `frontmatter` 中配置 `footer` 字段。

`footer` 字段接受一段字符串，同时也接受一段 htmlString ，他们会直接渲染在页脚的位置。

::: tip 其他支持
可以将 `footer` 设置为 `true` 来显示默认的页脚。默认的页脚文字在 `themeConfig.footer` 字段配置。

同时，`footer` 还接受一个 object，使用 `text` 和 `link` 字段来快速设置一个页脚链接。
:::

::: details 例子

启用默认的页脚文字：

```md
---
footer: true
---
```

自定义页脚文字

```md
---
footer: This website is served by Github Pages
---
```

快速定义页脚链接

```md
---
footer:
  text: Mr.Hope
  link: https://github.com/Mister-Hope
---
```

自定义页脚

```md
---
footer: <a href="https://github.com/Mister-Hope">Mr.Hope</a>
---
```

当你在主题中设置了 `footer.displayDefault` 为 true 时，你还可以局部禁用它

```md
---
footer: false
---
```

:::
