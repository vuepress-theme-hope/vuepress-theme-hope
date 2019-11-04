# vuepress-plugin-container <MyBadge text="inherited" /> <MyBadge text="Default Chinese" />

Register a new Markdown container in your VuePress site.

## Default configuration instructions

By default, the default language path is changed to Chinese [^i18n].

The `center` and `right` containers have been added.

The default configuration is:

```js
module.exports = {
  plugins: [
    /** container config */
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
    ['container', { type: 'right', defaultTitle: '', marker: '~' }],
    ['container', { type: 'center', defaultTitle: '', marker: '~' }]
  ]
};
```

## Configuration Item

See [Official Documentation](https://vuepress.github.io/en/plugins/container/#Configs)

## Demonstration

```md
::: tip prompt title
I am on the left

~~~ center
I am in the middle
~~~

~~~ right
I am on the right
~~~

:::
```

::: tip prompt title
I am on the left

~~~ center
I am in the middle
~~~

~~~ right
I am on the right
~~~

:::

[^i18n]: **Multi-language configuration changes**

    This topic changes the default path in the multi-language configuration to Chinese and moves the English to the `/en/` path.
