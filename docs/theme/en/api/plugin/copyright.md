# vuepress-plugin-copyright <MyBadge text="New" />

Handling copy operations in your VuePress site

## Default configuration

When the user copies a message of more than 100 words from your site, a declaration message is added at the end of the message.

The author name is automatically generated from the author information or sitename that you configured in the theme.

The default configuration is:

```js
module.exports = {
  plugins: [
    /** Copy operation processing */
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

## Configuration Item

See [Official Documentation](https://vuepress.github.io/en/plugins/copyright/#Configs)

## Demonstration

Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect.
