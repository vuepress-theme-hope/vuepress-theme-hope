---
title: 指南
icon: creative
---

插件为 VuePress 带来了增强的 PWA 支持[^pwa-intro]。

<!-- more -->

[^pwa-intro]: **PWA 介绍**

    PWA 全称 Progressive Web app，即渐进式网络应用程序，标准由 W3C 规定。

    它允许网站通过支持该特性的浏览器将网站作为 App 安装在对应平台上。

## 内容缓存和更新

Service Worker [^service-worker] (简称 SW) 主要用于获取并托管网站内容。

[^service-worker]: **Service Worker 简要介绍**

    1. Service Worker 会在注册过程中获取注册在其中的所有文件并缓存它们。

    1. 注册成功后，Service Worker 激活，并开始代理并控制你的全部请求。

    1. 每当你想要通过浏览器发起访问请求后，Service Worker 将会查看其是否存在与自身缓存列表中，若存在则直接返回缓存好的结果，否则调用自身的 fetch 方法进行获取。你可以通过自定义 fetch 方法，来完全控制网页内资源获取请求的结果，比如在离线时提供一个 fallback 的网页。

    1. 每次用户重新打开网站时，Service Worker 会向自身注册时的地址发出校验命令，如果检测到新版本的 Service Woker，则会更新自身，并开始缓存注册在新 Service Worker 中的资源列表。成功获取内容更新后，Service Worker 将会触发 `update` 事件。可以通过此事件提示用户，比如将在右下角显示一个弹出窗口，提示用户新内容可用并允许用户触发更新。

本插件会自动通过 `workbox-build` 注册 Service Woker。

为了更好地控制 Service Worker 可以预缓存的内容，插件提供了下列设置。

如果你是一个高级用户，你也可以直接设置 `generateSwConfig` 来将选项传递给 `workbox-build`。

### 默认缓存

默认情况下插件会预缓存所有与网站相关的文件: `**/*.{html,js,css,svg}`

同时插件还会缓存字体文件: `**/*.{woff,woff2,eot,ttf,otf}`。

### 缓存控制

基于可安装性[^installable]的要求，插件提供了缓存控制的相关选项。

[^installable]: **可安装性**

    想要让网站可以注册为 PWA，网站需要自行成功注册有效的 Service Worker，同时添加合法的 manifest 清单文件并在网站中声明它。

    各平台或浏览器对 Service Worker 缓存的大小有要求，当 Service Worker 缓存的文件体积过大后，该网站将会被标记为不可安装。对于 Safari 这个阈值是 50 MB，少数浏览器会设置更少或更多的值 (30MB, 70MB, 80MB)，最大的 Chrome 也将阈值标识在 100 MB。

    另外，清单文件应至少包含 `name`(或 `short_name`) `icons` `start_url`。

    从 Chrome 93 起 Service Woker 必须含有有效的控制离线请求的 fetch 事件

#### 图片缓存

你可以通过设置 `cachePic` 选项为 `true` 来缓存站点图片。

如果您的站点体积不大，且配图大多为关键性说明，希望可以在离线模式下显示，建议将此项设置为 `true`。

::: info 图片识别

我们通过文件后缀名识别图片，任何以 `.png`, `.jpg`, `.jpeg` , `.gif`, `.bmp`, `.webp` 结尾的文件都会视为图片。

:::

#### HTML 缓存

当你网站体积过大时，你可以通过设置 `cacheHTML` 为 `false` 来仅缓存除主页和 404 错误页。

::: tip 为什么可以移除

虽然说 VuePress 为所有的页面通过 SSR[^ssr] 生成了 HTML 文件，但是这些文件主要用于 SEO[^seo]，并能够让你在后端不做 SPA[^spa] 配置的情况下能够直接访问任何链接。

