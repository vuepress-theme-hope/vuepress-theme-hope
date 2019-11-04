# vuepress-plugin-container <MyBadge text="继承" /> <MyBadge text="默认中文" />

在你的 VuePress 站点中注册新的 Markdown 容器。

## 默认配置说明

默认中文即更改默认语言路径为中文[^i18n]。

同时添加了 `center` 和 `right` 容器。

默认配置如下：

```js
module.exports = {
  plugins: [
    /** 自定义容器配置 */
    [
      'container', {
        type: 'tip',
        defaultTitle: {
          '/': '提示',
          '/en/': 'Tips'
        }
      }
    ],
    [
      'container', {
        type: 'warning',
        defaultTitle: {
          '/': '注意',
          '/en/': 'Note'
        }
      }
    ],
    [
      'container', {
        type: 'danger',
        defaultTitle: {
          '/': '警告',
          '/en/': 'Warning'
        }
      }
    ],

    /** 自定义居右容器 */
    ['container', { type: 'right', defaultTitle: '', marker: '~' }],
    /** 自定义居中容器 */
    ['container', { type: 'center', defaultTitle: '', marker: '~' }]
  ]
};
```

## 配置项

详见 [官方文档](https://vuepress.github.io/zh/plugins/container/#配置项)

## 演示

```md
::: tip 提示标题
我在左边

~~~ center
我在中间
~~~

~~~ right
我在右边
~~~

:::
```

::: tip 提示标题
我在左边

~~~ center
我在中间
~~~

~~~ right
我在右边
~~~

:::

[^i18n]: **多语言配置更改**

    本主题将多语言配置中默认路径改为中文，将英文移动至 `/en/` 路径下。
