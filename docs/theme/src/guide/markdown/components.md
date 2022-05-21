---
title: Components
icon: plugin
index: 17
category:
  - Markdown
tag:
  - Components
  - Markdown
---

By using `@mr-hope/vuepress-plugin-components`, you can import and use some components in your Markdown files.

Available components:

- Badge
- CodePen
- FontIcon
- PDF

By default, `<Badge />` and `<CodePen />` is enabled.

To enable components, you should set `plugin.components` with an array of components name.

<!-- more -->

## Badge

A badge component.

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

See [Badge][badge] page for available props.

## CodePen

A component which allows you to embed CodePen demo.

A demo with user and slug hash:

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>
```

A demo with link:

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>
```

See [CodePen][codepen] page for available props.

## FontIcon

Component which allows you to display font icons.

- Home icon: <FontIcon icon="home" />

- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />

```md
- Home icon: <FontIcon icon="home" />

- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />
```

See [FontIcon][fonticon] page for available props.

## PDF

PDF viewer component.

Default PDF viewer:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

PDF viewer without toolbar:

<PDF url="/sample.pdf" :toolbar="false" />

```md
<PDF url="/sample.pdf" :toolbar="false" />
```

PDF viewer with initial page 2:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
```

See [PDF][pdf] page for available props.

[badge]: https://vuepress-theme-hope.github.io/v2/components/guide/badge.html
[codepen]: https://vuepress-theme-hope.github.io/v2/components/guide/codepen.html
[fonticon]: https://vuepress-theme-hope.github.io/v2/components/guide/fonticon.html
[pdf]: https://vuepress-theme-hope.github.io/v2/components/guide/pdf.html
