---
title: Руководство по миграции конфигурации
icon: config
category:
  - Миграция
tag:
  - Миграция
  - Конфиг темы
---

::: code-tabs#language

@tab TS

```diff
  // .vuepress/config.ts
- import theme from "vuepress-theme-hope";
+ import { defineUserConfig } from "vuepress";
+ import { hopeTheme } from "vuepress-theme-hope";

- export default theme.config({
+ export default defineUserConfig({
    // your site config here
    // ...

-   themeConfig:{
+   theme: hopeTheme({
      // your theme config here
      // ...
-   },
+   }),
  });
```

@tab JS

```diff
// .vuepress/config.js
- const { config } = require("vuepress-theme-hope");
+ import { hopeTheme } from "vuepress-theme-hope";

- module.exports = theme.config({
+ export default {
    // your site config here
    // ...

-   themeConfig:{
+   theme: hopeTheme({
      // your theme config here
      // ...
-   },
+   }),
- });
+ };
```

:::

## Использование темы

- переименован `themeConfig` в `hopeTheme`
- переименован `navbarConfig` в `navbar`
- переименован `sidebarConfig` в `sidebar`
- добавлены помощники `arraySidebar` и `objectSidebar`
- удален `config`

## Параметры темы

- изменен тип `author` с `string | undefined` на `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    name: string;
    url?: string;
  }
  ```

  Это изменение позволяет вам добавлять нескольких авторов и устанавливать для них сайты.

### Панель навигации

- унифицирован `nav`, `navbar` в `navbar`

- переименован `darkLogo` в `logoDark`

- переименован `navAutoHide`в `navbarAutoHide`

- добавлена опция `navbarIcon` для управления отображением иконки на панели навигации

- добавлена опция `navbarLayout` для управления макетом панели навигации

### Боковая панель

- переименован `sidebarDepth` в `headerDepth`

- удален `displayAllHeaders`

### Конфигурация боковой панели навигации унифицирована

- изменено `items` в конфигурации панели навигации на `children`

- изменено `title` на `text` и `path` в `link` в конфигурации боковой панели.

- Навигационная панель V2 поддерживает установку пути к файлу Markdown непосредственно, как боковую панель, для автоматического создания текста, иконок и ссылок

- добавлен `activeMatch` для управления активацией маршрута

Таким образом, оба они объединены как `text`, `icon`, `prefix`, `link`, `children`, `activeMatch`.

### Поиск

Так как тема больше не имеет встроенного поиска:

- удален `search`, `searchPlaceholder`, `searchMaxSuggestions`

- удален `algolia`, `algoliaType`

### Ссылка на страницу

- переименован `prevLinks` в `prevLink`

- переименован `nextLinks` в `nextLink`

- переименован `editLinks` в `editLink`

- переименован `updateTime` в `lastUpdated`

### Outlook

- добавлена опция `iconAssets`

- значение по умолчанию `iconPrefix` теперь выводится из `iconAssets`

- обновлены значения параметра `darkmode`

  - добавлен `"enable"`
  - переименован `"switch"` в `"toggle"`
  - переименован `"auto-switch"` в `"switch"`

- `themeColor` и `fullscreen` отключены по умолчанию

### Конфигурация блога

- поддержка отдельного конфига на каждом языке

- добавлен `blog.description`, чтобы установить описание блоггера или девиз

- переименован `blog.links` в `blog.medias`

- изменить значение по умолчанию `blog.roundAvatar` с `true` на `false`

- переименован `blog.perPage` в `blog.articlePerPage`

- перемещен `blog.autoExcerpt` в `plugins.blog.autoExcerpt` и измените значение по умолчанию с `true` на `false`

### Конфигурация шифрования

- изменен `encrypt.status: "global" | "local"` (по умолчанию `"local"`) на `encrypt.global: boolean` (по умолчанию `false`)

- переименован `encrypt.global` в `encrypt.admin`

### Пользовательский макет

- удален `custom`

### Макет страницы

- переименован `anchorDisplay` в `toc`

### Скорость чтения

- перемещен `wordPerMinute` в `plugins.readingTime.wordPerMinute`

## Изменения плагина

### Дополнение

- добавлен `plugins.blog` для управления ссылками на блоги
- добавлен `plugins.nprogress` для управления nprogress
- добавлен `plugins.prismjs` для управления Prism.js

### Изменения

Переместите все параметры, связанные с плагинами, в раздел `plugins`.

