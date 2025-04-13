---
title: 图标支持
icon: icons
order: 3
category:
  - 界面
tag:
  - 界面
  - 图标
---

主题通过 [@vuepress/plugin-icon] 添加了图标支持。

<!-- more -->

## 使用

我们支持多种类型的图标：

- `iconify` (默认)
- `fontawesome`
- `iconfont`

在使用任一类型图标时，你也可以使用任何图片链接（不支持相对链接）。

要指定图标资源，请在主题选项中设置 `plugins.icon.assets`：

```ts twoslash {7-8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    icon: {
      // 关键词: "iconify", "fontawesome", "fontawesome-with-brands"
      assets: "fontawesome",
    },
  },
});
```

```ts twoslash {6-10} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    icon: {
      // 你想要的 URL
      // 例如，这些网站允许你声称自己的资源:
      // - [iconfont.cn](https://www.iconfont.cn/) 的 CSS 链接
      // - [fontawesome](https://fontawesome.com) 中的 Kit 链接
      assets: "/base/my/font-icon/resource.js",
    },
  },
});
```

```ts twoslash {6-11} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    icon: {
      // 上述内容的数组
      assets: [
        "/base/my/font-icon/resource.js",
        "https://example/my/fonr-icon/resouce.css",
        "fontawesome",
      ],
    },
  },
});
```

为了便于上手，我们添加了内置关键字 `"iconify"`、`"fontawesome"` 和 `"fontawesome-with-brands"` 支持。

::: caution

如果你将此插件用于商业项目文档，则**强烈不推荐**使用 iconfont，因为 iconfont 本身是设计人员和开发人员的学习/共享平台。

每个图标都是用户上传的，你必须获得作者的授权才能用于商业用途。上传者也有可能违背用户协议，上传版权在第三方的非原创图标。

:::

## 添加图标

### 在 Markdown 中

在 markdown 中，你可以使用 `::icon decorators... =size /color key=value complex-key="complex value"...::` 来插入自定义图标。

- 以 `=` 开头的字符串将被视为大小定义。
- 以 `/` 开头的字符串将被视为颜色定义。
- 任何本身是有效 html 属性的字符串将被解析、标准化并添加到图标元素中。
- 其余部分将被视为图标名称。

```md
::icon =16 /red:: <!-- <VPIcon class="icon" color="red" size="16px" -->

::icon rotate vertical-align=middle:: <!-- <VPIcon icon="icon rotate" vertical-align="middle" -->
```

::: md-demo Demo

::home /blue::
::b:apple =2rem vertical-align=text-bottom::

:::

### 在组件中

你可以使用 `<VPIcon />` 组件在 Vue 组件中添加图标。

- `icon` 属性接受图标设置，即图标名称或图像链接
- `color` 属性接受一个 css 颜色值，它将用作图标颜色（可选）
- `size` 属性接受一个 css 大小值，该值将用作图标大小（可选）
- `verticalAlign` 属性接受一个 css 垂直对齐值，该值将用作图标垂直对齐（可选）

::: md-demo Demo

<VPIcon icon="home" color="red" />
<VPIcon
  icon="//theme-hope-assets.vuejs.press/logo.svg"
  size="4rem"
  verticalAlign="middle"
/>

:::

### 在配置中

你可以在多个选项中设置图标：

- 页面: 在 frontmatter 中设置 `icon`

  此图标将用于路径导航、页面标题、导航栏生成项、侧边栏生成项、页面导航等。

- 导航栏: 在导航栏项中设置 `icon` 选项

- 侧边栏: 在侧边栏项中设置 `icon` 选项

- 首页: 在 `features` 项目中设置 `icon` 选项

### 可用的图标

- Iconify: <https://icon-sets.iconify.design/>
- Iconfont: <https://www.iconfont.cn/>
- Fontawesome: <https://fontawesome.com/search?o=r&m=free>

## 图标类型

### Iconify

有关完整的图标列表，请参见 <https://icon-sets.iconify.design/>。要使用图标，请复制选择器中的 `iconify-icon` 的图标名称。

此外，iconify 支持以下属性：

- `mode`：`svg`（默认）`style` `bg` 或 `mask` 以更改渲染图标模式
- `inline`：`false` 以禁用内联图标
- `flip`：`horizontal` 或 `vertical` 以翻转图标
- `rotate`：`90`、`180`、`270` 以旋转图标

如果你主要使用 1 个图标集，可以将前缀设置为图标集名称（例如：`mdi:`），然后你可以使用图标名称而无需前缀。手动声明完整图标名称将覆盖前缀：

```md
::home:: <!-- mdi:home -->
::svg-spinners:180-ring:: <!-- svg-spinners:180-ring -->
```

