---
title: СЕО
icon: dumbbell
category:
  - Продвинутые
tag:
  - Продвинутые
  - СЕО
  - SEO
---

`vuepress-theme-hope` обеспечивает улучшения SEO с помощью встроенного <ProjectLink name="seo2">`vuepress-plugin-seo2`</ProjectLink>.

Чтобы плагин работал лучше, вам может потребоваться проверить [конфигурацию страницы](../../config/frontmatter/info.md) и настроить их правильно.

::: info

`vuepress-theme-hope` передает `plugins.seo` в параметрах темы в качестве параметров плагина `vuepress-plugin-seo2`.

:::

Плагин сделает ваш сайт полностью поддерживающим [Open Content Protocol OGP](https://ogp.me/) и [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) для улучшения SEO сайта.

Если вам не нужен этот плагин, установите для `plugins.seo` значение `false` в настройках темы.

<!-- more -->

## Из коробки

Плагин работает из коробки. Без какой-либо конфигурации он будет максимально извлекать информацию из содержимого страницы, чтобы заполнить необходимые теги, требуемые OGP и JSON-LD.

По умолчанию плагин будет читать конфигурацию сайта и внешний вид страницы, чтобы максимально автоматически генерировать теги. Такие как имя сайта, заголовок страницы, тип страницы, дата написания, дата последнего обновления и теги статьи генерируются автоматически.

Ниже приведены теги `<meta>` и их значения, которые будут внедрены в `<head>` по умолчанию:

### Генерация OGP по умолчанию

Ниже приведены теги `<meta>` и их значения, введенные в `<head>` по умолчанию для соответствия требованиям OGP:

|         Мета-имя         |                                                              Значение                                                               |
| :----------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|         `og:url`         |                                                   `themeConfig.hostname` + `path`                                                   |
|      `og:site_name`      |                                                         `siteConfig.title`                                                          |
|        `og:title`        |                                                            `page.title`                                                             |
|     `og:description`     | `page.frontmatter.description` \|\| генерируется автоматически (когда `autoDescription` имеет значение `true` в настройках плагина) |
|        `og:type`         |                                                             `"article"`                                                             |
|        `og:image`        |   `themeConfig.hostname` + `page.frontmatter.image` \|\|первое изображение на странице \|\| `fallbackImage` в настройках плагина    |
|    `og:updated_time`     |                                                       `page.git.updatedTime`                                                        |
|       `og:locale`        |                                                             `page.lang`                                                             |
|  `og:locale:alternate`   |                                           Другие языки, в том числе в `siteData.locales`                                            |
|      `twitter:card`      |                                 `"summary_large_image"` (доступно, только если изображение найдено)                                 |
|   `twitter:image:alt`    |                                      `page.title` (доступно, только если изображение найдено)                                       |
|     `article:author`     |                                         `page.frontmatter.author` \|\| `themeConfig.author`                                         |
|      `article:tag`       |                                         `page.frontmatter.tags` \|\| `page.frontmatter.tag`                                         |
| `article:published_time` |                                         `page.frontmatter.date` \|\| `page.git.createdTime`                                         |
| `article:modified_time`  |                                                       `page.git.updatedTime`                                                        |

### Генерация JSON-LD по умолчанию

|  Имя свойства   |                                                        Значение                                                        |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------: |
|   `@context`    |                                                 `"https://schema.org"`                                                 |
|     `@type`     |                                                    `"NewsArticle"`                                                     |
|   `headline`    |                                                      `page.title`                                                      |
|     `image`     | изображение на странице \|\| `themeConfig.hostname` + `page.frontmatter.image` \|\| `siteFavIcon` в настройках плагина |
| `datePublished` |                                  `page.frontmatter.date` \|\| `page.git.createdTime`                                   |
| `dateModified`  |                                                 `page.git.updatedTime`                                                 |
|    `author`     |                                  `page.frontmatter.author` \|\| `themeConfig.author`                                   |

## Установка тегов напрямую

Вы можете настроить параметр `head` в шапке страницы, чтобы добавить определенные теги на страницу `<head>` для улучшения SEO.
Например:

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

Автоматически внедрит `<meta name="keywords" content="SEO plugin" />`.

## Настроить генерацию

Плагин также дает вам полный контроль над логикой сборки.

### Тип страницы

Для большинства страниц есть в основном только два типа: статьи и веб-сайт, поэтому плагин предоставляет опцию `isArticle`, позволяющую вам предоставить логику для идентификации статей.

Опция принимает функцию в формате `(page: Page) => boolean`, по умолчанию все не домашние страницы, сгенерированные из файлов Markdown, рассматриваются как статьи.

::: note

Если страница подходит к «непопулярным» жанрам, таким как книги, музыка и т. д., вы можете справиться с ними, установив три параметра ниже.

:::

### OGP

Вы можете использовать опции `plugins.seo.ogp` в настройках темы. передать функцию для изменения объекта OGP по умолчанию в соответствии с вашими потребностями и вернуть его.

```ts
function ogp<
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
>(
  /** OGP Object inferred by plugin */
  ogp: SeoContent,
  /** Page Object */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App
): SeoContent;
```

Подробную структуру параметров смотрите в <ProjectLink name="seo2" path="/config.html">Конфиге</ProjectLink>.

Например, если вы используете стороннюю тему и устанавливаете `banner` на главной странице для каждой статьи в соответствии с требованиями темы, вы можете передать следующий `ogp`:

```ts
({
  ogp: (ogp, page) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD

Как и в OGP, вы можете использовать параметры `plugins.seo.jsonLd` в параметрах темы, чтобы передать функцию для изменения объекта JSON-LD по умолчанию в соответствии с вашими потребностями и вернуть его.

```ts
function jsonLd<
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
>(
  /** JSON-LD Object inferred by plugin */
  jsonLD: ArticleJSONLD | null,
  /** Page Object */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App
): ArticleJSONLD | null;
```

::: warning

Обратите внимание, что плагин не генерирует JSON-LD для страниц, не являющихся статьями, поэтому первый параметр функции может быть нулевым.

:::

## Каноническая ссылка

Если вы размещаете свой контент на разных сайтах или один и тот же контент по разным URL-адресам, вам может потребоваться установить `plugins.seo.canonical` в параметрах темы, чтобы предоставить «Каноническую ссылку» для вашей страницы. Вы можете либо установить строку, которая будет добавлена перед ссылкой маршрута страницы, либо добавить пользовательскую функцию `(page: Page) => string | null`, чтобы при необходимости вернуть каноническую ссылку.

::: tip Пример

Если ваши сайты развернуты в папке docs в `example.com`, но доступны в:

- `http://example.com/docs/xxx`
- `https://example.com/docs/xxx`
- `http://www.example.com/docs/xxx`
- `https://www.example.com/docs/xxx` (primary)

Чтобы результаты поисковой системы всегда были приоритетными, вам может потребоваться установить для `plugins.seo.canonical` значение `https://www.example.com/docs/`, чтобы поисковая система знала, что четвертый URL-адрес желательно индексировать.

:::

### Настроить теги головы

Иногда вам может понадобиться использовать другие протоколы или предоставить соответствующие теги SEO в формате, предоставляемом другими поисковыми системами. В этом случае вы можете использовать `plugins.seo.customHead` в параметрах темы, тип которых:

```ts
function customHead<
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
>(
  /** Head config */
  head: HeadConfig[],
  /** Page Object */
  page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App
): void;
```

Вы должны изменить массив `head` в этой функции напрямую.

## RDFa 1.1

Тема добавляет поддержку мультимедийной структуры в большую часть структуры сайта, следуя [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/).

::: tip

Вы можете использовать [Инструмент тестирования мультимедийной структуры Google](https://search.google.com/test/rich-results) для тестирования этого сайта.

:::

## Введение в СЕО

**S**earch **e**ngine **optimization** (SEO) — это процесс улучшения качества и количества трафика на сайт или веб-страницу из поисковых систем. SEO нацелен на неоплачиваемый трафик (известный как «естественные» или «органические» результаты), а не на прямой или платный трафик. Неоплачиваемый трафик может исходить от различных видов поиска, включая поиск изображений, поиск видео, академический поиск, поиск новостей и отраслевые вертикальные поисковые системы.

Как стратегия интернет-маркетинга, SEO рассматривает, как работают поисковые системы, запрограммированные компьютером алгоритмы, которые определяют поведение поисковых систем, что ищут люди, фактические поисковые термины или ключевые слова, введенные в поисковые системы, и какие поисковые системы предпочитает их целевая аудитория. . SEO выполняется, потому что сайт будет получать больше посетителей из поисковой системы, когда сайты занимают более высокое место на странице результатов поисковой системы (SERP). Эти посетители потенциально могут быть преобразованы в клиентов.

## Соответствующие документы

- [Open Content Protocol OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

  Плагин SEO отлично поддерживает этот протокол и автоматически генерирует теги `<meta>`, которые соответствуют протоколу.

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  SEO создаст схему "NewsArticle" для страниц статей.

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  `vuepress-theme-hope` поддерживает это

- [Schema.Org](https://schema.org/)

  Сайт определения схемы для структурной разметки

## Связанные инструменты

- [Инструмент тестирования мультимедийной структуры Google](https://search.google.com/test/rich-results)
