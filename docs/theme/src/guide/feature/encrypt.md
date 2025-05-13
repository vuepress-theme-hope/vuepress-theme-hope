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

::: caution

Note that because of the limitation of vuepress, the content of the article is only hidden before being decrypted, and visitors can still get the content of the article from the source code (from js).

Please **DO NOT USE** this encryption function for any sensitive and confidential articles and files, please bear the consequences of it.

:::

<!-- more -->

## Local Encryption

You can configure encryption options through the `encrypt.config` options in theme options.

```ts twoslash {7,9} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  encrypt: {
    config: {
      // This will encrypt the entire guide directory, and both passwords are available
      "/guide/": ["1234", "5678"],
      // This will only encrypt /config/page.html
      "/config/page.html": "1234",
    },
  },
});
```

You can also add hints to the password input box by setting `encrypt.config` to an object with the following format:

```ts twoslash {6-13} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  encrypt: {
    config: {
      "/guide/": {
        password: ["1234", "5678"],
        hint: "Get password from xxx",
      },
      "/config/page.html": {
        password: "1234",
        hint: "Get password from xxx",
      },
    },
  },
});
```

::: warning

Note that you can only use passwords in string format.

The salted hash value of the number `1234` and the string `"1234"` is different! While user can only enter the content in the string format through the input box.

:::

## Global Encryption

In some cases, you may want to encrypt the entire site, you can set `encrypt.global: true` in theme options to do that.

For global encryption, you can set one or more passwords in the format of string or string array in `encrypt.admin`.

If you want to add hints to the password input box, you can set `encrypt.admin` to an object with the following format:

```ts twoslash {5-9} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  encrypt: {
    global: true,
    admin: {
      password: "Mister-Hope", // can also be an array
      hint: "The password is author's name",
    },
  },
});
```

::: tip

The consideration of multiple passwords is separation of permissions. This allows you to deprecate or update some of the global passwords in future deployments, so that some users with certain password will lose access.

:::

## Store your Passwords Securely

If you want to publish source code to git providers, especially in public repositories, it's important **NOT to expose** your passwords in source code.

To achieve this, you can use [dotenv](https://www.npmjs.com/package/dotenv) to load the passwords configuration from a `.env` file.

Create a file `.env` in the root of your package to store passwords and other things you want to keep private and add it to your `.gitignore` file.

```ini title=".env"
PASSWORD=123456
```

Then, load the env file with `dotenv/config` and set password using environment variables in `.vuepress/theme.ts` like this:

```ts twoslash{2,8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";
import "dotenv/config";

export default hopeTheme({
  encrypt: {
    global: true,
    admin: {
      password: process.env.PASSWORD!,
      hint: "The password you specified.",
    },
  },
});
```

To build with GitHub Actions, you can set passwords as secrets in your repository settings and load it with `env` in your workflow file.

```yaml title=".github/workflows/deploy-docs.yml"
# ...
jobs:
  deploy-gh-pages:
    # ...
    steps:
      # ...
      - name: Build Docs
        env:
          PASSWORD: ${{secrets.PASSWORD}}
        run: pnpm docs:build
      # ...
```
