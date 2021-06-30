---
title: 变更日志
icon: time
---

该文件包含 `vuepress-theme-hope` 及其插件的所有显着更改。

<!-- more -->

## v1.19.0

### 新功能

- active-hash 插件 <Badge text="新增" />
- smooth-scroll 插件 <Badge text="新增" />

## v1.18.0

### 新功能

添加自定义布局支持。

## v1.17.0

### 新功能

添加 Waline 支持。

## v1.16.0

### 新功能

#### 图片链接修复 <Badge text="new" />

现在，你可以在图片链接中使用特殊字符。这是一个针对 VuePress 内部 Bug 的修正。

此功能默认情况下处于启用状态，并由 `imageFix` 选项控制。

#### 链接控制 <Badge text="new" />

ThemeConfig 新增 `cleanUrl` 选项以更好地控制链接生成。

### 破坏变更 <Badge text="配置" type="warn" />

ThemeConfig 中的 `namedChunk` 选项更名为 `chunkRename`。

## v1.15.2

### 新功能

- **md-enhance:** 为 mermaid 添加更多代码块

  你现在可以在 Markdown 中使用如下代码块:

  ````md
  ```sequence
  顺序图表配置
  ```
  ````

  ````md
  ```class
  类图表配置
  ```
  ````

  ````md
  ```state
  状态图表配置
  ```
  ````

  ````md
  ```er
  入口关系图表配置
  ```
  ````

  ````md
  ```gantt
  甘特图表配置
  ```
  ````

  ````md
  ```pie
  饼图表配置
  ```
  ````

  ````md
  ```journey
  用户日志配置
  ```
  ````

- **theme:** 页面 frontmatter 新增 `anchorDisplay` 选项

## v1.15.1

### 新功能

#### 流程图的新语法

你可以除 `flow` 外使用

````md
```flowchart
your flowchart...
```
````

生成流程图。

#### 任务列表

`md-enhance` 插件中 `tasklist` 选项现在是可配置的:

```ts
interface TaskListOptions {
  /**
   * 是否使用 `<label>` 来包裹文字
   *
   * @default true
   */
  label?: boolean;
  /**
   * 是否将 `<label>` 放置在 `<input>` 后还是包裹住 `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