[^ssr]: **SSR**: **S**erver **S**ide **R**endering，服务端渲染
[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization，搜索引擎增强，

    详见 [SEO 介绍](https://mrhope.site/code/website/html/definition/seo/)

[^spa]: **SPA**: **S**ingle **P**age **A**pplication, 单页应用

    大多只有主页，并使用 history mode 处理路由，而不是真的在页面之间导航。

VuePress 本质上是一个 SPA。这意味着你只需要缓存主页并从主页进入即可正常访问所有页面。

当你站点页面数量或内容很多，包含 HTML 文件后体积过大时，你可以考虑将此项设置为 `false`，这样可以缩减大约 40% 的体积。缺点是用户在离线环境下只能通过主页进入再自行导航到对应页面。直接访问某个链接会出现网页错误的提示。

:::

#### 大小控制

为了防止在预缓存列表中包含大文件，任何大于 2MB 的文件或大于 1MB 的图片都将被删除。

你可以通过 `maxSize` 选项自定义缓存的最大文件大小 (单位 KB)，或通过 `maxPicSize` 来更改图片的大小限制 (单位: KB)。

### 更新弹窗

成功下载新内容后，我们将提供更新弹出窗口。

::: tip 自定义弹窗

如果你对默认的弹窗不满意，你可以自行编写组件更换。你需要全局注册自己的弹窗组件，并将组件的名称传递给 `popupComponent` 选项。

:::

## 清单文件生成

为了保证 PWA 的可安装性，网站需要生成清单文件，并通过 `link` 声明有效的 manifest 清单文件地址[^manifest]。

[^manifest]: **清单文件**

    清单文件使用 JSON 格式，负责声明 PWA 各项信息，如名称、描述、图标、快捷动作等。

    为了使你的站点能够被注册为 PWA，你需要满足 manifest 基本的规范，才能使浏览器认为该网站为一个可安装的 PWA 并允许用户安装它。

    ::: info

    Manifest 的标准与规范，请详见 [W3C Manifest](https://w3c.github.io/manifest/)

    :::

插件会在输出目录自动为你生成 Manifest 文件 `manifest.webmanifest`，同时还会添加清单地址声明到每一个 HTML 的 `<head>` 中。

如果你在 `.vuepress/public` 中已有一个 `manifest.webmanifest` 或 `manifest.json`，该插件将读取它并合并到最终 manifest 中。

### 自动生成

插件会尽可能的通过 VuePress 插件接口的信息，为 manifest 的大部分设置项设置 fallback，这意味着即使你无需设置 manifest 的大多数内容。

如果未设置下列选项，它们会按照顺序依次尝试回退到以下预设值。

| 选项                        | 默认值                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | --- | --------- |
| name                        | `siteConfig.title` \|\| `themeConfig.title` \|\| `'Site'`                                              |
| short_name                  | `siteConfig.title` \|\| `themeConfig.title` \|\| `'Site'`                                              |
| description                 | `siteConfig.description` \|\| `themeConfig.description` \|\| `'A site built with vuepress-theme-hope'` |
| lang                        | `siteConfig.locales['/'].lang` \|\| `themeConfig.locales['/'].lang` \|\| `"en-US"`                     | \\  | `"en-US"` |
| start_url                   | `context.base`                                                                                         |
| scope                       | `context.base`                                                                                         |
| display                     | `"standalone"`                                                                                         |
| theme_color                 | `"#46bd87"`                                                                                            |
| background_color            | `'#ffffff'`                                                                                            |
| orientation                 | `'portrait-primary'`                                                                                   |
| prefer_related_applications | `false`                                                                                                |

完整的配置项详见 [Manifest 类型定义文件](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/pwa/src/types/manifest.d.ts)

### 手动配置

你可以在 `manifest` 选项中手动指定 manifest 的各项内容。

::: tip 优先级

`manifest` 选项的设置具有最高的优先级，之后是 `public` 文件夹下可能存在的 manifest 文件。

:::

**你至少应该通过 `manifest.icons` 或 PWA 插件中的其他选项设置一个有效的图标。** 因为这是我们没法默认生成的。

::: warning

可安装性[^installable]规范要求 manifest 中至少声明一个有效的图标。

所以如果你不配置 `manifest.icons`，访问者只能享受到 Service Worker 缓存带来的离线可访问性，而并不能作为 PWA 进行安装。

另外插件并不会处理 manifest 中的任何内容，而是原样输出它们。这意味着如果打算你部署到某个子目录，你则应自行添加 `base` 到 manifest 中的相应 URL。

:::

## 其他选项

插件还提供了其他 PWA 相关选项，比如微软磁贴图标与颜色设置，苹果图标等。

你可以酌情根据需要设置它们。详细的选项请见 [配置页](config.md)。

## 相关阅读

更多内容，请详见:

- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [W3C Manifest 规范](https://w3c.github.io/manifest/)
