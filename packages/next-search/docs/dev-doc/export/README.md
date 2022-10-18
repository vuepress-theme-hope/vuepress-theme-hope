---
title: 第一步-导出
date: 2022-06-09
icon: editor
category:
- 开发文档
tag:
- 导出
---

<!-- more -->

## 创建一个插件

[官网是这样讲的](https://v2.vuepress.vuejs.org/zh/advanced/plugin.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%8F%92%E4%BB%B6)

> 插件是一个符合 [插件 API](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html) 的普通 JavaScript 对象，称之为 插件对象\
> 插件还可以是一个接收 [App 实例](https://v2.vuepress.vuejs.org/zh/reference/node-api.html#app) 作为参数，且返回值为 插件对象 的函数，称之为 插件函数\
> 插件通常需要允许用户传入配置，因此我们一般都会提供给用户一个函数来接收配置，然后将 插件对象 或者 插件函数 作为返回值。于是，你的插件应该转换成这样的形式：

```ts
const fooPlugin = (options) => {
  return {
    name: 'vuepress-plugin-foo',
    // ...
  }
}
    
const barPlugin = (options) => {
  return (app) => {
    return {
      name: 'vuepress-plugin-bar',
      // ...
    }
  }
}
```

**关于App实例，请根据你的实际业务自行决定是否传入**

像我这个搜索插件，用不到App实例，所以我们只需要创建一个`index.ts`

```ts
import { Plugin } from '@vuepress/core'

const nextSearchPlugin: () => Plugin = () => {
  return {
    name: 'vuepress-plugin-next-search',
    //...
  }
}

export { nextSearchPlugin }
```

是不是很简单？然后我们再添加亿点点细节，成品如下：

::: details 你懂我的意思吧？

==下面的app是形参，不是App实例==

```ts
import { Plugin } from '@vuepress/core'
import { Options } from './client/core/types'
import { path } from '@vuepress/utils'
import * as chokidar from 'chokidar'
import { prepareSearchIndex } from './client/core/prepareSearchIndex'

const nextSearchPlugin: (options: Options) => Plugin = (options) => {
  const nextSearchOptions: Options = {
    fullText: options.fullText ?? true,
    placeholder: options.placeholder ?? '搜索',
    frontmatter: {
      category: options.frontmatter?.category ?? '分类',
      tag: options.frontmatter?.tag ?? '标签',
    },
  }
  return {
    name: 'vuepress-plugin-next-search',
    clientConfigFile: path.resolve(__dirname, './client/core/clientConfig.ts'),
    define: {
      NEXT_SEARCH_OPTIONS: nextSearchOptions,
    },
    onPrepared(app) {
      prepareSearchIndex({ app, nextSearchOptions })
    },
    onWatched: (app, watchers) => {
      const searchIndexWatcher = chokidar.watch('internal/pageData/*', {
        cwd: app.dir.temp(),
        ignoreInitial: true,
      })
      searchIndexWatcher.on('add', () => {
        prepareSearchIndex({ app, nextSearchOptions })
      })
      searchIndexWatcher.on('change', () => {
        prepareSearchIndex({ app, nextSearchOptions })
      })
      searchIndexWatcher.on('unlink', () => {
        prepareSearchIndex({ app, nextSearchOptions })
      })
      watchers.push(searchIndexWatcher)
    },
  }
}

export { nextSearchPlugin }
```
:::

### define Hook

> 插件 API 提供了一个 define Hook 来定义客户端代码中的全局常量。你可以利用它来向客户端传递数据。

[vuepress官网关于define的介绍](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#define)

define的类型源码规定了可以是对象也可以是函数，具体怎么用，你开心就好

首先在外面创建一个我们已经设好类型的对象，类型为我们定义好的参数类型，并进行数据初始化，之后通过`define`将其变为全局常量，方便我们在其他地方使用

```ts {5-12,15-17}
import { Plugin } from '@vuepress/core'
import { Options } from './client/core/types'

const nextSearchPlugin: (options: Options) => Plugin = (options) => {
  const nextSearchOptions: Options = {
    fullText: options.fullText ?? true,
    placeholder: options.placeholder ?? '搜索',
    frontmatter: {
      category: options.frontmatter?.category ?? '分类',
      tag: options.frontmatter?.tag ?? '标签',
    },
  }
  return {
    name: 'vuepress-plugin-next-search',
    define: {
      NEXT_SEARCH_OPTIONS: nextSearchOptions,
    },
  }
}

export { nextSearchPlugin }
```

`Options`类型如下

```ts
type Options = {
  fullText?: boolean
  placeholder?: string
  frontmatter?: {
    tag?: string
    category?: string
  }
}
```

::: warning
如果你在客户端代码中使用 TypeScript ，你可能需要手动声明这些全局常量的类型：
```ts
declare const NEXT_SEARCH_OPTIONS: Options
```
全局常量推荐使用下划线开头，源码也是如此，只是MD这里用了下划线开头后无法打包
:::

### defineClientConfig

> 你可以直接在你的项目中使用 客户端配置文件 。或者，在你的插件或者主题中，使用 clientConfigFile

[vuepress官网关于defineClientConfig的介绍](https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html)

我在这里选择使用了 clientConfigFile ，该 Hook 接收文件绝对路径，或者一个返回路径的函数

```ts {8}
import { Plugin } from '@vuepress/core'
import { Options } from './client/core/types'
import { path } from '@vuepress/utils'

const nextSearchPlugin: (options: Options) => Plugin = (options) => {
  return {
    name: 'vuepress-plugin-next-search',
    clientConfigFile: path.resolve(__dirname, './client/core/clientConfig.ts'),
  }
}

export { nextSearchPlugin }
```

### enhance

[vuepress官网关于enhance的介绍](https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html#enhance)

`clientConfig.ts`内容如下

```ts
import { defineClientConfig } from '@vuepress/client'
import { defineAsyncComponent } from 'vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component(
      'SearchBox',
      defineAsyncComponent(() => import('../components/SearchBox.vue'))
    )
  },
})
```

`SearchBox.vue`内容请自行查看源码，谢谢

### onPrepared & onWatched

Vuepress的生命周期 Hooks，具体参考[vuepress官网关于生命周期 Hooks 的介绍](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F-hooks)

### chokidar

[请查看原作者写的文档，这处不多介绍](https://github.com/paulmillr/chokidar)

`prepareSearchIndex`是创建索引缓存的方法，后面会讲到

截止这里，我们的插件就已经可以被引用并使用了，只不过是个空壳壳，暂时没有啥功能


