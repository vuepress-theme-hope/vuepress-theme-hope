---
icon: extension
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

``` md
### MyBadge <MyBadge text="Building" type="warn"/> <MyBadge text="MrHope" color="grey" />
```
