---
title: Конфиг других плагинов
icon: more
order: 8
category:
  - Конфиг
tag:
  - Конфигурация плагина
  - Конфиг темы
---

## components

Зарегистрируйте компоненты, которые можно использовать в файлах Markdown, доступные имена компонентов:

- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"PDF"`
- `"StackBlitz"`
- `"VideoPlayer"`
- `"YouTube"`

Вы можете установить `plugin.components` с массивом компонентов, которые вы хотите, по умолчанию это будет `["Badge"]`.

## copyCode <Badge text="включено по умолчанию" />

Управляет `vuepress-plugin-copy-code2`, предоставляя кнопку копирования кода.

По умолчанию никаких настроек не требуется. Если вам не нужна эта функция, установите значение `false`.

::: info

Параметры плагина см. в разделе [параметры плагина copy-code2][copy-code-config].

:::

## git <Badge text="enabled in production" />

Управляет `@vuepress/plugin-git` для предоставления информации о файле через историю коммитов Git.

По умолчанию он включен только в режиме сборки для повышения производительности сервера разработки. Вы можете вручную установить логическое значение для управления состоянием плагина или указать параметры плагина.

::: info

Смотрите [Параметры плагина git][git-config] для опций плагина.

:::

## nprogress <Badge text="включено по умолчанию" />

Управляет `@vuepress/plugin-nprogress` и предоставляет индикатор выполнения при переключении страниц через nprogress.

По умолчанию тема включает этот плагин, вы можете установить `false`, чтобы отключить его.

## prismjs <Badge text="включено по умолчанию" />

Управляет `@vuepress/plugin-prismjs`, чтобы обеспечить подсветку блока кода через PrismJS.

По умолчанию тема включает этот плагин, вы можете установить `false`, чтобы отключить его и самостоятельно выделять блоки кода.

::: info

Смотрите [Параметры плагина prismjs][prismjs-config] для опций плагина.

:::

## photoSwipe <Badge text="включено по умолчанию" />

Управляет `vuepress-plugin-photo-swipe`, обеспечивая функцию просмотра изображений.

По умолчанию никаких настроек не требуется. Если вам не нужна эта функция, установите значение `false`.

::: info

Параметры плагина смотрите в разделе [параметры плагина photo-swipe][photo-swipe-config].

:::

## readingTime <Badge text="включено по умолчанию" />

Управляет `vuepress-plugin-reading-time2`, подсчитывая количество слов на странице и генерируя расчетное время чтения.

### readingTime.wordPerMinute

- Тип: `number`
- По умолчанию: `300`

Слов, прочитанных за минуту.

::: info

Дополнительные параметры плагина смотрите в [документации плагина reading-time2][reading-time].

:::

## seo <Badge text="включено по умолчанию" />

Управляет `vuepress-plugin-seo2`, обеспечивая улучшения поисковой системы.

По умолчанию никаких настроек не требуется. Если вам не нужна эта функция, установите значение `false`.

::: info

Конфигурацию плагина см. в разделе [параметры плагина seo2][seo-config].

:::

## sitemap <Badge text="включено по умолчанию" />

Управляет `vuepress-plugin-seo2`, обеспечивая автоматическое создание карты сайта.

По умолчанию никаких настроек не требуется. Если вам не нужна эта функция, установите значение `false`.

::: info

Конфигурацию плагина смотрите в разделе [параметры плагина sitemap2][sitemap-config].

:::

[copy-code-config]: https://vuepress-theme-hope.github.io/v2/copy-code/config.html
[git-config]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
[prismjs-config]: https://v2.vuepress.vuejs.org/reference/plugin/prismjs.html
[photo-swipe-config]: https://vuepress-theme-hope.github.io/v2/photo-swipe/config.html
[reading-time]: https://vuepress-theme-hope.github.io/v2/reading-time/
[seo-config]: https://vuepress-theme-hope.github.io/v2/seo/config.html
[sitemap-config]: https://vuepress-theme-hope.github.io/v2/sitemap/config.html
