---
title: 指南
icon: lightbulb
---

本插件可以自动处理你站点的重定向。

## 控制页面重定向

如果你改动了已有页面的地址，你可以在 Frontmatter 中使用 `redirectFrom` 选项设置重定向到此页面的地址，这样可以保证用户在访问旧链接时重定向到新的地址。

如果你需要将已有的页面重定向到新的页面，可以在 Frontmatter 中使用 `redirectTo` 选项设置需要重定向到的地址。这样该页面会在访问时重定向到新的地址。

## 重定向到页面

你可以通过设置插件选项中的 `config` 设置一个重定向映射。你可以传入一个对象，其中的每个键值对都是一个重定向的映射。

对于每个重定向映射来说，键名是重定向的源地址，键值是重定向的目标地址。其中键名必须是一个绝对路径，键值可以是一个绝对路径，也可以是一个完整路径。

当你在插件选项传入 `hostname` 时，所有绝对路径形式重定向地址均会添加 `hostname` 与 `base` 转换为一个完整路径。

::: tip 例子

当你通过下列选项调用插件且 `base` 为 `/` 时:

```js
redirect({
  hostname: "https://example.com",
  config: {
    "/foo.html": "/bar.html",
    "/baz.html": "https://example.com/qux.html",
  },
});
```

插件会将 `/foo.html` 重定向到 `https://example.com/bar.html`，`/baz.html` 重定向到 `https://example.com/qux.html`。

而当你不设置上方 `hostname` 时，插件会将 `/foo.html` 重定向到 `/bar.html`，`/baz.html` 重定向到 `https://example.com/qux.html`。

:::

`config` 选项也接收一个参数为 `App` 的函数，该函数的返回值将会被解析为一个重定向映射。这意味着你可以通过传入函数来完全自定义重定向。

::: tip 例子

假设我们已经在 `post` 文件夹下有一些文章，而在一次更新中，我们将 `post` 重命名为 `posts`，那么我们可以这样定义一个重定向映射:

```js
redirect({
  hostname: "https://example.com",
  config: (app) =>
    Object.fromEntries(
      app.pages
        .filter(({ path }) => path.startsWith("/posts/"))
        .map(({ path }) => [path.replace(/^\/posts\//, "/post/"), path])
    ),
});
```

:::

## 重定向语言

插件可以自动处理站点的多语言重定向。

### 自动多语言

插件可以根据用户的语言首选项，自动将无多语言链接重定向到用户需要的多语言页面。为了实现这一点，你需要留空默认的语言目录 (`/`)，并在插件选项中设置 `autoLocale: true`。插件会自动根据用户语言跳转到对应的语言页面。

也就是你需要设置以下目录结构:

```
.
├── en
│   ├── ...
│   ├── page.md
│   └── README.md
├── zh
│   ├── ...
│   ├── page.md
│   └── README.md
└── other_languages
    ├── ...
    ├── page.md
    └── README.md
```

并将主题选项的 locales 设置为:

```js
export default {
  locales: {
    "/en/": {
      lang: "en-US",
      // ...
    },
    "/zh/": {
      lang: "zh-CN",
      // ...
    },
    // other languages
  },
  // ...
};
```

这样当用户访问 `/` 或 `/page.html` 时，他们会自动根据当前浏览器语言重定向到 `/en/` `/en/page.html` 与 `/zh/` `/zh/page.html`。

::: info 自定义回退行为

有些时候，用户可能会在系统设置中添加多个语言。默认情况下，在站点支持首选语言，但首选语言不存在相应页面时，插件会尝试匹配用户设置的备用语言。

如果不需要回退到用户备用语言，而直接匹配用户首选语言，请在插件选项中设置 `localeFallback: false`。

:::

::: info 自定义缺失行为

有些时候，当用户访问一个页面时，文档尚未包含用户需要的语言版本 (一个普遍的情况是当前页面尚未完成相关语言的本地化)，这样插件需要做出默认行为，你可以通过插件选项中的 `defaultBehavior` 定制它:

- `"defaultLocale"`: 重定向到默认语言或首个可用语言页面 (默认行为)
- `"homepage"`: 重定向到当前语言的主页 (仅在文档包含用户语言时可用)
- `"404"`: 重定向到当前语言的 404 页 (仅在文档包含用户语言时可用)

:::

::: info 自定义默认路径

你可以通过设置插件选项中的 `defaultLocale` 来自定义默认路径。默认情况下，插件会使用 `locales` 中的第一个键名作为默认路径。

:::

### 自动切换语言

插件支持在多语言文档中，自动根据用户语言首选项，将链接切换到用户需要的多语言页面。为了实现这一点，你需要在插件选项中设置 `switchLocale`，它可以是以下两个值:

- `direct`: 直接切换到用户语言首选项页面，而不询问
- `modal`: 在用户语言首选项与当前页面语言不同时，弹出一个对话框询问用户是否切换语言

### 自定义多语言配置

默认情况下，插件会从站点的多语言配置 `locales` 选项中，读取 `语言路径` 和 `lang` 生成多语言配置。有些时候，你可能希望多个语言命中同一个路径，这种情况下，你应该设置插件的 `localeConfig` 选项。

比如，你可能希望所有英文用户都匹配到 `/en/`，并将繁体中文用户匹配到 `/zh/` 中，那么你可以设置:

```js
redirect({
  localeConfig: {
    "/en/": ["en-US", "en-UK", "en"],
    "/zh/": ["zh-CN", "zh-TW", "zh"],
  },
});
```

## 重定向站点

有时你可能会更改 `base` 或为你的站点使用新域名，因此你可能希望原始站点自动重定向到新站点。

为了解决这个问题，插件提供了 `vp-redirect` 脚手架。

```shell
使用:
  $ vp-redirect generate [源文件夹]

Options:
  --hostname <hostname>  重定向到的域名 (例如: https://new.example.com/) (默认: /)
  -c, --config <config>  设置配置文件路径
  -o, --output <output>  设置输出目录 (默认: .vuepress/redirect)
  --cache <cache>        设置缓存文件的目录
  -t, --temp <temp>      设置临时文件的目录
  --clean-cache          生成前清理缓存文件
  --clean-temp           生成前清理临时文件
  -h, --help             显示此消息
```

你需要传入 VuePress 项目源目录并设置 `hostname` 选项。重定向助手脚手架将初始化你的 VuePress 项目以获取页面，然后在输出目录生成重定向 html 文件。

默认情况下，插件将输出到源文件夹下的 .vuepress/redirect 目录。你应该将其上传到你的原始站点以提供重定向。
