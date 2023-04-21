---
title: PDF
---

PDF viewer component.

You can use this component to embed a PDF viewer.

<!-- more -->

## Demo

Default PDF viewer:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

PDF viewer starting with page 2 and without toolbar:

<PDF url="/sample.pdf" page="2" no-toolbar />

```md
<PDF url="/sample.pdf" page="2" no-toolbar />
```

## PDFJS Viewer

Not all browsers support embed PDF viewer (E.g.: No mobile browser supports this now), so we add support for PDFJS Viewer.

Since PDFJS Viewer is large, you will need to manually download it from [GitHub](https://github.com/mozilla/pdf.js/releases):

- If you only want to add support for modern browsers on mobile, download `pdfjs-3.1.81-dist.zip`
- If you want to add support for most browsers, download `pdfjs-3.1.81-legacy-dist.zip`

After finish downloading, unzip it to a location you want in `.vuepress/public` folder, then set destination relative to `.vuepress/public` to `componentOptions.pdf.pdfjs` in component options.

::: details Example

If you download `pdfjs-3.1.81-legacy-dist.zip` and unzip to `.vuepress/public/assets/lib/pdfjs`, you shall set:

```ts
// .vuepress/config.ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      componentOptions: {
        pdf: {
          pdfjs: "/assets/lib/pdfjs",
        },
      },
    }),
  ],
};
```

:::

::: details noToolbar support

The default PDFJS viewer does not support toolbar customization, if you want to add support for this, you shall manually add the following code to `web/viewer.html` before line `<script src="viewer.js"></script>` in `pdfjs` folder:

```html
<!-- ... -->
<script src="../build/pdf.js"></script>

<!-- ========== Below is what you should add ============= -->

<!-- add support for toolbar=0 -->
<script>
  if (location.hash.includes("toolbar=0")) {
    const style = document.createElement("style");

    style.textContent = "#toolbarContainer { display: none; }";
    document.head.append(style);
  }
</script>

<!-- ========== Above is what you should add ============= -->

<script src="viewer.js"></script>
<!-- ... -->
```

:::

## Props

### url

- Type: `string`
- Required: Yes

PDF document link, relative path is NOT supported.

### width

- Type: `string | number`
- Default: `100%`

PDF viewer width.

### height

- Type: `string | number`
- Required: No

PDF viewer height

### ratio

- Type: `number`
- Default: `16 / 9`

PDF viewer ratio, ONLY valid when `height` not set.

### page

- Type: `number`
- Default: `1`

Initial page of pdf document.

::: warning

This prop only works on Chromium-based browsers.

:::

### noToolbar

- Type: `boolean`
- Default: `false`

Whether to hide toolbar.

::: warning

This prop only works on Chromium-based browsers.

:::

### zoom

- Type: `number`
- Default: `100`

Initial zoom level of pdf document.

::: warning

This prop only works on Chromium-based browsers.

:::
