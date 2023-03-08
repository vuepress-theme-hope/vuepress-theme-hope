---
title: Поддержка иконок
icon: icons
order: 3
category:
  - Интерфейс
tag:
  - Иконка
  - Интерфейс
head:
  - - "link"
    - rel: stylesheet
      href: //at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css
---

The entire theme adds FontClass / Image format icon support in multiple places.

You can use iconfont, iconify and fontawesome to add icons to your project, and you can also use your own icon assets.

Also, png/svg format icon is supported. You can use full links or pathname to add icons.

We recommend you to use iconify or fontawesome.

<!-- more -->

## Browsing Icons

- Iconify: <https://icon-sets.iconify.design/>
- Iconfont: <https://www.iconfont.cn/?lang=en-us>
- Fontawesome: <https://fontawesome.com/icons>

::: details Featured Icons with iconfont keyword

<IconDisplay link="//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css" />

:::

## Настройка иконок

Вы можете использовать иконку в нескольких местах.

- Страница: установить `icon` в frontmatter

  Эта иконка будет использоваться в навигационной цепочке, заголовке страницы, сгенерированном элементе панели навигации, сгенерированном элементе боковой панели, навигации страницы и т. д.

- Navbar: установите опцию `icon` в NavbarItemConfig

- Sidebar: установите опцию `icon` в SidebarItemConfig

- HomePage: установите опцию `icon` в элементе функции

## Global Settings

You can set icon assets url and icon prefix globally via `iconAssets` and `iconPrefix`.

### Setting Icon Assets

You should set icon related assets to `iconAssets`, where you can set:

- icon assets keywords
- icon resource in format of css and js
- array of above

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // keywords: "iconfont", "iconify", "fontawesome", "fontawesome-with-brands"
    iconAssets: "fontawesome",

    // an url you like
    iconAssets: "/base/my/font-icon/resource.js",

    // an array of above
    iconAssets: [
      "/base/my/font-icon/resource.js",
      "https://example/my/fonr-icon/resouce.css",
      "fontawesome",
    ],
  }),
});
```

@tab JS

```js {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // keywords: "iconfont", "iconify", "fontawesome", "fontawesome-with-brands"
    iconAssets: "fontawesome",

    // an url you like
    iconAssets: "/base/my/font-icon/resource.js",

    // an array of above
    iconAssets: [
      "/base/my/font-icon/resource.js",
      "https://example/my/fonr-icon/resouce.css",
      "fontawesome",
    ],
  }),
});
```

:::

For example, you may use [iconfont.cn](https://www.iconfont.cn/?lang=en-us) and [fontawesome](https://fontawesome.com) to generate your own assets.

To keep it simple, we add built-in keywords `"iconfont"`, `"iconify"`, `"fontawesome"` and `"fontawesome-with-brand` support for you to get started easily.

::: danger

If you use this plugin for commercial project documentation, `iconfont` is **not recommended** as iconfont itself is a study/share platform for designers and developers.

Every icon is uploaded by users and you must get authorized from the author for commercial usage. Also there could be chance where the uploader obeys usage term. and upload icons where its copyright is at 3rd party.

:::

### Setting Icon Prefix

`iconPrefix` is the icon prefix where you want to set,

Normally, there should be a common prefix for your icon class, for `iconfont` icon classes are `iconfont icon-<ICON-NAME>` and for fontawesome free icon classes are `fas fa-<icon-name>`. So when you are setting the above `assets` option with keywords or a single link generated from iconfont website, fontawesome kit or fontawesome CDN, the plugin recognize those and set prefix as `"iconfont icon-"` and `"fas fa-"` automatically for you.

In other cases where you use iconify or your own url, you can manually set this options yourself. After all writing `icon: apple` is always better then something like `icon: iconfont icon-apple`, `icon: mdi:icon-apple` or `icon: fa-solid fa-apple`.

## Advanced

### Using Fontawesome Kits

You can purchase at [fontawesome.com](https://fontawesome.com) to use kits or import brand icons.

Fontawesome kits with pro features support pro icons, more icon styles and uploading your own icons.

::: note

For details, please follow [fontawesome document](https://fontawesome.com/).

- [Usage Instructions](https://fontawesome.com/docs/web/add-icons/how-to)
- [Icon List](https://fontawesome.com/icons)

:::

### Generate your own iconfont assets

[Iconfont](https://www.iconfont.cn/?lang=en-us) — это платформа для управления векторными иконками и коммуникации, созданная Alimama MUX.

Дизайнер загружает иконку на платформу Iconfont, а пользователь может настроить загрузку иконок в различных форматах. Пользователи также могут преобразовать иконку в шрифт.

#### Как использовать

Во-первых, вам нужно создать новый проект для установки и управления иконками вашего сайта:

1. Войдите в Iconfont с помощью GitHub или Weibo.
1. Найдите "Resources → My Projects" в верхней части веб-сайта и щелкните иконку "New Project" в правом верхнем углу.
1. Установите узнаваемое название проекта
1. Заполните `FontClass/Symbol prefix` с `icon-` (вы также можете заполнить в соответствии с вашими предпочтениями, но вам нужно установить это значение `iconPrefix` в настройках темы с дополнительным префиксом `iconfont`)
1. Семейство шрифтов, пожалуйста, сохраните `iconfont`

![Новый проект](./assets/iconfont-new.png)

#### Импорт иконки

1. Свободно ищите через iconfont, чтобы найти иконку, которую вы хотите использовать, и нажмите кнопку "Add to Library" на иконке

   ![Добавить в библиотеку](./assets/iconfont-add.png)

1. После поиска всех значков щелкните иконку "Add to Library" в правом верхнем углу, нажмите "Add to Project" ниже и выберите созданный проект, затем подтвердите.

#### Редактирование иконки

На странице проекта вы можете редактировать иконки в проекте, включая настройки положения, размера, поворота, цвета, номера Unicode и класса/символа шрифта.

![Редактирование иконки](./assets/iconfont-edit.png)

#### Создание файлов иконок

1. Нажмите кнопку "Font Class" над проектом и нажмите "Generate".

   ![Создание иконки](./assets/iconfont-generate.png)

1. Установите ссылку css на `iconAssets` в настройках темы.

#### Tips

::: tip

Если вы добавите новую иконку в будущем, повторно создайте новый адрес CSS и установите для него значение `iconAssets` в параметрах темы.

:::

::: warning Conflicts with private character

Font Icon associate each icon with a character in unicode private character scope, the character used by iconfont is randomly.

Iconfont will try to solve conflicts by assigning a new character if a new icon's default character is already used in current project, however different projects may have conflicts.

So we do not recommend you to use multiple iconfont links as assets, if you ready want to do so, check the icons to ensure every former project icon is not covered by those in latter ones.

:::

<script setup lang="ts">
import IconDisplay from '@IconDisplay';
</script>
