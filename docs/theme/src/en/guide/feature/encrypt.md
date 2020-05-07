---
icon: lock
category: feature
tags:
  - encrypt
  - function
---

# Encryption function

The theme supports encryption of specific folders or specific paths, as well as global scope encryption.

::: danger
Note that due to the limitation of vuepress, the content of the article is only hidden before being decrypted, and visitors can still get the content of the article from the source code (from js).

So please **DO NOT USE** this encryption function for any sensitive and confidential articles and files, please bear the consequences of it.
:::

## Encryption configuration

You can configure the encryption options in the `themeConfig.encrypt` field.

```js
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt api/page.html
  "/api/page.html": "1234"
}
```

At the same time, you can easily configure the password in the Front Matter of the page

```md
---
password: abc1234
---
```
