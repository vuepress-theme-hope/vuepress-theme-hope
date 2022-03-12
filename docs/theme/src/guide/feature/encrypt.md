---
title: Encryption
icon: lock
category:
  - Feature
tag:
  - Encrypt
  - Feature
---

The theme supports encryption of specific folders or specific paths, as well as global scope encryption.

::: danger

Note that because of the limitation of vuepress, the content of the article is only hidden before being decrypted, and visitors can still get the content of the article from the source code (from js).

Please **DO NOT USE** this encryption function for any sensitive and confidential articles and files, please bear the consequences of it.

:::

<!-- more -->

## Local Encryption

You can configure encryption options through the `config` field in `themeConfig.encrypt`.

:::: code-group

::: code-group-item TS

```ts {2,4,6}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    encrypt: {
      config: {
        // This will encrypt the entire guide directory, and both passwords are available
        "/guide/": ["1234", "5678"],
        // This will only encrypt config/page.html
        "/config/page.html": "1234",
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {2,4,6}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    encrypt: {
      config: {
        // This will encrypt the entire guide directory, and both passwords are available
        "/guide/": ["1234", "5678"],
        // This will only encrypt config/page.html
        "/config/page.html": "1234",
      },
    },
  },
});
```

:::

::::

::: warning

Note that you can only use passwords in string format.

The salted hash value of the number `1234` and the string `"1234"` is different! While user can only enter the content in the string format through the input box.

:::

## Global encryption

In some cases, you may want to encrypt the entire site, you can set `themeConfig.encrypt.status` to `global` to achieve it.

For global encryption, you can set one or more passwords in the format of string or string array in `themeConfig.encrypt.global`.

::: tip

The consideration of multiple passwords is separation of permissions。 This allow you to depreacte or update some of the global passwords in future deployments, so that some users with certain password will lose access.

:::

:::
