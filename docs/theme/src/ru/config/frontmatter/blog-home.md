---
title: Конфигурация главной страницы блога Frontmatter
icon: blog
order: 5
category:
  - Config
tag:
  - Frontmatter
  - Главная блога
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

Адрес главного героя (логотипа) необходимо указать как абсолютный путь (изображения должны быть помещены в папку `.vuepress/public`)

## heroImageDark

- Тип: `string`
- Обязательный: Нет

Адрес главного героя (логотипа) темного режима, необходимо указать как абсолютный путь (изображения должны быть помещены в папку `.vuepress/public`), по умолчанию будет таким же, как и `heroImage`.

## heroAlt

- Тип: `string`
- Обязательный: Нет

Альтернативный текст иконки Home

## bgImage

- Тип: `string | false`
- По умолчанию: A built-in picture

Ссылка на фоновое изображение, вы должны указать абсолютный путь или полный путь. Если не заполнить, будет автоматически применено landscape изображение по умолчанию

## bgImageStyle

- Тип: `Record<string, string> | string`
- Обязательный: Нет

Стиль CSS фонового изображения

## heroImageStyle

- Тип: `Record<string, string> | string`
- Обязательный: Нет

Стиль CSS для иконки home

## heroFullScreen

- Тип: `boolean`
- По умолчанию: `false`

Отображается ли Hero в полноэкранном режиме

## projects

- Тип: `ThemeBlogHomeProjectOptions[]`

  ```ts
  interface ThemeBlogHomeProjectOptions {
    /**
     * Project name
     */
    name: string;

    /**
     * Project description
     */
    desc?: string;

    /**
     * Project link
     */
    link: string;

    /**
     * Project icon
     *
     * @description image link or icon fontClass are supported, as well as `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
     */
    icon?: string;
  }
  ```

- Обязательный: Нет

Список проектов
