---
title: Feed Getter
icon: shapes
---

You can take full control of feed items generation by setting `getter` in the plugin options.

## getter.title

- Type: `(page: Page) => string`

Item title getter

## getter.link

- Type: `(page: Page) => string`

Item link getter

## getter.description

- Type: `(page: Page) => string | undefined`

Item description getter

::: note

Due to Atom support HTML in summary, so you can return HTML content here if possible, but the content must start with mark `html:`.

:::

## getter.content

- Type: `(page: Page) => string`

Item content getter

## getter.author

- Type: `(page: Page) => FeedAuthor[]`

Item author getter.

::: note The getter should return an empty array when author information is missing.

:::

::: details FeedAuthor format

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

## getter.category

- Type: `(page: Page) => FeedCategory[] | undefined`

Item category getter.

::: details FeedCategory format

```ts
interface FeedCategory {
  /**
   * Category Name
   */
  name: string;

  /**
   * A string that identifies a categorization taxonomy
   *
   * @description rss format only
   */
  domain?: string;

  /**
   * the categorization scheme via a URI
   *
   * @description atom format only
   */
  scheme?: string;
}
```

:::

## getter.enclosure

- Type: `(page: Page) => FeedEnclosure | undefined`

Item enclosure getter.

::: details FeedEnclosure format

```ts
interface FeedEnclosure {
  /**
   * Enclosure link
   */
  url: string;

  /**
   * what its type is
   *
   * @description should be a standard MIME Type, rss format only
   */
  Type: string;

  /**
   * Size in bytes
   *
   * @description rss format only
   */
  length?: number;
}
```

:::

## getter.publishDate

- Type: `(page: Page) => Date | undefined`

Item release date getter

## getter.lastUpdateDate

- Type: `(page: Page) => Date`

Item last update date getter

## getter.image

- Type: `(page: Page) => string`

Item Image Getter

::: note Ensure it's returning a full URL

:::

## getter.contributor

- Type: `(page: Page) => FeedContributor[]`

Item Contributor Getter

::: note The getter should return an empty array when contributor information is missing.

:::

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

## getter.copyright

- Type: `(page: Page) => string | undefined`

Item copyright getter
