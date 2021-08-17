---
title: 加密
icon: lock
category: feature
tags:
  - feature
  - encrypt
---

主题支持对特定文件夹或特定的路径进行加密，也支持进行全局范围的加密。

::: danger

注意，受到 VuePress 的限制，在未解密前，文章内容仅仅被隐藏，访问者仍可以从源码中获取文章的内容。

所以请不要使用该加密功能用于任何敏感、机密的文章与档案，造成的后果请你自负。

:::

<!-- more -->

## 推荐的局部加密

你可以在 `themeConfig.encrypt` 通过 `config` 字段配置加密选项。

```js
{
  // 这会加密整个 guide 目录，并且两个密码都是可用的
  "/guide/": ["1234", "5678"],
  // 这只会加密 config/page.html
  "/config/page.html": "1234"
}
```

::: tip

我们推荐你这么做，因为这样密码会经过主题的混淆，而不会出现在编译结果中。

:::

## 简易临时加密

你可以更加方便地在页面的 frontmatter 中配置密码。

```md
---
password: abc1234
---
```

::: danger

这会导致密码可以通过源码被获取。

:::

::: warning

由于你只能通过输入框输入字符串，`password` 应被设置为字符串。请不要尝试设置其他值！

:::

## 全局加密

有些情况下，你可能想加密整个站点，你可以设置 `themeConfig.encrypt.status` 为 `global` 来实现它。

全局加密时，你可以在 `themeConfig.encrypt.global` 中以字符串或字符串数组的格式设置一个或多个密码。

::: tip

多个密码的考虑是权限分离，这样你可以在日后部署中，废除或更新部分的全局密码，使得拥有密码的部分用户失去访问权限。

:::

:::
