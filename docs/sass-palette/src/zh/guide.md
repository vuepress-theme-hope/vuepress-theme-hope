---
title: 指南
icon: lightbulb
---

这个插件基本上是面向插件和主题开发的。

## ID

首先，你应该了解此插件的设计目标是提供跨越插件和主题的支持。(而并不像官方插件仅面向主题)。

我们提供了 `id` 选项来执行此操作，并且使用具有相同 ID 的此插件 (通过调用 `useSassPalette`) 不会有任何副作用。 此外，所有别名和模块名称都有一个 ID 前缀。

这将允许你:

- 使用相同的 ID 在你的插件 (或主题) 间共享同一个样式系统，而不会产生任何副作用。

  这意味着你可以在你的插件 (或主题) 中使用相同的样式变量来统一你的样式。

  ::: tip 示例

  `vuepress-theme-hope` 及其所有插件都使用相同 ID `hope` 调用插件，因此所有颜色变量、断点和其他样式配置都可以在同一个文件中完成，并且可以跨主题和插件进行统一。

  :::

- 设置不同的 ID 时，插件们和主题之间互相完全独立。我们建议你使用你的插件名称设置 `id` 变量。

  使用默认设置，用户将在 `.vuepress/styles` 文件夹下设置你的插件样式，其中 Sass 文件以你的 ID 前缀开头。你可以使用 `${id}-config` 访问所需的变量。

  ::: tip 示例

  `vuepress-theme-hope` 正在使用 ID `"hope"`，而假设 `vuepress-plugin-abc` 正在使用 `"abc"`。他们可以分别使用 `hope-config` 和 `abc-config` 模块名称获取自己的变量。

  :::

## 样式

我们这里有三个样式概念: 配置、调色板和生成器。

## 配置

配置文件仅用于提供 Sass 变量。它所包含 Sass 变量可以在其他文件中使用。

你可以指定一个文件作为用户配置文件。这样你可以稍后在插件 Sass 文件中访问包含每个变量的模块。此外，你还可以提供默认配置文件，你可以在其中使用 `!default` 为变量设置默认值。

::: details 一个例子

在这里，你正在使用下列选项调用插件:

```js
useSassPalette(app, {
  id: "abc",
  defaultConfig: "vuepress-plugin-abc/styles/config.scss",
});
```

如果用户设置了:

```scss title=".vuepress/styles/abc-palette.scss"
$colorA: red;
```

同时你正在提供如下默认配置文件:

```scss title="vuepress-plugin-abc/styles/palette.scss"
$colorA: blue !default;
$colorB: green !default;
```

你可以在插件 Sass 文件中获取到如下变量:

```scss
// Vue 单文件组件的 <style lang="scss"> 块或脚本中直接导入的 Scss 文件中
@debug abc-config.$colorA; // red
@debug abc-config.$colorB; // green
```

:::

### 限制

我们正在使用 `additionalData` 选项让 `${id}-config` 模块在你的样式中可用，但这有一些限制。

`additionalData` 仅适用于 Scss 入口，因此 `${id}-config` 仅适用于:

- Vue 单文件组件的 `<style lang="scss">` 块
- 脚本中直接导入的 Scss 文件 (例如: 客户端应用程序增强文件中的 `import "./a-scss-file.scss"`) 。

如果 Scss 文件不是直接导入的，而是通过 `@use` 或 `@import` API 导入的，模块将不可用。因此，在这种情况下，你应该使用 `@use "@sass-palette/${id}-config";` 自行导入模块。

### 保留的配置名称

`$dark-selector` 保留用于深色模式选择器。如果你希望你的插件或主题支持深色模式，则需要设置此变量。此变量稍后将在调色板文件中使用。

::: tip

- 如果你正在开发插件，你可以在默认配置文件中设置 `$dark-selector: html.dark !default;`，因为 `@vuepress/theme-default` 正在这样做。

  你的插件将在默认主题正常工作，如果用户使用具有不同深色模式选择器的第三方主题，则用户可以在配置文件中更改此选择器。

- 如果你在开发主题，你可以在默认配置文件中设置 `$dark-selector` 为你的深色模式选择器同时不包含 `!default`，这样用户就不能覆盖它。

:::

## 调色板

调色板文件用于 CSS 变量注入，其中每个变量将被注入到 root 中，变量名称转换为 kebab-name 格式。

