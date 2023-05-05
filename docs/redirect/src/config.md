---
title: Options
icon: gears
---

## Plugin Options

### config

- Type: `Record<string, string> | ((app: App) => Record<string, string>)`
- Required: No

Redirect map.

### hostname

- Type: `string`
- Required: No

Domain name to redirect to.

## autoLocale

- Type: `boolean`
- Default: `false`
- Details:
  - [Guide → Redirect Language](./guide.md#redirecting-locales)

Whether enable locales redirection.

## switchLocale

- Type: `"direct" | "modal" | false`
- Default: `false`

Whether switch to a new locale based on user preference.

- `"direct"`: redirect to the new locale directly without asking
- `"modal"`: show a modal to let user choose whether to switch to the new locale

## localeConfig

- Type: `Record<string, string | string[]>`
- Required: No

Locale language config

## localeFallback

- Type: `boolean`
- Default: `true`

Whether fallback to other locales user defined

## defaultBehavior

- Type: `"defaultLocale" | "homepage" | "404"`
- Default: `"defaultLocale"`

Behavior when a locale version is not available for current link.

::: note

`"homepage"` and `"404"` is only available when a locale is assigned to current language.

:::

## defaultLocale

- Type: `string`
- Default: the first locale

Default locale path.

## Frontmatter options

### redirectFrom

- Type: `string | string[]`
- Required: No

The link which this page redirects from.

### redirectTo

- Type: `string`
- Required: No

The link which this page redirects to.
