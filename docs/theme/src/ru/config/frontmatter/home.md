---
title: Конфигурация главной страницы Frontmatter
icon: home
order: 4
category:
  - Конфиг
tag:
  - Frontmatter
  - Главная
---

## home

- Тип: `boolean`
- По умолчанию: `false`

Включить стиль домашней страницы при значении `true`

## title

- Тип: `string`
- Обязательный: Нет

Название страницы будет использоваться в хлебных крошках, СЕО и т. д.

## heroText

- Тип: `string | false`
- По умолчанию: `"Hello"`

Заголовок Hero

## tagline

- Тип: `string | false`
- По умолчанию: `"Welcome to your VuePress site"`

Краткое описание в hero

## heroImage

- Тип: `string`
- Обязательный: Нет

Адрес изображения hero (логотипа), необходимо указать как абсолютный путь (изображения необходимо поместить в папку `.vuepress/public`)

## heroImageDark

- Тип: `string`
- Обязательный: Нет

Адрес hero (логотипа) темного режима, необходимо указать как абсолютный путь (изображения должны быть помещены в папку `.vuepress/public`), по умолчанию будет таким же, как и `heroImage`.

## heroAlt

- Тип: `string`
- Обязательный: Нет

Альтернативный текст иконки Home

## actions

- Тип: `ThemeHomeActionOptions[]`

  ```ts
  interface ThemeHomeActionOptions {
    /**
     * Action name
     */
    text: string;

    /**
     * Action link
     */
    link: string;

    /**
     * Type of action
     * @default 'default'
     */
    type?: "primary" | "default";
  }
  ```

- Обязательный: Нет

Действия Home

## features

- Тип: `ThemeHomeFeatureOptions[]`

  ```ts
  interface ThemeHomeFeatureOptions {
    /**
     * Feature name
     */
    title: string;

    /**
     * Feature description
     */
    details: string;

    /**
     * Feature icon
     *
     * @description image link or icon fontClass are supported
     */
    icon?: string;

    /**
     * Feature link
     */
    link?: string;
  }
  ```

- Обязательный: Нет

Описание возможностей
