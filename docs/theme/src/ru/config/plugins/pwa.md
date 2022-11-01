---
title: Конфиг плагина PWA
icon: app
order: 7
category:
  - Конфиг
tag:
  - PWA
  - Конфигурация плагина
  - Конфиг темы
---

## Введение

Плагин `vuepress-plugin-pwa2` обеспечивает прогрессивную поддержку веб-приложений.

`vuepress-theme-hope` передает `plugins.pwa` в параметрах темы в качестве параметров плагина для плагина `vuepress-plugin-pwa2`.

::: tip Быстрое включение

Чтобы просто включить эту функцию, вы можете установить `pwa: true`. <Badge text="Быстрое включение не рекомендуется" type="warning" />

:::

::: info

Подробности смотрите в [документации плагина pwa2][pwa-config].

:::

## Опции плагина

### showInstall

- Тип: `boolean`
- По умолчанию: `true`

Отображать ли кнопку установки при первой успешной регистрации Service Worker.

### manifest

- Тип: `ManifestOption`
- Обязательный: Нет

Вы можете заполнить объект, который будет проанализирован в manifest.webmanifest.

::: tip

Некоторые параметры имеют запасной вариант, если вы их не установите.

- name: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- short_name: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- description: `siteConfig.description` || `siteConfig.locales['/'].description` || `"A site built with vuepress"`
- lang: `siteConfig.locales['/'].lang` || `"en-US"`
- start_url: `context.base`
- scope: `context.base`

- display: `"standalone"`
- theme_color: `"#46bd87"`
- background_color: `"#ffffff"`
- orientation: `"portrait-primary"`
- prefer_related_applications: `false`

:::

::: info Более

Документы по манифесту смотрите в [Манифесте W3C](https://w3c.github.io/manifest/)

:::

### favicon

- Тип: `string`
- Обязательный: Нет

Путь favicon.ico с абсолютным путем.

::: warning

Мы рекомендуем вам установить favicon для вашего сайта

:::

### themeColor

- Тип: `string`
- По умолчанию: `"#46bd87"`

Цвет темы, по умолчанию тема зеленая.

### maxSize

- Тип: `number`
- По умолчанию: `2048`

Максимальный размер, который позволяет кэшировать, с единицей КБ

::: warning

Этот параметр имеет наивысший приоритет, и любые файлы, превышающие это значение, будут исключены.

Поэтому, если вы создаете очень большие файлы HTML или JS, рассмотрите возможность увеличения этого значения, иначе ваше PWA может не работать нормально в автономном режиме.

:::

### cacheHTML

- Тип: `boolean`
- По умолчанию: `false`

Кэшировать ли файлы HTML, кроме домашней страницы и страницы 404.

### cachePic

- Тип: `boolean`
- По умолчанию: `false`

Кешировать ли картинки.

### maxPicSize

- Тип: `number`
- По умолчанию: `1024`

Максимальный размер изображения, который позволяет кэшировать, с единицей КБ.

### update

- Тип: `"disabled" | "available" | "hint" | "force"`
- По умолчанию: `"available"`

Логика управления при обнаружении нового контента.

- `"disabled"`: Ничего не делать, даже когда доступен новый service worker. После успешной установки новой службы и начала ожидания она будет контролировать страницу и предоставлять новый контент при следующем посещении

- `"available"`: Отображать всплывающее окно обновления только тогда, когда доступен новый service worker

- `"hint"`: Отображать подсказку, позволяющую пользователю выбрать немедленное обновление

  Это удобно, если вы хотите, чтобы пользователи сразу же увидели новые документации.

  ::: note

  Если пользователи выберут обновление, текущий сервисный работник будет отменен, и запрос начнет поступать в сеть. Позже новый service worker начнет установку и будет контролировать текущую страницу после установки.

  :::

- `"force"`: немедленно отмените регистрацию текущего сервисного работника, затем обновите его, чтобы получить новый контент

  ::: danger

  Хотя это гарантирует, что пользователи посещают новейший контент, но это может повлиять на впечатления от посещения.

  :::

::: warning

То, как обновляются документы, контролируется предыдущей версией, поэтому текущий параметр влияет только на следующее обновление этой версии.

:::

### apple

Специальные настройки для Apple

> Если не хотите производить детальные настройки, можете смело проигнорировать; если вы не хотите, чтобы ваш сайт был совместим с Safari на Apple, установите для него значение `false`.

#### apple.icon

- Тип: `string`
- Обязательный: Нет

Введите адрес иконки, используемый Apple, рекомендуемый размер 152×152.

#### apple.statusBarColor

- Тип: `"black" | "white"`
- По умолчанию: `"black"`

Цвет строки состояния Apple

#### apple.maskIcon

- Тип: `string`
- Обязательный: Нет

Иконка маски сафари.

### msTile

Специальные настройки для плиток Microsoft

> Если не хотите производить детальные настройки, можете смело проигнорировать; если вы не хотите, чтобы ваш сайт был совместим с Windows, установите для него значение `false`.

#### msTile.image

- Тип: `string`
- Обязательный: Нет

Иконка плитки.

#### msTile.color

- Тип: `string`
- Значение по умолчанию: `themeColor`

Цвет плитки автоматически вернется к themeColor, если вы его не установите.

### hintComponent

- Тип: `string`
- По умолчанию: `"SWHintPopup"`

Вы можете указать путь к компоненту всплывающей подсказки.

### updateComponent

- Тип: `string`
- По умолчанию: `"SWUpdatePopup"`

Вы можете заполнить собственный путь к компоненту всплывающего окна обновления.

### appendBase

- Тип: `boolean`
- По умолчанию: `false`

Добавлять ли базу ко всем абсолютным ссылкам.

### generateSwConfig

Параметры, переданные в `workbox-build`, подробнее смотрите в [документации Workbox](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

### locales

- Тип: `PWALocaleConfig`

  ```ts
  interface PWALocaleData {
    /**
     * Install button text
     */
    install: string;

    /**
     * iOS install hint text
     */
    iOSInstall: string;

    /**
     * Cancel button text
     */
    cancel: string;

    /**
     * Close button text
     */
    close: string;

    /**
     * Previous image text
     */
    prevImage: string;

    /**
     * Next image text
     */
    nextImage: string;

    /**
     * Install explain text
     */
    explain: string;

    /**
     * Description label text
     */
    desc: string;

    /**
     * Feature label text
     */
    feature: string;

    /**
     * Update hint text
     */
    hint: string;

    /**
     * Update available text
     */
    update: string;
  }

  interface PWALocaleConfig {
    [localePath: string]: PWALocaleData;
  }
  ```

- Обязательный: Нет

Конфигурация локалей для плагина pwa.

[pwa-config]: https://vuepress-theme-hope.github.io/v2/pwa/config.html
