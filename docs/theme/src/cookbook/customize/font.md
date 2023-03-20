---
title: Customizing Fonts
icon: font
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This page guides you how to customize theme fonts.

<!-- more -->

## Font Family

For common font families, they can generally be divided into **serif**[^serif] and **sans-serif**[^sans-serif].

## Modifying Fonts

The theme provides `$font-family`, `$font-family-heading` and `$font-family-mono` three variables to control the font in `.vuepress/styles/palette.scss`.

- `$font-family`: the font used on normal text
- `$font-family-heading:` font for heading elements
- `$font-family-mono`: the font used in code block and inline codes

By default, the theme uses sans serif with normal text.

::: tip Use Serifs

If you prefer serif fonts, you can modify `$font-family` to the font you want.

The following font families are our recommended first choice for serif fonts:

```scss
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", sans-serif';
```

:::

## Fallback Font

Because different platforms, different operating systems, and different installation methods (slim/full) will cause huge differences in the number and types of fonts in the font library, you should set as many fonts as possible, and ensure that the fallback fonts [^fallback-font] exists.

::: tip Best Practices

The fallback font [^fallback-font] can ensure that your website displays well on different operating systems and devices with different fonts installed.

:::

## Font Library

You can find more fonts in [Google Fonts](https://fonts.google.com/), and you can preview and download them online.

Please search and select the font and weight you want in the webpage, then click the `Select` button on the right to add it to your selection list, then click the button in the upper right corner to view your favorite fonts and get the link Imported in the configuration file of VuePress.

We assume that you have selected the 400 and 700 italic fonts of Lora font. After clicking the button in the upper right corner, Google will give the following code in the sidebar:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;1,700&display=swap"
  rel="stylesheet"
/>
```

```css
font-family: "Lora", serif;
```

Then all you need to do is import and use them by adding the following code in the VuePress configuration file:

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  //...

  head: [
    //...

    // Import the corresponding link
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  //...
});
```

Also modify the `$font-family` variable in the palette file:

```scss
// .vuepress/styles/palette.scss

// apply font
$font-family: "Lora, serif";
```

In this way, you can use lora font in your website.

::: details lora Demo

<!-- markdownlint-disable MD033 -->

<div class="lora">

## Whereas recognition of the inherent dignity

No one shall be subjected to arbitrary arrest, detention or exile.
Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.
No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.

</div>

<!-- markdownlint-enable MD033 -->

:::

[^serif]: Related introduction: <https://www.zhihu.com/topic/19559432/intro>
[^sans-serif]: Related introduction: <https://www.zhihu.com/topic/19559433/intro>
[^fallback-font]: From Wikipedia

    Fallback fonts are fonts that are used to display missing characters when the displayed font lacks certain characters. Because it serves as the last line of defense for display, fallback fonts should contain all Unicode characters where possible.

    When a missing character has no fallback font for display, the missing character is usually displayed as a black square, white hollow square, question mark, Unicode placeholder (U+FFFD), or simply skipped. In practice, systems such as CSS that support sequential display of font lists usually put one or more sets of fallback fonts at the end of the list to prevent missing characters.

<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'

useScriptTag("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;900&display=swap");
</script>

<style lang="scss" scoped>
.lora {
  font-family: Lora, serif;
  font-weight: 700;
  font-size: 1.5rem;

  h2 {
    font-weight: bold;
    font-style: italic;
    font-size: 2.5rem;
  }
}
</style>
