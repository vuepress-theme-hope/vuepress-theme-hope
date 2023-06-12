---
title: 指南
icon: lightbulb
---

插件为 VuePress 带来了增强的 PWA 支持[^pwa-intro]。

<!-- more -->

[^pwa-intro]: **PWA 介绍**

    PWA 全称 Progressive Web app，即渐进式网络应用程序，标准由 W3C 规定。

    它允许网站通过支持该特性的浏览器将网站作为 App 安装在对应平台上。

## 介绍

Service Worker [^service-worker] (简称 SW) 主要用于获取并托管网站内容。

[^service-worker]: **Service Worker 简要介绍**

    1. Service Worker 会在注册过程中获取注册在其中的所有文件并缓存它们。

    1. 注册成功后，Service Worker 激活，并开始代理并控制你的全部请求。

    1. 每当你想要通过浏览器发起访问请求后，Service Worker 将会查看其是否存在与自身缓存列表中，若存在则直接返回缓存好的结果，否则调用自身的 fetch 方法进行获取。你可以通过自定义 fetch 方法，来完全控制网页内资源获取请求的结果，比如在离线时提供一个 fallback 的网页。

    1. 每次用户重新打开网站时，Service Worker 会向自身注册时的地址发出校验命令，如果检测到新版本的 Service Worker，则会更新自身，并开始缓存注册在新 Service Worker 中的资源列表。成功获取内容更新后，Service Worker 将会触发 `update` 事件。可以通过此事件提示用户，比如将在右下角显示一个弹出窗口，提示用户新内容可用并允许用户触发更新。

本插件会自动通过 `workbox-build` 注册 Service Worker。为了更好地控制 Service Worker 可以预缓存的内容，插件提供了下列设置。

::: tip

如果你是一个高级用户，你可以直接设置 `generateSwConfig` 来将选项传递给 `workbox-build`。

:::

## 缓存控制

基于可安装性[^installable]的要求，插件提供了缓存控制的相关选项。

[^installable]: **可安装性**

    想要让网站可以注册为 PWA，网站需要自行成功注册有效的 Service Worker，同时添加合法的 manifest 清单文件并在网站中声明它。

    各平台或浏览器对 Service Worker 缓存的大小有要求，当 Service Worker 缓存的文件体积过大后，该网站将会被标记为不可安装。对于 Safari 这个阈值是 50 MB，少数浏览器会设置更少或更多的值 (30MB, 70MB, 80MB)，最大的 Chrome 也将阈值标识在 100 MB。

    另外，清单文件应至少包含 `name`(或 `short_name`) `icons` `start_url`。

    ::: note

    从 Chrome 93 起 Service Worker 必须含有有效的控制离线请求的 fetch 事件，才符合可安装性标准。

    但是插件目前并没有默认包含相关处理逻辑，所以在 Chrome 93 或更高版本的安卓设备上，网站不会弹出安装提示。

    :::

### 默认缓存

默认情况下插件会预缓存所有的 JS、CSS 和 SVG 文件，但仅缓存主页和 404 页面的 HTML。

同时插件还会缓存字体文件: `**/*.{woff,woff2,eot,ttf,otf}`。

### 图片缓存

你可以通过设置 `cachePic` 选项为 `true` 来缓存站点图片。

如果你的站点体积不大，且配图大多为关键性说明，希望可以在离线模式下显示，建议将此项设置为 `true`。

::: info 图片识别

我们通过文件后缀名识别图片，任何以 `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.webp` 结尾的文件都会视为图片。

:::

### HTML 缓存

当你网站体积不大，并且希望文档完全离线可用时，你可以通过设置 `cacheHTML` 为 `true` 来缓存所有 HTML 页面。

::: tip 为什么默认不缓存非主页和 404 页面

虽然说 VuePress 为所有的页面通过 SSG[^ssg] 生成了 HTML 文件，但是这些文件主要用于 SEO[^seo]，并能够让你在后端不做 SPA[^spa] 配置的情况下能够直接访问任何链接。

