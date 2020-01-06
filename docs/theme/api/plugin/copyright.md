# vuepress-plugin-copyright <MyBadge text="新增" />

处理你的 VuePress 站点中的复制操作

## 默认配置说明

当用户从你的站点复制超过100字的消息时，在这段消息的尾部添加声明消息。

作者名称会从你在主题中配置的作者信息或站点名称自动生成。

默认配置如下：

```js
module.exports = {
  plugins: [
    /** 复制操作处理 */
    [
      'copyright', {
        authorName: options.author,
        minLength: 100,
        clipboardComponent: path.resolve(__dirname, 'components/Clipboard.vue')
      }
    ]
  ]
};
```

## 配置项

详见 [官方文档](https://vuepress.github.io/zh/plugins/copyright/#配置项)

## 演示

请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。