你可以指定一个文件作为用户调色板文件，默认文件名是 `${id}-palette.scss`。 此外，你还可以提供一个默认的调色板文件，你可以在其中使用 `!default` 为变量设置默认值。

::: details 一个例子

在这里，你正在使用如下选项调用插件:

```js
useSassPalette(app, {
  id: "abc",
  defaultPalette: "vuepress-plugin-abc/styles/palette.scss",
});
```

如果用户设置:

```scss title=".vuepress/styles/abc-palette.scss"
$colorA: red;
```

同时你正在提供如下默认调色板文件:

```scss title="vuepress-plugin-abc/styles/palette.scss"
$colorA: blue !default;
$colorB: green !default;
```

然后下面的 CSS 变量将在 root 选择器下可用:

```scss
:root {
  --color-a: red;
  --color-b: green;
}
```

:::

### 颜色设置

由于默认主题支持深色模式，因此你可能希望在浅色模式和深色模式下使用不同的颜色。

为此，你应该使用包含 `light` 和 `dark` 键的映射设置颜色变量。 稍后，该插件将在你的配置中读取 `$dark-selector` 并为你生成不同的颜色。

::: details 一个例子

```scss
// 用户调色板
$text-color: (
  light: #222,
  dark: #999,
);

// 默认调色板
$text-color: (
  light: #2c3e50,
  dark: #9e9e9e,
) !default;
$bg-color: (
  light: #fff,
  dark: #1e1e1e,
) !default;
```

然后，如果在配置文件中 `$dark-selector` 的值为 `"html.dark"`，你会得到:

```scss
:root {
  --text-color: #222;
  --bg-color: #fff;
}

html.dark {
  --text-color: #999;
  --bg-color: #1e1e1e;
}
```

:::

### 允许的变量类型

调色板中只允许使用颜色 (或颜色映射)、长度和字符串。任何其他类型都将被删除。

:::: note 为什么除了字符串只允许颜色和长度

在常见情况下，你可能只想计算颜色和长度。所以放弃其他类型支持是相当安全的，因为你想要的任何其他值都可以转换为字符串。

::: details 示例

如果你想要一个 `--move-transition` 和 `width 0.3s ease`，你可以使用字符串:

```scss
// 这将被 sass 视为一个类型为 (length, time, function) 的列表
// 并会触发警告并被插件删除
$moveTransition: width 0.3s ease;

// 这会得到你想要的
// :root {
//   --move-transition: width 0.3s ease
// }
$moveTransition: "width 0.3s ease";
```

:::

::::

### 在配置模块中可用

与配置文件相同，调色板中的任何变量都将被注入到 `${id}-config` 模块中，以防万一你想在 sass 文件中使用它们。

## 辅助模块

我们公开了 `vuepress-plugin-sass-palette` 使用的内部函数，作为辅助模块。

你可以通过 `@sass-palette/helper` 别名使用此辅助模块，并调用其函数来自己实现类似的功能。

## 生成器

生成器文件面向开发人员使用配置或调色板文件变量生成衍生值。

生成器变量也将像调色板一样作为 CSS 变量注入，它们也可以在配置模块中使用。

::: details 示例

你可能想要一个基于 `$theme-color` 的 `$theme-color-light`。所以你可以这样写一个生成器:

```scss
@use "sass:color";
@use "sass:list";
@use "sass:map";
@use "@sass-palette/helper";

$theme-color-light: (
  light: color.scale(helper.get-color($theme-color), $lightness: 10%),
  dark: color.scale(helper.get-dark-color($theme-color), $lightness: 10%),
) !default;
```

:::

## 用户样式

如果你是主题开发人员，你可能希望为你的用户提供一种自定义主题或网站的方法。

在这种情况下，你应该在使用此插件时将 `style` 选项设置为用户样式文件。

稍后，你应该通过在你的主题样式之后导入 `@sass-palette/${id}-style` 来手动包含用户样式文件。

::: note

`@sass-palette/${id}-style` 是用户样式文件的别名，你可以在 JS/TS/SASS 中导入它。

:::

## 别名

可用的别名如下:

- 配置: `@sass-palette/${id}-config` (基于 `id`)
- 调色板: `@sass-palette/${id}-palette` (基于 `id`)
- 样式: `@sass-palette/${id}-style` (仅在设置了 `style` 选项时可用)
- 助手: `@sass-palette/helper`
