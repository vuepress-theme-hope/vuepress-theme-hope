---
icon: extension
category: feature
tags:
  - components
  - function
---

# New Component

## Badge `<MyBadge />`

- **Props**:

  - `text` - string
  - `type` - string, optional value: `"tip"|"warn"|"error"` default is `"tip"`
  - `color` - string, optional
  - `vertical` - string, optional value: `"top"|"middle"`，default is `"top"`

- **Usage**:

You can use this component in the title to add some status to the title or link:

```md
### MyBadge <MyBadge text="Building" type="warn"/> <MyBadge text="MrHope" color="grey" />
```

## Back to top button `<BackToTop />` <MyBadge text = "Support local configuration" />

vuepress-theme-hope adds a back-to-top control which will show up by 300px by default.

The back to top button uses a round colored icon instead of the arrow in the default theme.

The config key is `backToTop`.
