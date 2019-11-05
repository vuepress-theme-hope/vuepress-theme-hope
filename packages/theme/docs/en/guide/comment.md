---
icon: commentfill
---

# Comment Function

With Valine, the theme enables pageviews display and commenting feature with out backend.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    valine: {
      appId: '...', // your appId
      appKey: '...' // your appKey
    }
  }  
}
```

For information on the configuration and use of Valine, see [Valine Official Documentation](https://valine.js.org).

::: tip
The configuration is listed in [Configuration](../api/readme.md).

You can direct users to [Gravatar](http://cn.gravatar.com/) to set their own avatar.
:::
