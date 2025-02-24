---
title: 加密
icon: lock
category:
  - 功能
tag:
  - 功能
  - 加密
---

主题支持对特定文件夹或特定的路径进行加密，也支持进行全局范围的加密。

::: caution

注意，受到 VuePress 的限制，在未解密前，文章内容仅仅被隐藏，访问者仍可以从源码中获取文章的内容。

所以请不要使用该加密功能用于任何敏感、机密的文章与档案，造成的后果请你自负。

:::

<!-- more -->

## 局部加密

你可以在主题选项中通过 `encrypt.config` 字段配置加密选项。

字段的键名是路径，值支持填入一个或多个数组格式的密码。

```ts twoslash {8,10} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    encrypt: {
      config: {
        // 这会加密整个 guide 目录，并且两个密码都是可用的
        "/guide/": ["1234", "5678"],
        // 这只会加密 /config/page.html
        "/config/page.html": "1234",
      },
    },
  }),
};
```

你也可以通过设置 `encrypt.config` 为一个对象来为密码输入框添加提示信息，格式如下：

```ts twoslash {8-13} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    encrypt: {
      config: {
        "/guide/": {
          password: ["1234", "5678"],
          hint: "从 xxx 获取密码",
        },
        "/config/page.html": {
          password: "1234",
          hint: "从 xxx 获取密码",
        },
      },
    },
  }),
};
```

::: warning

请注意，你只能使用字符串格式的密码。

数字 `1234` 和 字符串 `"1234"` 的混淆值是不同的! 而网站只能通过输入框输入字符串格式的内容。

:::

## 全局加密

有些情况下，你可能想加密整个站点，你可以在主题选项中设置 `encrypt.global: true` 来实现它。

全局加密时，你可以在主题选项中通过 `encrypt.admin` 选项以字符串或字符串数组的格式设置一个或多个密码。

如果你想为密码输入框添加提示信息，你可以设置 `encrypt.admin` 为一个对象，格式如下：

```ts twoslash {8,10} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    encrypt: {
      global: true,
      admin: {
        password: "Mister-Hope", // 也可以是数组
        hint: "密码是作者的名字",
      },
    },
  }),
};
```

::: tip

多个密码的考虑是权限分离，这样你可以在日后部署中，废除或更新部分的全局密码，使得拥有密码的部分用户失去访问权限。

:::
