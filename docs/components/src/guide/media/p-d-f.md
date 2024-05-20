---
title: PDF
---

PDF viewer component.

You can use this component to embed a PDF viewer.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo Default PDF viewer

<PDF url="//theme-hope-assets.vuejs.press/files/sample.pdf" />

:::

::: md-demo PDF viewer starting with page 2 and without toolbar

<PDF url="//theme-hope-assets.vuejs.press/files/sample.pdf" page="2" no-toolbar />

:::

<!-- #endregion demo -->

## PDFJS Viewer

Not all browsers support embed PDF viewer (E.g.: No mobile browser supports this now), so we add support for PDFJS Viewer.

By default the pdfjs viewer is fetched from `https://theme-hope-assets.vuejs.press/pdfjs/`. You can customize `componentOptions.pdf.pdfjs` in component options to specific another one.

::: important PDFJS Viewer

Our PDFJS viewer is served for community with non-commercial use only, and to use the PDFJS viewer, your PDF file should be served with CORS headers that allows `theme-hope-assets.vuejs.press`.

If you can not satisfy the above conditions, you shall host the PDFJS viewer by yourself. To do this, you should download the latest PDFJS viewer from <https://github.com/mozilla/pdf.js/releases>, then copy it to `.vuepress/public` folder. After that, set `componentOptions.pdf.pdfjs` to `<BASE_URL><RELATIVE_PATH_TO_YOUR_FOLDER_INSIDE_PUBLIC>` in component options.

:::

::: details noToolbar support

The default PDFJS viewer does not support toolbar customization, if you want to add support for this, you shall manually add the following code to `web/viewer.html` before line `<script src="viewer.js"></script>` in `pdfjs` folder:

```html
<!-- ... -->
<link rel="stylesheet" href="viewer.css" />

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

<script src="viewer.mjs"></script>
<!-- ... -->
```

:::

## Props

### url

- Type: `string`
- Required: Yes

PDF document link.

When filling in a pathname, `base` will be automatically added to the beginning of the pathname.

::: warning Limitations

- Full URL is always recommended
- relative path is NOT supported.
- Pathname is not working with embed PDFJS viewer in devServer, and its URL in production must has a correct CORS policy.

:::

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

### viewer

- Type: `boolean`
- Default: `false`

Whether to force use PDFJS viewer.

### page

- Type: `number`
- Default: `1`

Initial page of pdf document.

::: warning

This prop only works on Chromium-based browsers.

:::

### noFullscreen

- Type: `boolean`
- Default: `false`

Whether disable fullscreen button.

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
