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

## Encryption configuration

You can configure the encryption options in the `themeConfig.encrypt` field.

```js
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt config/page.html
  "/config/page.html": "1234"
}
```

You can also configure the password in the frontmatter of the page

```md
---
password: abc1234
---
```
