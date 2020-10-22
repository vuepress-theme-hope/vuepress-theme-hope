---
icon: extension
category: feature
tags:
  - components
  - feature
---

# New Component

## Badge `<MyBadge />`

- **Props**:

  - `text` - string
  - `type` - string, optionals: `"tip"|"warn"|"error"` default is `"tip"`
  - `color` - string, optional
  - `vertical` - string, optionals: `"top"|"middle"`，default is `"top"`

- **Usage**:

  You can use this component in the title to add some status to the title or link:

  ```md
  ### MyBadge <MyBadge text="Building" type="warn"/> <MyBadge text="MrHope" color="grey" />
  ```

## Back to top button `<BackToTop />` <MyBadge text="Support page config" />

`vuepress-theme-hope` adds a back-to-top control which will display after scrolling down 300px by default.

The config key is `backToTop`.
