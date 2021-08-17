---
title: Encryption
icon: lock
category: feature
tags:
  - encrypt
  - feature
---

The theme supports encryption of specific folders or specific paths, as well as global scope encryption.

::: danger

Note that because of the limitation of vuepress, the content of the article is only hidden before being decrypted, and visitors can still get the content of the article from the source code (from js).

Please **DO NOT USE** this encryption function for any sensitive and confidential articles and files, please bear the consequences of it.

:::

<!-- more -->

## Recommended Encryption

You can configure encryption options through the `config` field in `themeConfig.encrypt`.

```js
{
  // This will encrypt the entire guide directory, and both passwords are available
  "/guide/": ["1234", "5678"],
  // This will only encrypt config/page.html
  "/config/page.html": "1234"
}
```

::: tip

We recommend you to use `config`, because the password will be hashed and salted by theme and will not appear in the output code.

:::

## Temporary encryption

You can configure the password in the frontmatter of the page more conveniently.

```md
---
password: abc1234
---
```

::: danger

Though this is convinient , users can find the raw password through the source code.

:::

::: warning

Since you can only input strings, all passwords should be strings. Please do not try to set other values!

:::

## Global encryption

In some cases, you may want to encrypt the entire site, you can set `themeConfig.encrypt.status` to `global` to achieve it.

For global encryption, you can set one or more passwords in the format of string or string array in `themeConfig.encrypt.global`.

::: tip

The consideration of multiple passwords is separation of permissions。 This allow you to depreacte or update some of the global passwords in future deployments, so that some users with certain password will lose access.

:::

:::