### Font Awesome

有关免费图标列表，请参见 <https://fontawesome.com/v6/search?o=r&m=free>。要使用图标，请复制选择器中的图标名称。

`fontawesome` 关键字仅包括免费的实心和常规图标。如果要使用品牌图标，则需要使用 `fontawesome-with-brands` 关键字。

实心图标可以直接使用。如果要使用常规或品牌图标，则需要在图标名称前添加 `regular:` 或 `brands:` 前缀：

```md
::home:: <!-- fas fa-home (实心是默认的) -->
::solid:home:: <!-- fas fa-home -->
::regular:heart:: <!-- far fa-heart -->
::brands:apple:: <!-- b:apple -->
```

此外，还支持三个字母前缀、第一个字母或完整类名：

```md
::s:home:: <!-- fas fa-home -->
::fas:home:: <!-- fas fa-home -->
::fa-solid:home:: <!-- fa-solid fa-home -->

::b:apple:: <!-- b:apple -->
::fab:apple:: <!-- b:apple -->
::fa-brands:apple:: <!-- fa-brands fa-apple -->

::r:heart:: <!-- far fa-heart -->
::far:heart:: <!-- far fa-heart -->
::fa-regular:heart:: <!-- fa-regular fa-heart -->
```

你可以在图标名称后添加其他 fontawesome 支持的类，并用空格分隔，其中 `fa-` 前缀是可选的：

```md
<!-- 一个小尺寸 icon -->

::home fa-sm:: <!-- fas fa-home fa-sm -->

<!-- 旋转 180° -->

::home rotate-180:: <!-- fas fa-home fa-rotate-180 -->
```

有关所有可用类的详细信息，请参见 <https://docs.fontawesome.com/web/style/styling>。

::: tip Fontaweome 套件和 Pro 功能

默认情况下，我们使用 jsdelivr CDN 来加载 fontawesome 免费图标的 V6 版本。这对于大多数开源项目来说应该足够了。

此外，你可以在 [fontawesome.com](https://fontawesome.com) 购买套件来使用。

具有专业功能的 fontawesome 套件支持专业图标、更多图标样式和上传自己的图标。

有关详细信息，请参见 [fontawesome 文档](https://docs.fontawesome.com/)。

- [完整图标列表](https://fontawesome.com/search)

:::

### Iconfont

[Iconfont](https://iconfont.cn) 是阿里妈妈 MUX 创建的矢量图标管理和交流平台。

每个设计师都可以将图标上传到 Iconfont 平台，用户可以从这些图标中创建项目。项目可以以各种格式使用。

#### 生成自己的 Iconfont 链接

##### 创建项目

首先，你需要创建一个新项目来设置和管理你网站的图标：

1. 登录 Iconfont。
1. 在网站顶部找到 "资源管理 → 我的项目"，点击右上角的 "新建项目" 图标。
1. 设置一个可识别的项目名称。
1. 使用 `FontClass/Symbol 前缀` 填写 `icon-`。你也可以根据自己的喜好填写，但是你需要在前面加上一个额外的 `"iconfont"` 类手动设置这个值为 `prefix` 选项，例如：`iconfont icon-`。

![新项目](./assets/iconfont-new.png)

##### 导入图标

搜索并找到你想要使用的图标，点击图标上的 "添加到图标库" 按钮。

![添加入库](./assets/iconfont-add.png)

当你完成搜索后，点击右上角的 "添加到图库" 图标，点击下面的 "添加到项目"，选择你创建的项目然后确认。

##### 编辑图标

在项目页面上，你可以编辑项目中的图标，包括调整位置、大小、旋转、颜色、Unicode 编码和字体类/符号。

![编辑图标](./assets/iconfont-edit.png)

##### 生成链接

点击项目上方的 "字体类" 按钮，然后点击 "生成链接"。

![添加到库](./assets/iconfont-generate.png)

然后使用生成的链接设置 `assets` 选项。

::: tip

你需要每次添加新图标时重新生成和更新链接。

:::

### 图片

任何图标类型都支持图像链接（不支持相对链接）。

<!-- markdownlint-disable MD034 -->

::: md-demo 案例

完整链接: ::https://theme-hope-assets.vuejs.press/logo.svg::

绝对路径: <VPIcon icon="/favicon.ico" />

<!-- favicon.ico 应该放在 .vuepress/public 文件夹中 -->
<!-- ::/favicon.ico:: 是不被支持的，因为它会被解析为颜色 -->

:::

<!-- markdownlint-enable MD034 -->

[@vuepress/plugin-icon]: https://ecosystem.vuejs.press/zh/plugins/features/icon.html
