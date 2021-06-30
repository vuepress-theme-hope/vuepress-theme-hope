---
title: Changelog
icon: time
---

This file contain all notable changes of `vuepress-theme-hope` and its plugins.

<!-- more -->

## v1.19.0

### Features

- active-hash plugin <Badge text="new" />
- smooth-scroll plugin <Badge text="new" />

## v1.18.0

### Features

Add Custom layout support

## v1.17.0

### Features

Add Waline support

## v1.16.0

### Features

#### Image Link fix <Badge text="new" />

Now you can use special characters when you are linking images. This is a workaround on VuePress internal bug.

This feature is on by default and controlled by `imageFix` option.

#### Link Control <Badge text="new" />

New `cleanUrl` option in themeConfig to take better contorl of generating links.

### Breaking Changes <Badge text="config" type="warn" />

`namedChunk` in themeConfig is renamed to `chunkRename`.

## v1.15.2

### Features

- **md-enhance:** add more code blocks for mermaid

  You can now use these code blocks in Markdown:

  ````md
  ```sequence
  sequence diagram here
  ```
  ````

  ````md
  ```class
  class diagram here
  ```
  ````

  ````md
  ```state
  state diagram here
  ```
  ````

  ````md
  ```er
  er diagram here
  ```
  ````

  ````md
  ```gantt
  gantt diagram here
  ```
  ````

  ````md
  ```pie
  pie diagram here
  ```
  ````

  ````md
  ```journey
  user journey here
  ```
  ````

- **theme:** add `anchorDisplay` option in frontmatter

## v1.15.1

### Features

#### New syntax for flowchart

````md
```flowchart
your flowchart...
```
````

Can also generate a flowchart besides

````md
```flow
your flowchart...
```
````

#### Task List

`tasklist` in plugin `md-enhance` is now configurable

```ts
interface TaskListOptions {
  /**
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;
  /**
   * Whether place `<label>` after `<input>` or wrap `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
