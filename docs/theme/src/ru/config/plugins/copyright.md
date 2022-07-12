---
title: Конфиг плагина авторского права
icon: copyright
order: 4
category:
  - Конфиг
tag:
  - Авторские права
  - Конфигурация плагина
  - Конфиг темы
---

## Введение

Плагин `vuepress-plugin-copyright2` может добавлять информацию об авторских правах, когда пользователи копируют контент с вашего сайта. Кроме того, вы можете отключить копирование или выбор сайта с помощью этого плагина.

Этот плагин по умолчанию отключен.

`vuepress-theme-hope` передает `plugins.copyright` в параметрах темы в качестве параметров плагина для плагина `vuepress-plugin-copyright2`.

## Опции плагина

### hostname

- Тип: `string`
- Обязательный: Нет

Деплой hostname

### author

- Тип: `string | ((page: Page) => string)`
- Обязательный: Нет

Информация об авторе

### license

- Тип: `string | ((page: Page) => string)`
- Обязательный: Нет

Информация о лицензии

### triggerWords

- Тип: `number`
- По умолчанию: `100`

Минимальные слова, вызывающие добавление авторских прав

### global

- Тип: `boolean`
- По умолчанию: `false`

Включено ли глобально

### disableCopy

- Тип: `boolean`
- По умолчанию: `false`

Отключить копирование

### disableSelection

- Тип: `boolean`
- По умолчанию: `false`

Отключить выбор

### locales

- Тип: `CopyrightLocaleConfig`

  ```ts
  interface CopyrightLocaleData {
    /**
     * Author text
     *
     * @description `:author` will be replaced by author
     */
    author: string;

    /**
     * License text
     *
     * @description `:license` will be replaced by current license
     */
    license: string;

    /**
     * Link text
     *
     * @description `:url` will be replaced by current page link
     */
    link: string;
  }

  interface CopyrightLocaleConfig {
    [localePath: string]: CopyrightLocaleData;
  }
  ```

- Обязательный: Нет

Конфигурация локали для плагина авторских прав.
