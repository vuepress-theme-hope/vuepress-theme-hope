---
title: Опции функции темы
icon: splotch
order: 3
category:
  - Конфиг
tag:
  - Функция
  - Конфиг темы
---

Следующие параметры управляют функциями, предоставляемыми темой.

<!-- more -->

## Параметры блога

Тема добавляет функцию блога с помощью <ProjectLink name="blog2">`vuepress-plugin-blog2`</ProjectLink>, и по умолчанию эта функция **отключена**.

Чтобы включить плагин блога и использовать параметры по умолчанию, вы можете установить для `plugins.blog` значение `true` в параметрах темы.

::: warning

Следующие параметры не будут иметь никакого эффекта, если вы не включите плагин блога.

Подробнее смотрите [Введение в функцию блога](../../guide/blog/intro.md).

:::

### blog\.name

- Тип: `string`
- По умолчанию: `author`

Имя блогера.

### blog.avatar

- Тип: `string`
- По умолчанию: `logo`

Аватар блогера.

### blog.description

- Тип: `string`
- Обязательный: Нет

Девиз, слоган или краткое описание.

### blog.intro

- Тип: `string`
- Обязательный: Нет

Личный адрес блогера.

::: note

Посетители могут щелкнуть аватар или имя в разделе «Информация о блогере», чтобы перейти на страницу личного знакомства.

:::

### blog.medias

- Тип: `Record<string, string | [string, string]>`
- Обязательный: Нет

Установите социальные ссылки.

- Если значок социальной сети доступен ниже, вы можете напрямую установить `MediaName: MediaLink`.
- В противном случае вы должны передать кортеж `MediaName: [MediaLink , MediaSvgIconString or MediaSvgIconPath]`,

  Второй элемент кортежа должен быть допустимой строкой SVG или полным путем к существующему файлу SVG.

::: info Доступные социальные сети

Следующие социальные сети имеют встроенные иконки:

- `"Baidu"`
- `"BiliBili"`
- `"Bitbucket"`
- `"Dingding"`
- `"Discord"`
- `"Douban"`
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
- `"Skype"`
- `"Telegram"`
- `"Twitter"`
- `"Wechat"`
- `"Weibo"`
- `"Whatsapp"`
- `"Youtube"`
- `"Zhihu"`

:::

### blog.roundAvatar

- Тип: `boolean`
- По умолчанию: `false`

Обрезка аватара круглой формы

### blog.sidebarDisplay

- Тип: `"mobile" | "none" | "always"`
- По умолчанию: `"mobile"`

Показывать ли информацию о блоггерах на боковой панели

- `"mobile"`: Показывать на боковой панели в мобильной версии
- `"always"`: Всегда показывать на боковой панели
- `"none"`: Никогда не показывать на боковой панели

### blog.timeline

- Тип: `string`
- По умолчанию: `"Yesterday once more"`

Текст в верхней части страницы временной шкалы.

### blog.articlePerPage

- Тип: `number`
- По умолчанию: `10`

Номер статьи на странице

### blog.articleInfo

- Тип: `ArticleInfo[]`
- По умолчанию: `["Author", "Original", "Date", "PageView", "Category", "Tag", "ReadingTime"]`

Информация о статье отображается в списке статей

Доступные значения для `ArticleInfo`:

- `"Author"`
- `"Category"`
- `"Date"`
- `"Original"`
- `"Tag"`
- `"ReadingTime"`
- `"Word"`

::: warning Limitation

ReadingTime and Word are not available in devServer by default, [see reasons and how to enable it](./basic.md#hotreload).

:::

## Зашифровать конфигурацию <Badge text="Только root" type="warning" />

Для получения дополнительной информации смотрите [Введение в шифрование](../../guide/feature/encrypt.md).

::: note

Вы можете установить этот параметр только непосредственно в параметрах темы, его установка в каждой локали **НИКАК не влияет**.

:::

### encrypt.global

- Тип: `boolean`
- По умолчанию: `false`

Шифровать ли глобально.

### encrypt.admin

- Тип: `string | string []`
- Обязательный: Нет

Пароль администратора с наивысшими полномочиями, вы можете установить несколько с помощью массива.

### encrypt.config

- Тип: `Record <string, string | string []>`
- Обязательный: Нет

Конфигурация шифрования — это объект с именем ключа, соответствующим пути, и значением ключа, соответствующим паролю, который принимает строку или массив строк.

::: details Example

```js
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt config/page.html
  "/config/page.html": "1234"
}
```

:::
