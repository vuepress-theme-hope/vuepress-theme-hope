---
title: Информация о блогере
icon: blog
order: 2
category:
  - Блог
tag:
  - Блог
  - Блогер
---

Темы позволяют отображать основную информацию о блогере.

<!-- more -->

![Информация о блогере](./assets/blogger-info-light.png#light)
![Информация о блогере](./assets/blogger-info-dark.png#dark)

## Аватарка и имя блогера

Вы можете настроить аватар и имя блоггера, отображаемые через `blog.avatar` и `blog.name`.

::: note

Если вы не установите эти параметры, они автоматически вернутся к логотипу сайта (`logo` в параметрах темы) и названию сайта.

:::

::: tip

Если вы хотите, чтобы аватар был круглой формы, установите `blog.roundAvatar: true`.

:::

## Девиз, социальные сети и ссылка на профиль

Вы можете использовать `blog.description`, чтобы установить собственное введение, девиз или слоган.

Вы также можете указать личную ссылку на страницу знакомства через `blog.intro`, поэтому, когда пользователи нажимают на аватар и имя, они будут напрямую переходить на эту страницу.

Вы также можете настроить ссылки на социальные сети с помощью опции `blog.medias`.

- Если иконка социальной сети доступен ниже, вы можете напрямую установить `MediaName: MediaLink`.
- В противном случае вы должны передать кортеж `MediaName: [MediaLink , MediaSvgIconString or MediaSvgIconPath]`,

  торой элемент кортежа должен быть допустимой строкой SVG или полным путем к существующему файлу SVG.

::: tip Доступные социальные сети:

- `"Baidu"`
- `"BiliBili"`
- `"Bitbucket"`
- `"Dingding"`
- `"Discord"`
- `"Dribbble"`
- `"Email"`
- `"Evernote"`
- `"Facebook"`
- `"Flipboard"`
- `"Gitee"`
- `"GitHub"`
- `"Gitlab"`
- `"Gmail"`
- `"Instagram"`
- `"Lark"`
- `"Line"`
- `"Linkedin"`
- `"Pinterest"`
- `"Pocket"`
- `"QQ"`
- `"Qzone"`
- `"Reddit"`
- `"Rss"`
- `"Steam"`
- `"Twitter"`
- `"Wechat"`
- `"Weibo"`
- `"Whatsapp"`
- `"Youtube"`
- `"Zhihu"`

:::

:::: details Пример

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    blog: {
      media: {
        // GitHub Icon is available
        GitHub: "https://github.com/Mister-Hope",
        // A custom Media called "MediaX" (just an example)
        MediaX: [
          // link
          "https://mediax.com/UserX/",
          // icon string
          "<svg ....</svg>",
        ],
        // A custom Media called "MediaY" (just an example)
        MediaY: [
          // link
          "https://mediay.com/UserY/",
          // icon path
          path.resolve(__dirname, "icons/mediay.svg"),
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme({
    blog: {
      media: {
        // GitHub Icon is available
        GitHub: "https://github.com/Mister-Hope",
        // A custom Media called "MediaX" (just an example)
        MediaX: [
          // link
          "https://mediax.com/UserX/",
          // icon string
          "<svg ....</svg>",
        ],
        // A custom Media called "MediaY" (just an example)
        MediaY: [
          // link
          "https://mediay.com/UserY/",
          // icon path
          path.resolve(__dirname, "icons/mediay.svg"),
        ],
      },
    },
  }),
};
```

:::

::::