```

#### Tex

插件 `md-enhance` 中的 `tex` 现在是可配置的。 (作为`KatexOptions`)

## v1.15.0

### 新功能

#### Mermaid <Badge text="new" />

`md-enhance` 插件中新增 `mermaid` 选项以支持 mermaid 图表。

你可以使用:

````md
```mermaid
your mermaid...
```
````

在你的 Markdown 中生成 mermaid 图表。

#### 任务列表 <Badge text="new" />

`md-enhance` 插件中新增 `tasklist` 选项以支持任务列表。

你可以在 Markdown 中使用 `- [ ] 文字` 或 `- [x] 文字` 来生成任务列表。

## v1.14.4

### 新功能

现在，体积较大的模块不仅会拆分为 chunks，而且只有在它们被使用时才输出到构建内容中。

这将有助于更好地控制打包体积。

### 破坏变更 <Badge text="配置" type="warn" />

主题配置中的 `docsBranch` 从 `'master'` 更改为`'main'`。

## v1.14.1

### 新功能 <Badge text="new" />

`vuepress-theme-hope` 新增 `themeConfig`、`navbarConfig` 和 `sidebarConfig` 辅助函数，以便在配置文件中提供更好的验证和自动补全功能。

## v1.14.0

### 破坏变更

#### 流程图 <Badge text="语法" type="warn" />

````md
```flow preset
your flowchart...
```
````

更改为

````md
```flow:preset
your flowchart...
```
````

#### baselang <Badge text="移除" type="error" />

所有的 `baseLang` 选项均被移除。

你应该使用 `lang` 键在 `locales["/"]` 中指定根目录语言。

## v1.13.4

### 新功能

- 博客首页新增 `heroFullScreen`选项
- 导航栏新增 `hideSiteTitleonMobile` 选项
- 媒体图标新增 “电子邮件” 图标

## v1.13.3

### 新功能

添加德语支持。

## v1.13.0

### 破坏变更 <Badge text="语法" type="warn" />

流程图语法从

```md
@flowshart
你的流程图...
@flowend
```

改变为

````md
```flow
你的流程图...
```
````

进行此更改是为了支持 [Typora](https://typora.io/)。

## v1.12.3

### 新功能 <Badge text="new" />

新增 `create-vuepress-theme-hope` 包。

你可以使用 `yarn create vuepress-theme-hope [dir]` 或 `npm init vuepress-theme-hope [dir]` 轻松创建主题模板。

## v1.12.1

### 破坏变更 <Badge text="结构" type="warn" />

主题的结构发生了变更，因此如果你正在扩展此主题，则可能需要更新代码。

## v1.12.0

### 新功能 <Badge text="new" />

- 新增 [`git` 插件](https://vuepress-theme-hope.github.io/git/zh/) (`@mr-hope/vuepress-plugin-git`) :tada:

### 破坏变更 <Badge text="移除" type="warn" />

- `last-update` 插件已移除

## v1.11.1

### 破坏变更 <Badge text="配置" type="warn" />

- **comment**: `pageInfo` 中的所有信息名称都从 PascalCase 更改为 kebab-case。且 `ReadTime` 变更为 `reading-time`。

## v1.11.0

### 新功能

- **theme**: 博客模式新增 `/star/` 页面。所有收藏文章均在此页面上列出。

### 破坏变更 <Badge text="名称" type="warn" />

- **components**: `<MyBadge>` 重命名为 `<Badge>`，以对齐 VuePress 默认主题。

## v1.10.0

### 新功能 <Badge text="new" />

- **components**: 添加了 `<CodeGroup>` 和 `<CodeGroupItem>` 组件。

- **theme**: 你可以在页面的 Frontmatter 中使用 `star：true` 为页面加注星标。

  星标页面都将出现在文章侧边栏中。

## v1.9.1

### 新功能 <Badge text="new" />

- **theme**: 主题配置新增 `blog.roundAvatar` (默认值: `true`)

## v1.9.0

### 新功能 <Badge text="new" />

新增 [**Feed 插件**](https://vuepress-theme-hope.github.io/feed//zh/)。:tada:

### 破坏变更 <Badge text="移除" type="warn" />

- **pwa**: 移除 `head` 函数，使用 hacking 注入 PWA 链接。

## v1.8.2

### 破坏变更 <Badge text="移除" type="warn" />

- **md-enhance**: 移除代码演示的 `horizontal` 选项

## v1.8.0

### 新功能 <Badge text="new" />

- **theme**: 主题配置新增 `namedChunks` 选项

## v1.6.0

### 新功能 <Badge text="new" />

- **md-enhance**: [新的代码演示功能](https://vuepress-theme-hope.github.io/zh/guide/markdown/demo/) :tada:

## v1.5.4

### 新功能 <Badge text="new" />

- **md-enhance**: 添加两端对齐容器

  ```md
  ::: justify

  内容

  :::
  ```

## v1.5.0

### 新功能 <Badge text="new" />

- **last-update**: 添加 `timezone` 选项

  当你通过 GitHub actions 上进行部署时，这很有用。(GitHub actions 使用 `UTC` 时区)

- **md-enhance**: 可以通过 `presentation.plugins` 选项配置幻灯片使用的插件
- **theme**: 添加 Font Awesome 图标支持
- **theme**: 添加幻灯片布局

  你可以在 Frontmatter 中使用 `layout: Slide` 来使用幻灯片布局。

## v1.4.7

### 新功能 <Badge text="new" />

- **pwa**: 添加安装弹窗

## v1.4.5

### 新功能 <Badge text="new" />

- **pwa**: 添加 `maxPicSize` 选项
- **seo**: 自动生成 robots.txt

### 破坏变更 <Badge text="配置" type="warn" />

- **pwa**: `cacheMaxSize` 重命名为 `maxSize`

## v1.4.3

### 破坏变更 <Badge text="扩展名" type="warn" />

- **pwa**: Manifest 改用官方扩展名

  Manifest 文件名从 `manifest.json` 更改为 `manifest.webmanifest`。

## v1.4.1

### 新功能 <Badge text="new" />

- **pwa**: 新增 `cacheHTML` 选项

## v1.3.0

### 新功能 <Badge text="new" />

- **md-enhance**: 通过 Reveal.js 添加幻灯片支持 :tada:

## v1.2.0

### 新功能 <Badge text="new" />

添加越南语支持。

## v1.1.0

### 破坏变更 <Badge text="API" type="error" />

- **theme**: 将主题中的所有插件配置重命名为插件的 camelCase 名称:

- `addthis` 重命名为 `addThis`
- `markdown` 更名为 `mdEnhance`
- `lastUpdatedTransformer` 重命名为 `lastUpdate`

## v1.0.1

### 新功能 <Badge text="new" />

- **theme**: 为媒体链接添加码云图标

## v1.0.0

### 破坏变更 <Badge text="API" type="error" />

- **theme**: 使用 `const {config} = require('vuepress-theme-hope')` 代替 `const resolve = require('vuepress-theme-hope / resolve')`
