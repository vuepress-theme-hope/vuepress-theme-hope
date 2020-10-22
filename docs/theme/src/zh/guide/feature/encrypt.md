---
icon: lock
category: feature
tags:
  - encrypt
  - feature
---

# 加密功能

主题支持对特定文件夹或特定的路径进行加密，也支持进行全局范围的加密。

::: danger
注意，受到 VuePress 的限制，在未解密前，文章内容仅仅被隐藏，访问者仍可以从源码中获取文章的内容。

所以请不要使用该加密功能用于任何敏感、机密的文章与档案，造成的后果请你自负。
:::

## 加密配置

你可以在 `themeConfig.encrypt` 字段配置加密选项。

```js
{
  // 这会加密整个 guide 目录，并且两个密码都是可用的
  "/guide/": ["1234", "5678"],
  // 这只会加密 config/page.html
  "/config/page.html": "1234"
}
```

同时，你可以更加方便地在页面的 frontmatter 中配置密码

```md
---
password: abc1234
---
```