```

#### Tex

`tex` in plugin `md-enhance` is now configurable (as `KatexOptions`)

## v1.15.0

### Features

#### Mermaid <Badge text="new" />

New `mermaid` option in plugin `md-enhance` to support mermaid diagram.

You should use

````md
```mermaid
your mermaid...
```
````

In your Markdown to generate mermaid diagrams.

#### Task List <Badge text="new" />

New `tasklist` option in plugin `md-enhance` to support task lists.

You should use `- [ ] text` or `- [x] text` in your Markdown to generatetask lists.

## v1.14.4

### Features

Now large modules will not only be splited in to chunks, they will be outputed only when they are used.

This will help make better control of bundle size.

### Breaking Changes <Badge text="config" type="warn" />

`docsBranch` in themeConfig is changed from `'master'` to `'main'`.

## v1.14.1

### Features

#### New helpers <Badge text="new" />

New helper functions `themeConfig`, `navbarConfig` and `sidebarConfig`in `vuepress-theme-hope`.

These are for better validatation and autocomplete in config file.

## v1.14.0

### Breaking Changes

#### FlowChart <Badge text="syntax" type="warn" />

````md
```flow preset
your flowchart...
```
````

Is changed to

````md
```flow:preset
your flowchart...
```
````

#### baselang <Badge text="remove" type="error" />

All the `baseLang` options are removed.

You should specifc root folder language in `locales["/"]` using `lang` key.

## v1.13.4

### Features

- New `heroFullScreen` option for blog homepage
- New `hideSiteTitleonMobile` for navbar
- New "Email" Icon for media icons

## v1.13.3

### Features

Add german language support.

## v1.13.0

### Breaking Changes <Badge text="syntax" type="warn" />

Flowchart syntax is changed from

```md
@flowshart
your flowchart...
@flowend
```

To

````md
```flow
your flowchart...
```
````

This change is made to support [Typora](https://typora.io/).

## v1.12.3

### Features <Badge text="new" />

Add `create-vuepress-theme-hope` package.

You can use `yarn create vuepress-theme-hope [dir]` or `npm init vuepress-theme-hope [dir]` to create theme template easily.

## v1.12.1

### Breaking Changes <Badge text="structure" type="warn" />

Theme components structure is changed.

If you are extending this theme, you may need to update your code.

## v1.12.0

### Features <Badge text="new" />

- `last-update` plugin is removed
- a new [`git` plugin](https://vuepress-theme-hope.github.io/git/) (`@mr-hope/vuepress-plugin-git`) :tada:

## v1.11.1

### Breaking Changes <Badge text="config" type="warn" />

- **comment**: All the info name in `pageInfo` is changed from PascalCase to kebab-case. And `ReadTime` is changed to `reading-time`.

## v1.11.0

### Features

- **theme**: `/star/` page is added in blog mode. All the star articles will be listed on this page.

### Breaking Changes <Badge text="name" type="warn" />

- **components**: Rename `<MyBadge>` to `<Badge>` to align `@vuepress/theme-default`.

## v1.10.0

### Features <Badge text="new" />

- **components**: `<CodeGroup>` and `<CodeGroupItem>` is added.

- **theme**: You can use `star: true` in frontmatter to star a page.

  Star pages will appear in article sidebar.

## v1.9.1

### Features <Badge text="new" />

- **theme**: `blog.roundAvatar` is added in themeConfig. (Default: `true`)

## v1.9.0

### Features <Badge text="new" />

[**new Feed plugin**](https://vuepress-theme-hope.github.io/feed/). :tada:

### Breaking Changes <Badge text="drop" type="error" />

- **pwa**: remove `head` function. We use hacking to inject PWA links for you.

## v1.8.2

### Breaking Changes <Badge text="drop" type="error" />

- **md-enhance**: remove `horizontal` config for code-demo

## v1.8.0

### Features <Badge text="new" />

- **theme**: new `namedChunks` options in themeConfig

## v1.6.0

### Features <Badge text="new" />

- **md-enhance**: [new Code Demo feature](https://vuepress-theme-hope.github.io/guide/markdown/demo/) :tada:

## v1.5.4

### Features <Badge text="new" />

- **md-enhance**: add justify align container

  ```md
  ::: justify

  content

  :::
  ```

## v1.5.0

### Features <Badge text="new" />

- **last-update**: add `timezone` option

  This is useful when you are deploying on GitHub actions. (GitHub actions use `UTC` timezone)

- **md-enhance**: you can config plugins for presentation now using `presentation.plugins`
- **theme**: add Font Awesome icon support
- **theme**: add Slides layout

  You can use `layout: Slide` in frontmatter to use slide layout.

## v1.4.7

### Features <Badge text="new" />

- **pwa**: add install modal

## v1.4.5

### Features <Badge text="new" />

- **pwa**: add `maxPicSize` option
- **seo**: auto generated robots.txt

### Breaking Changes <Badge text="config" type="warn" />

- **pwa**: `cacheMaxSize` rename to `maxSize`

## v1.4.3

### Breaking Changes <Badge text="ext" type="warn" />

- **pwa**: use official ext for manifest

  Mmanifest filename change from `manifest.json` to `manifest.webmanifest`.

## v1.4.1

### Features <Badge text="new" />

- **pwa**: add `cacheHTML` option

## v1.3.0

### Features <Badge text="new" />

- **md-enhance**: add presentaion support using reveal.js :tada:

## v1.2.0

### Features <Badge text="i18n" />

Add Vietnamese support.

## v1.1.0

### Breaking Changes <Badge text="api" type="error" />

- **theme**: Rename all the plugin config in theme to the camelcase version of plugin:

- `addthis` renamed as `addThis`
- `markdown` renamed as `mdEnhance`
- `lastUpdatedTransformer` renamed as `lastUpdate`

## v1.0.1

### Features <Badge text="i18n" />

- **theme**: add Gitee for MediaLink

## v1.0.0

### Breaking Changes <Badge text="api" type="error" />

- **theme**: Use `const { config } = require('vuepress-theme-hope')` instead of `const resolve = require('vuepress-theme-hope/resolve')`
