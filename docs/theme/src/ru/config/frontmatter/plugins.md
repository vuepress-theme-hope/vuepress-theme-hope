---
title: Конфиг плагина Frontmatter
icon: puzzle-piece
order: 3
category:
  - Конфиг
tag:
  - Frontmatter
  - Плагин
---

Вы можете настроить следующие параметры в frontmatter страницы, чтобы контролировать поведение плагина.

## Плагин `copyright2`

### copy.triggerWords

- Тип: `number`
- По умолчанию: `100`

Минимальные слова, вызывающие добавление авторских прав.

### copy.disableCopy

- Тип: `boolean`
- По умолчанию: `false`

Отключить копирование.

### copy.disableSelection

- Тип: `boolean`
- По умолчанию: `false`

Отключить выбор.

## Плагин `feed2`

### feed.title

- Тип: `string`

Название элемента потока

### feed.description

- Тип: `string`

Описание потока

### feed.content

- Тип: `string`

Содержимое потока

### feed.author

- Тип: `FeedAuthor[] | FeedAuthor`

Автор элемента потока

::: details Формат FeedAuthor

```ts
interface FeedAuthor {
  /**
   * Author name
   */
  name?: string;

  /**
   * Author email
   */
  email?: string;

  /**
   * Author site
   *
   * @description json format only
   */
  url?: string;

  /**
   * Author avatar
   *
   * @description json format only
   */
  avatar?: string;
}
```

:::

### feed.contributor

- Тип: `FeedContributor[] | FeedContributor`

Участники потока

::: details FeedContributor format

```ts
interface FeedContributor {
  /**
   * Author name
   */
  name?: string;

  /**
   * Author email
   */
  email?: string;

  /**
   * Author site
   *
   * @description json format only
   */
  url?: string;

  /**
   * Author avatar
   *
   * @description json format only
   */
  avatar?: string;
}
```

:::

### feed.guid

- Тип: `string`

Идентификатор элемента потока, используемый для идентификации элемента потока.

::: note

Вы должны убедиться, что это глобально уникально.

:::

## Плагин `sitemap2`

### sitemap.changefreq

- Тип: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- По умолчанию: `"daily"`

Частота обновления страницы по умолчанию. Это переопределит changefreq в параметрах плагина.

### sitemap.exclude

- Тип: `boolean`
- По умолчанию: `false`

Исключить ли страницу из карты сайта

### sitemap.priority

- Тип: `number`
- По умолчанию: `0.5`

Приоритет страницы, диапазон от `0` до `1`.
