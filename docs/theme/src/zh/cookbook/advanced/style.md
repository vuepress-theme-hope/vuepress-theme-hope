---
title: 如何自定义样式
icon: style
category:
  - 教程知识
  - 自定义
tag:
  - 自定义
  - 样式
---

本文简要介绍定制主题样式的方式。

<!-- more -->

## 自定义样式的方式

你可以在自己文档内的 `.vuepress/styles` 文件夹下放置三个文件进行样式配置。

- `index.scss`: 你可以在这里通过 CSS 或 SCSS 语法放置自己的样式以对主题的外观进行修改。

  填入的样式会注入到主题和插件样式的后部。

- `config.scss`: 你可以在这里设置一些样式相关变量，包括响应式断点、容器类名、代码主题等。

- `palette.scss`: 你可以在这里设置一些颜色和布局的相关变量，比如主题色、背景色、导航栏高度等。

上述文件支持的完整配置列表详见 [配置 → 样式](../../config/style.md)。

## 常见样式定制以及对应修改方法

### 修改背景颜色

请在 `config.scss` 中配置 `$bg-color` 开头的变量，详见 [配置 → 样式](../../config/style.md#颜色设置)

### 修改主题字体

如果你更喜欢**衬线体**[^serif] 而不是**无衬线体**[^sans-serif]，你可以自行修改字体。请在 `palette.scss` 中将 `$font-family` 设置为你想要的值。

::: tip 最佳实践

为了让你的网站在不同操作系统以及安装了不同字体的设备上显示良好，你应该设置后备字体[^fallback-font]。

中文博客下最常使用的字体是 Adobe 发布的思源宋体[^noto-serif-sc]。

所以我们推荐使用如下字体集作为衬线体首选样式:

```scss
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", "Noto Serif SC", "Microsoft Yahei", "WenQuanYi Micro Hei", "ST Heiti", sans-serif';
```

当然，你仍需要导入这个字体，你可以通过 [GitHub](https://github.com/googlefonts/noto-cjk) 下载该字体。

:::

[^serif]: 相关简介: <https://www.zhihu.com/topic/19559432/intro>
[^sans-serif]: 相关简介: <https://www.zhihu.com/topic/19559433/intro>
[^fallback-font]: 摘自维基百科

    后备字体 (Fallback font) 是指在当时显示的字型缺乏某些字元时，被用于显示缺失字元的字体。因为其作为显示的最后一道防线，后备字体应该尽可能包含所有 Unicode 字元。

    当缺失字元没有后备字体用于显示时，通常会将缺失字元改为黑色方块、白色空心方块、问号、Unicode 占位字元(U+FFFD)显示，或者干脆略过该字元。在实务上，像是 CSS 等支援字体列表依序显示的系统，通常会将一或多套后备字体置入列表最后，以防止缺字的情况发生。

[^noto-serif-sc]: 基于「开源字体授权发布」，并且在文档中说明可以基于其源代码进行二次修改后使用 (商用或者个人使用)，所以没有任何版权问题。

### 修改主题布局

主题允许你自由配置导航栏、侧边栏和页脚，如果你不喜欢它们，你也可以禁用它们。请查看 [指南 → 布局 → 导航栏](../../guide/layout/navbar.md)、[指南 → 布局 → 侧边栏](../../guide/layout/sidebar.md) 和 [指南 → 布局 → 页脚](../../guide/layout/footer.md) 获取完整的配置说明。

主题的内容布局也支持定制，如果你不喜欢默认启用的某些功能，你可以自由禁用它们。具体的配置请通过文档的搜索功能进行检索。

### 修改动画速度

如果你不太喜欢主题的动画速度，觉得它们太快或太慢，你可以在 `palette.scss` 中设置 `$transform-transition` 来改变动画时长和动画速度曲线，其默认值为 `"0.3s ease"`。

### 修改组件样式

如果你对某些组件的样式不满意，想在其上做一些微调，你可以在 `index.scss` 中通过添加带有 `!important` 的 CSS 来覆盖主题的默认样式。

如果你的改动涉及到修改组件 DOM (文档结构)，你可能需要参阅 [替换主题组件](replace.md) 章节来覆盖组件。

### 新增布局或在主题上二次创作

如果你希望在主题整体上进行一些改造，或者想要添加新的布局，你可以继承主题。继承后的主题可以存放在项目本地，也可以二次在 npm 上发布为新主题。

相关内容请参阅 [继承主题](extend.md)。
