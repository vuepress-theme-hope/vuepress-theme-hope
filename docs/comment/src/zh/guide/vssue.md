---
icon: creative
---

# 使用 Vssue

## 选择你要使用的代码托管平台

Vssue 支持通过 GitHub, Gitlab, Bitbucket 或者 Gitee 的 Issue 系统来为你的静态页面提供评论功能，你可以选择其中之一来使用。

前往 [支持的代码托管平台 - 创建 OAuth App](./supported-platforms.md) 查看详细指引。

完成这一步之后，你将会配置好一个 OAuth App，并得到对应的 `client id` 和 `client secret`，它们将会用于 Vssue 的使用。

- `owner`: 对应 repository 的拥有者帐号或者团队
- `repo`: 用来存储评论的 repository
- `clientId`: OAuth App 的 `client id`
- `clientSecret`: OAuth App 的 `client secret` (只有在使用某些平台时需要)

## Vssue 配置

本插件通过 Vssue 提供的 [@vssue/vuepress-plugin-vssue](https://www.npmjs.com/package/@vssue/vuepress-plugin-vssue) 来帮助你在 VuePress 中快速使用 Vssue。

### 使用插件

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js

module.exports = {
  plugins: {
    "@mr-hope/comment": {
      type: "vssue",
      // 设置 `platform` 而不是 `api`
      platform: "github",

      // 其他的 Vssue 配置
      owner: "OWNER_OF_REPO",
      repo: "NAME_OF_REPO",
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
    },
  },
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```js
// .vuepress/config.ts

export default {
  plugins: {
    "@mr-hope/comment": {
      type: "vssue",
      // 设置 `platform` 而不是 `api`
      platform: "github",

      // 其他的 Vssue 配置
      owner: "OWNER_OF_REPO",
      repo: "NAME_OF_REPO",
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
    },
  },
};
```

</CodeGroupItem>
</CodeGroup>

::: tip

唯一的区别在于，你需要设置 `platform` 而不是对应的 `api` 包。

`@vssue/vuepress-plugin-vssue` 会自动根据你设置的 `platform` 为你解析对应的 API 包:

- Platform `github` - API 包 `@vssue/api-github-v3`
- Platform `github-v4` - API 包 `@vssue/api-github-v4`
- Platform `gitlab` - API 包 `@vssue/api-gitlab-v4`
- Platform `bitbucket` - API 包 `@vssue/api-bitbucket-v2`
- Platform `gitee` - API 包 `@vssue/api-gitee-v5`

:::

### 使用 Vssue 组件

`Vssue` 已经注册为 Vue 组件，你可以在你的 VuePress Markdown 文件中直接使用它。

```md
<!-- README.md -->

# Vssue Demo

<Vssue title="Vssue Demo" />
```

### 自定义样式变量

通过 VuePress 的 [palette.styl](https://vuepress.vuejs.org/zh/config/#palette-styl)，你可以很轻松地修改 Vssue 的样式变量。

Vssue 样式中预定义了一些 [Stylus 变量](http://stylus-lang.com/docs/variables.html)，你可以在 `vssue/src/styles/_variables.styl` 中查看它们:

```stylus
// 主题颜色
$vssue-theme-color

// 文字颜色  (用于普通文字)
$vssue-text-color

// 浅色文字颜色  (用于备注等文字)
$vssue-text-light-color

// 边框颜色
$vssue-border-color

// 进度条颜色
$vssue-progress-color

// 文字大小
$vssue-font-size

// 字体
$vssue-font-family

// 切换为移动端模式的屏幕宽度
$vssue-breakpoint-mobile

// 文字方向 (ltr / rtl)  (为 RTL 语言使用，如希伯来语等)
$vssue-direction
```

举例来说，Vssue 默认使用一个“Vue 绿色” (`#3eaf7c`) 作为主题颜色，并将其设置为 `$vssue-theme-color` 的默认值。你可以在引入 `vssue/src/styles/index.styl` 之前设置 `$vssue-theme-color` 的值来改变主题颜色。

默认情况下，下面这些 Vssue 的样式变量与 VuePress 的样式变量相等:

```stylus
// @vssue/vuepress-plugin-vssue/styles/index.styl

$vssue-theme-color ?= $accentColor
$vssue-text-color ?= $textColor
$vssue-border-color ?= $borderColor
$vssue-breakpoint-mobile ?= $MQMobile
```

如果你想要覆盖它们，在你的 `palette.styl` 中设置即可:

```stylus
// .vuepress/styles/palette.styl

$accentColor = blue

$vssue-theme-color = red
```

## 不想使用 Vssue 插件

Vssue 是适配 SSR 的，所以你可以不使用 `@vssue/vuepress-plugin-vssue`，而是像其他 Vue 插件 / 组件一样，在 VuePress 中直接引入 Vssue (尤其是在你对 Vssue 的样式进行了自定义的时候) 。

但是我们仍然建议你在 VuePress 中通过 `@vssue/vuepress-plugin-vssue` 来使用 Vssue，该插件已经帮助你仅在客户端加载 Vssue 来避免一些潜在的问题。

如果你不想使用我们提供的插件，你可能需要将 `<Vssue>` 组件放置在 `<ClientOnly>` 组件中来避免这些潜在的问题，即:

```vue
<ClientOnly>
  <Vssue />
</ClientOnly>
```

> 参考 VuePress [内置的组件 - ClientOnly](https://vuepress.vuejs.org/zh/guide/using-vue.html#clientonly)
