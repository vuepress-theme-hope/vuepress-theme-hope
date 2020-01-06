---
icon: vssue
---

# Vssue 配置

## platform

`@vssue/vuepress-plugin-vssue` 会自动根据你设置的 `platform` 为你解析对应的 api 包：

- platform `github` - api 包 `@vssue/api-github-v3`
- platform `github-v4` - api 包 `@vssue/api-github-v4`
- platform `gitlab` - api 包 `@vssue/api-gitlab-v4`
- platform `bitbucket` - api 包 `@vssue/api-bitbucket-v2`
- platform `gitee` - api 包 `@vssue/api-gitee-v5`

## owner

- __类型__: `string`
- __详细__:

  用来存储 Issue 和评论的仓库的拥有者的名称。可能是一个用户，也可能是一个组织（__Github Organization__ / __Gitlab Group__ / __Bitbucket Team__）

  Vssue 将通过 `owner` 和 `repo` 在平台上定位这个仓库。

- __参考__: [repo](#repo)

### repo

- __类型__: `string`
- __详细__:

  用来存储 Issue 和评论的仓库的名称。

  Vssue 将通过 `owner` 和 `repo` 在平台上定位这个仓库。

- __参考__: [owner](#owner)

::: tip
仓库 URL 的常见模式是 `` `${baseURL}/${owner}/${repo}`  ``：

- Github: `https://github.com/${owner}/${repo}`
- Gitlab: `https://gitlab.com/${owner}/${repo}`
- Bitbucket: `https://bitbucket.org/${owner}/${repo}`
- Gitee: `https://gitee.com/${owner}/${repo}`
:::

### clientId

- __类型__: `string`
- __详细__:

  在 [OAuth2 spec](https://tools.ietf.org/html/rfc6749#section-2.3.1) 中介绍的 `client_id`。

  它是由平台分配的 client 标识符。你在创建 OAuth App 之后就可以得到它。

  Vssue 将使用 `clientId` 来获取用户的 access token。

- __参考__:
  - [创建 OAuth App](../guide/supported-platforms.md)

### clientSecret

- __类型__: `string`
- __默认值__: `undefined`
- __详细__:

  在 [OAuth2 spec](https://tools.ietf.org/html/rfc6749#section-2.3.1) 中介绍的 `client_secret`。

  它是由平台生成的 client 密钥。你在创建 OAuth App 之后就可以得到它。

  在和某些平台一起使用时， Vssue 将使用 `clientId` 和 `clientSecret` 来获取用户的 access token。

  ::: tip
  一些平台（如 Bitbucket 和 GitLab）支持 [Implicit Grant](https://tools.ietf.org/html/rfc6749#section-4.2)，所以在使用这些平台时不需要 `clientSecret`。

  然而，有一些平台（如 GitHub 和 Gitee）不支持它，所以在使用这些平台时 `clientSecret` 是必须的。
  :::

- __参考__:
  - [clientId](#clientid)
  - [proxy](#proxy)
  - [创建 OAuth App](../guide/supported-platforms.md)

### baseURL

- __类型__: `string`
- __默认值__: `undefined` （根据不同平台变化）
- __详细__:

  平台的 base URL。

  对于我们支持的平台，默认值为：

  - Github 是 `'https://github.com'`
  - Gitlab 是 `'https://gitlab.com'`
  - Bitbucket 是`'https://bitbucket.org'`
  - Gitee 是`'https://gitee.com'`

  ::: warning 注意
  只有在你要使用 __自行搭建的__ 平台时才需要设置这个选项。（比如 __GitLab Community / Enterprise Edition__ 或 __GitHub Enterprise Server__）
  :::

- __参考__:
  - [GitHub OAuth App](../guide/github.md)
  - [GitLab Application](../guide/gitlab.md)

### state

- __类型__: `string`
- __默认值__: `'Vssue'`
- __详细__:

  在 [OAuth2 spec](https://tools.ietf.org/html/rfc6749#section-4.1.1) 中介绍的 `state`。
  
  Vssue 将会在重定向到平台认证界面时发送它，并在平台认证返回后检查它是否正确。

  它是被设计用来避免 [CSRF](https://tools.ietf.org/html/rfc6749#section-10.12) 的，但是由于我们所有东西都在静态页面上，所以它没有太大作用。忽略这个选项，或者随便设置成什么值都行。

### labels

- __类型__: `Array<string>`
- __默认值__: `['Vssue']`
- __详细__:

  用来设置 Vssue 使用的 Issue 的 labels （标签）。

  Vssue 只会请求拥有对应标签的 Issue，忽略其他的 Issue。Vssue 通过 `title` 和 `labels` 来确定用来存储评论的对应 Issue。传入多个字符串可以设置多个标签，只有同时满足这些标签的 Issue 才会被 Vssue 请求。

  ::: tip
  Bitbucket 目前不支持 Issue 标签功能，所以如果你使用 Bitbucket 的话，这个配置将会被忽略。

  Github 支持在标签名称中加入 emoji，如 `[':heart:Vssue', ':mailbox:Comments']`。
  :::

- __参考__: [title](#title)

### prefix

- __类型__: `string`
- __默认值__: `'[Vssue]'`
- __详细__:

  Issue 标题的前缀。用于生成存储评论的对应 Issue 的实际标题。

  举例来说，如果 `prefix` 是 `'[Vssue]'`，`title` 是 `'Vssue Demo'`，那么 Issue 的实际标题就是 `'[Vssue]Vssue Demo'`。

  如果 `title` 的类型是 `Function`，这个配置将会被忽略。

- __参考__: [title](#title)

### admins

- __类型__: `Array<string>`
- __默认值__: `[]`
- __详细__:

  拥有 admin 权限的用户数组。`owner` 始终视为拥有 admin 权限。

  拥有 admin 权限的用户可以删除所有用户的评论，而其他用户只能删除自己的评论。

  只有 `admins` 才能在存储评论的 Issue 不存在时自动创建它。

  ::: tip
  在 `owner` 是一个组织而不是用户时，可以将你的用户名添加进 `admins` 来自动创建对应 Issue。
  :::

- __参考__: [owner](#owner)

### perPage

- __类型__: `number`
- __默认值__: `10`
- __详细__:

  默认每页显示的评论数。

### locale

- __类型__: `string`
- __默认值__: `undefined`
- __详细__:

  使用的语言。

  不设置该选项时，Vssue 会使用 `window.navigator.languages` 中的语言，如果其中没有 Vssue 支持的语言则会默认使用 `'en'`。

  ::: tip
  Vssue 使用 [vue-i18n](https://kazupon.github.io/vue-i18n/) 实现国际化，但是并不会影响你的 Vue 应用的其他部分。
  如果你在项目中已经使用了 vue-i18n，也不会对 Vssue 造成影响。

  语言包在 [src/i18n/langs](https://github.com/meteorlxy/vssue/tree/master/packages/vssue/src/i18n/langs) 目录下。目前我们支持：

  - `'en'` (`'en-US'`)
  - `'zh'` (`'zh-CN'`)
  - `'pt'` (`'pt-BR'`)
  - `'ja'` (`'ja-JP'`)

  欢迎贡献代码帮助 Vssue 支持更多语言。
  :::

### proxy

- __类型__: `string | ((url: string) => string)`
- __默认值__: `` url => `https://cors-anywhere.herokuapp.com/${url}` ``
- __详细__:

  某些平台（如 GitHub 和 Gitee）不支持 Implicit Grant，所以我们必须通过请求平台的 API 来获取 Access Token。

  然而，平台的 Access Token API 不支持 CORS （详见 [GitHub 的相关 Issue](https://github.com/isaacs/github/issues/330)）。由于 Vssue 是一个纯前端插件，我们必须要通过代理来请求 Access Token。

  默认情况下，我们使用一个开源的 CORS 代理服务 [cors-anywhere](https://github.com/Rob--W/cors-anywhere)。
  
  如果你希望使用自己的代理，就需要设置这个选项。
  
  如果你使用的平台不需要设置 `clientSecret`，那么该选项会被忽略。

- __示例__:

  ```js
  proxy: url => `https://your.cors.porxy?target=${url}`
  ```

- __参考__:
  - [clientSecret](#clientsecret)

### issueContent

- __类型__: `((param: { options: Vssue.Options, url: string }) => string | Promise<string>)`
- __默认值__: `({ url }) => url`
- __详细__:

  Vssue 自动创建 Issue 时使用的内容。

  Vssue 将使用该函数的返回值作为 Issue 的内容。

  参数包含两个属性：

  - `options` 是 Vssue 的 options。
  - `url` 是当前页面的 URL ，是 Vssue 生成 Issue 时默认使用的内容。

- __示例__:

  ```js
  issueContent: ({ url }) => `这个 Issue 由 Vssue 自动创建，用来存储该页面的评论：${url}`
  ```

  ::: tip
  `issueContent` 只用来在对应 Issue 不存在时新建 Issue。

  如果对应的 Issue 已经存在，Vssue 不会更新 Issue 的内容。
  :::

### autoCreateIssue

- __类型__: `boolean`
- __默认值__: `false`
- __详细__:

  如果 `autoCreateIssue` 设置为 `true`，在对应的 Issue 不存在时，Vssue 会自动尝试为你创建 Issue。注意，若你当前没有登录，则 Vssue 会自动跳转到平台的认证页面。

  如果 `autoCreateIssue` 设置为 `false`，你必须手动创建 Issue。