- переименован `activeHash` в `plugins.activeHeaderLinks`

  Тема теперь использует официальный плагин `@vuepress/plugin-active-header-links`. ![warning](https://img.shields.io/badge/-warning-yellow)

- перемещен `comment` в `plugins.comment`

  - Добавлена поддержка `twikoo` и `giscus` ![New](https://img.shields.io/badge/-New-brightgreen)

  - Vssue в настоящее время отсутствует ![warning](https://img.shields.io/badge/-warning-yellow)

    Vssue написан на Vue2, и автор [meteorlxy](https://github.com/meteorlxy) еще не сделал его совместимым с Vue3

  - Служба Valine удалена ![removed](https://img.shields.io/badge/-removed-red)

    Valine не требует обслуживания и может привести к утечке вашей конфиденциальности. Вместо этого вы должны использовать [Waline](https://waline.js.org).

- перемещен `copyCode` в `plugins.copyCode`

- перемещен `copyright` в `plugins.copyright`

  Плагин сейчас отключен по умолчанию. ![warning](https://img.shields.io/badge/-warning-yellow)

- перемещен `feed` в `plugins.feed`

  - Поддерживает удаление пользовательских компонентов и элементов с помощью параметров `plugins.feed.customElements` ![NEW](https://img.shields.io/badge/-new-brightgreen)

  - Настройте генерацию ленты с помощью опцию `plugins.feed.getter` ![NEW](https://img.shields.io/badge/-new-brightgreen)

  - Поддержка нескольких категорий ![New](https://img.shields.io/badge/-new-brightgreen)

  - Переместите все параметры вывода из параметра `plugins.feed.output` в корневой каталог параметров плагина и переименуйте их.

    - `feed.output.atom.enable` переименован `plugins.feed.atom` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.json.enable` переименован `plugins.feed.json` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.rss.enable` переименован `plugins.feed.rss` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.atom.path` переименован `plugins.feed.atomOutputFilename` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.json.path` переименован `plugins.feed.jsonOutputFilename` ![changed](https://img.shields.io/badge/-changed-yellow)

    - `feed.output.rss.path` переименован `plugins.feed.rssOutputFilename`

    - `plugins.feed.atom`, `plugins.feed.json` и `plugins.feed.rss` по умолчанию имеют значение `false` ![warning](https://img.shields.io/badge/-warning-yellow)

      Тема больше не выводит файлы ленты в трех форматах по умолчанию. При необходимости установите параметры для необходимых выходных форматов.

- перемещен `git` в `plugins.git`

  Тема теперь использует официальный плагин `@vuepress/plugin-git`. ![warning](https://img.shields.io/badge/-warning-yellow)

- перемещен `mdEnhance` в `plugins.mdEnhance`

  - проверка ссылок в разметке ![New](https://img.shields.io/badge/-New-brightgreen)

    Плагин теперь проверяет ваши уцененные ссылки и предупреждает вас при обнаружении неработающих ссылок.

    Вы можете контролировать это поведение с помощью опции `plugins.mdEnhance.linkCheck`

  - поддержка метки изображения ![New](https://img.shields.io/badge/-New-brightgreen)

    Используйте суффикс `#light` и `#dark`, чтобы пометить изображения, чтобы отображать их в светлом или темном режиме с помощью опции `plugins.mdEnhance.imageMark`

  - Поддержка chart.js ![New](https://img.shields.io/badge/-New-brightgreen)

    Добавлена поддержка [chart.js](https://www.chartjs.org/docs/latest/) через опцию `plugins.mdEnhance.chart`

    ````md
    ::: chart Title

    ```json
    {
      // chart.js config
    }
    ```

    :::

    ::: chart Title

    ```js
    module.exports = {
      // chart.js config
    };
    ```

    :::
    ````

  - Поддержка ECharts ![New](https://img.shields.io/badge/-New-brightgreen)

    Добавлена поддержка [ECharts](https://echarts.apache.org/en/index.html) через опцию `plugins.mdEnhance.echarts`

    ````md
    ::: echarts Title

    ```json
    {
      // chart.js config
    }
    ```

    :::

    ::: echarts Title

    ```js
    module.exports = {
      // chart.js config
    };
    ```

    :::
    ````

  - контент включает поддержку ![New](https://img.shields.io/badge/-New-brightgreen)

    использует `@include()`, чтобы включить другое содержимое файла в уценку с помощью параметров `plugins.mdEnhance.include`.

    Использует `@include(filename)`, чтобы включить файл.

    Чтобы частично импортировать файл, вы можете указать диапазон включаемых строк:

    - `@include(filename{start-end})`
    - `@include(filename{start-})`
    - `@include(filename{-end})`

  - поддержка вкладок ![New](https://img.shields.io/badge/-New-brightgreen)

    Использует контейнер `tabs` для создания вкладок через опцию `plugins.mdEnhance.tabs`.

  - добавлен `plugins.mdEnhance.gfm` ![New](https://img.shields.io/badge/-New-brightgreen)

    Управление с поддержкой gfm

  - добавлен `plugins.mdEnhance.vPre` ![New](https://img.shields.io/badge/-New-brightgreen)

    Следующий синтаксис больше не встроен в VuePress2, поэтому мы добавляем эту опцию.

    ```md
    ::: v-pre

    :::
    ```

  - переименован `mdEnhance.codegroup` в `plugins.mdEnhance.codetabs` ![changed](https://img.shields.io/badge/-changed-yellow)

  - переименован `mdEnhance.lazyload` в `plugins.mdEnhance.imageLazyload` изменение значение по умолчанию с `true` на `false` ![changed](https://img.shields.io/badge/-changed-yellow)

  - удалено `plugins.mdEnhance.lineNumbers` ![removed](https://img.shields.io/badge/-removed-red)

    VuePress2 поддерживает настройку номеров строк для отдельных блоков кода

  - удалено `plugins.mdEnhance.imageFix` ![removed](https://img.shields.io/badge/-removed-red)

    Проблемы, связанные с изображением, были исправлены в версии 2

- перемещен `photoSwipe` в `plugins.photoSwipe`

- перемещен `pwa` в `plugins.pwa`

  - `plugins.pwa.update` ![New](https://img.shields.io/badge/-New-brightgreen): управление логикой обновления SW

    - `"disabled"`: Ничего не делать, даже когда доступен новый service worker. После успешной установки новой службы и начала ожидания она будет контролировать страницу и предоставлять новый контент при следующем посещении.

    - `"available"`: Отображать всплывающее окно обновления только тогда, когда доступен новый service worker

    - `"hint"`: Отображать подсказку, позволяющую пользователю выбрать немедленное обновление

    - `"force"`: Немедленно отменить регистрацию текущего сервисного работника, а затем обновить его, чтобы получить новый контент

  - `plugins.pwa.appendBase` ![New](https://img.shields.io/badge/-New-brightgreen): автоматически вставляет `base` в опцию `manifest`

  - `plugins.pwa.hintComponent` ![New](https://img.shields.io/badge/-New-brightgreen): Компонент подсказки для обнаружения нового контента

  - Подсказка shouldPrefetch ![New](https://img.shields.io/badge/-New-brightgreen): Теперь плагин будет проверять опцию `shouldPrefetch` в конфигурационном файле и предупреждать вас, чтобы вы отключили ее.

  - Значение по умолчанию `plugins.pwa.cacheHTML` изменено с `true` на `false` ![changed](https://img.shields.io/badge/-changed-yellow)

    Это может эффективно сократить время обновления SW

  - `pwa.popupComponent` переименован в `plugins.pwa.updateComponent` ![changed](https://img.shields.io/badge/-changed-yellow)

    Это связано с тем, что мы добавили новое всплывающее окно подсказки, поэтому нам нужно избежать путаницы в именах

- перемещен `readingTime` в `plugins.readingTime`

- перемещен `seo` в `plugins.seo`

  - Поддержка JSON-LD ![New](https://img.shields.io/badge/-New-brightgreen)

    Плагин теперь может генерировать для вас теги сценария JSON-LD и предоставляет опцию `plugin.seo.jsonLd`, позволяющую настраивать свойства JSON-LD.

  - Генерация описания ![New](https://img.shields.io/badge/-New-brightgreen)

    Плагин может автоматически генерировать описание для вас с помощью параметров `plugin.seo.autoDescription`

  - Каноническая ссылка ![New](https://img.shields.io/badge/-New-brightgreen)

    Вы можете установить каноническую ссылку с помощью опции `plugin.seo.canonicalLink`. Это полезно, когда ваша документация

  - `seo.customMeta` переименован в `plugin.seo.customHead` ![changed](https://img.shields.io/badge/-changed-yellow)

    Теперь вы можете редактировать все теги заголовка, а не только мета в версии 1.
    развернуты в нескольких местах.

- перемещен `sitemap` в `plugins.sitemap`

  - `plugin.sitemap.priority` ![New](https://img.shields.io/badge/-New-brightgreen): установка значения по умолчанию для приоритета

  - `sitemap.urls` переименован в `plugin.sitemap.extraUrls` ![changed](https://img.shields.io/badge/-changed-yellow)

  - `sitemap.exclude` переименован в `plugin.sitemap.excludeUrls` ![changed](https://img.shields.io/badge/-changed-yellow)

  - `sitemap.outFile` переименован в `plugin.sitemap.sitemapFilename` ![changed](https://img.shields.io/badge/-changed-yellow)

  - `sitemap.modifyTimeGetter` переименован в `plugin.sitemap.modifyTimeGetter` ![changed](https://img.shields.io/badge/-changed-yellow)

### Удаление

- удалено `chunkRename`

  Тема больше не предоставляет эту функцию.

- удалено `cleanUrl`

  Тема больше не предоставляет эту функцию.

- удалено `git`

  Тема теперь использует официальный плагин `@vuepress/plugin-git`.

- удалено `smoothScroll`

  Тема теперь обеспечивает плавную прокрутку с помощью CSS и больше не обеспечивает совместимость со старыми браузерами.