[^ssg]: **SSG**: **S**tatic **S**ite **G**enerating，静态站点生成。
[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization，搜索引擎增强，

    详见 [SEO 介绍](https://mrhope.site/code/website/html/definition/seo.html)

[^spa]: **SPA**: **S**ingle **P**age **A**pplication, 单页应用

    大多只有主页，并使用 history mode 处理路由，而不是真的在页面之间导航。

VuePress 本质上是一个 SPA。这意味着你只需要缓存主页并从主页进入即可正常访问所有页面。所以默认不缓存其他 HTML 能够有效减小缓存大小 (可以缩减大约 40% 的体积)，加快 SW 更新速度。

但是这样做也有缺点，如果用户直接从非主页进入网站，首个页面的 HTML 文件仍需要从互联网加载。同时离线环境下，用户只能通过主页进入再自行导航到对应页面，直接访问某个链接会出现无法访问的提示。

:::

### 大小控制

为了防止在预缓存列表中包含大文件，任何大于 2 MB 的文件或大于 1 MB 的图片都将被删除。

你可以通过 `maxSize` 选项自定义缓存的最大文件大小 (单位 KB)，或通过 `maxPicSize` 来更改图片的大小限制 (单位: KB)。

## 更新控制

我们提供 `update` 选项控制用户如何接收更新。

`update` 选项的默认值是 `"available"`，这意味着当网站内容更新后，新的 SW 会在后台静默安装，并在安装结束后弹窗提示用户新内容就绪。用户可以自主选择是否立即刷新查看新内容。

由于默认行为下，用户访问途中在 SW 就绪前都会阅读旧版本文档并且得不到相关提示。如果你的文档仍在建设期，希望尽早提示用户他可能在阅读已过时的内容，你可以将其设置为 `"hint"`。这样用户在进入文档后数秒内就可以收到新内容已发布的提示。但这样做的负面效果是如果用户在新 SW 就绪前选择更新，那么他将在新 SW 安装并接管页面前，需要从互联网获取页面的全部资源。

如果你的文档很稳定，或者你在托管博客，不太关心用户立即接收到最新版本，你可以将其设置为 `"disabled"`，这意味着新的 SW 将在后台完全静默安装并在安装后等待，当旧版本 SW 控制的页面全部关闭后，用户下一次访问时，新 SW 将开始接管并提供用户新内容。此设置可以避免用户在访问途中被右下角的弹窗所打扰。

如果你希望通过 SW 来加速用户在弱网或无网条件下的访问，但同时希望用户时刻访问新内容，你可以将此选项设置为 `"force"`。此选项的行为是在检测到新 SW 后立即注销旧 SW 并刷新页面以确保用户浏览最新内容。但我们强烈推荐除非必要不适用此选项，因为这会导致新 SW 发布后，用户在进入网站后的几秒内会遇到预期之外的突然刷新，并且他们将必须通过互联网访问文档并完全重新安装最新的 SW。

### 更新提示弹窗

当检测到新内容 (检测到新的 SW) 时， 更新提示弹窗将会在右下角显示，并允许用户刷新并应用。

::: tip 自定义弹窗

如果你对默认的弹窗不满意，你可以自行编写组件更换。你需要全局注册自己的弹窗组件，并将组件的名称传递给 `hintComponent` 选项。

:::

### 更新就绪弹窗

当新内容就绪 (新的 SW 安装成功并开始等待) 后，更新就绪弹窗将会在右下角显示，并允许用户刷新并应用。

::: tip 自定义弹窗

如果你对默认的弹窗不满意，你可以自行编写组件更换。你需要全局注册自己的弹窗组件，并将组件的名称传递给 `updateComponent` 选项。

:::

## 清单文件生成

为了保证 PWA 的可安装性，网站需要生成清单文件，并通过 `<link>` 声明有效的 manifest 清单文件地址[^manifest]。

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

| 选项                        | 默认值                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| name                        | `siteConfig.title` \|\| `siteConfig.locales['/'].title` \|\| `"Site"`                                   |
| short_name                  | `siteConfig.title` \|\| `siteConfig.locales['/'].title` \|\| `"Site"`                                   |
| description                 | `siteConfig.description` \|\| `siteConfig.locales['/'].description` \|\| `"A site built with vuepress"` |
| lang                        | `siteConfig.locales['/'].lang` \|\| `"en-US"`                                                           |
| start_url                   | `siteConfig.base`                                                                                       |
| scope                       | `siteConfig.base`                                                                                       |
| display                     | `"standalone"`                                                                                          |
| theme_color                 | `"#46bd87"`                                                                                             |
| background_color            | `"#ffffff"`                                                                                             |
| orientation                 | `"portrait-primary"`                                                                                    |
| prefer_related_applications | `false`                                                                                                 |

完整的配置项详见 [Manifest 类型定义文件](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/pwa2/src/shared/manifest.ts)。

### 手动配置

你可以在 `manifest` 选项中手动指定 manifest 的各项内容。

::: tip 优先级

`manifest` 选项的设置具有最高的优先级，之后是 `public` 文件夹下可能存在的 manifest 文件。

:::

**你至少应该通过 `manifest.icons` 或 PWA 插件中的其他选项设置一个有效的图标。** 因为这是我们没法默认生成的。

::: warning

可安装性[^installable]规范要求 manifest 中至少声明一个有效的图标。

所以如果你不配置 `manifest.icons`，访问者只能享受到 Service Worker 缓存带来的离线可访问性，而并不能作为 PWA 进行安装。

此外，该插件默认不处理清单中的任何内容，而是按原样输出。 这意味着，如果你计划部署到子目录，则应自行将 URL 前缀附加到自己的清单 Urls 中。

但是，如果你需要的所有东西都在 base 文件夹下，你可以在插件选项中设置 `appendBase: true` 让插件将 `base` 自动附加到任何地址。

:::

## 其他选项

插件还提供了其他 PWA 相关选项，比如微软磁贴图标与颜色设置，苹果图标等。

你可以酌情根据需要设置它们。详细的选项请见 [配置页](config.md)。

## 辅助函数

该插件还提供了一些辅助函数来帮助您操作 Service Worker，您可以通过 `vuepress-plugin-pwa2/client` 导入它们。

```ts
/**
 * 强制更新页面内容
 */
export const forceUpdate: () => void;

/**
 * 在 `serviceWorkerPath` 下注册 Service Worker
 *
 * @param serviceWorkerPath Service Worker 路径
 * @param hooks Service Worker 钩子
 * @param showStatus 是否在控制台显示状态
 */
export const registerSW: (
  serviceWorkerPath: string,
  hooks?: Hooks,
  showStatus?: boolean
) => Promise<void>;

/**
 * 在当前等待中的 Service Worker 中调用 `skipWaiting()`
 */
export const skipWaiting: (registration: ServiceWorkerRegistration) => void;

/**
 * 在当前激活的 Service Worker 中调用 `unregister()`
 *
 * @returns `true` 表示注销成功，`false` 表示注销失败
 */
export const unregisterSW: () => Promise<boolean>;
```

## 相关阅读

更多内容，请详见:

- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [W3C Manifest 规范](https://w3c.github.io/manifest/)
