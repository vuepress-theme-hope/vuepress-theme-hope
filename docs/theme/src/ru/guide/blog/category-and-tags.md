---
title: Category and tags
icon: tag
order: 4
category:
  - Blog
tag:
  - Blog
  - Category
  - Tag
---

You can configure category and tags for articles through frontmatter to make them appear in specific categories and tags pages.

<!-- more -->

## Category Settings

Just add category array to `category` in page frontmatter, the article will be automatically rendered in the list of the`/category/<category name>/` category page.

For example, add this to a certain page:

```md
---
category:
  - HTML
  - Web
---

Page content...
```

Then you can find it under the `/category/html` page.

![Category](./assets/category-light.png#light)
![Category](./assets/category-dark.png#dark)

## Tags

Just set `tag` option in page frontmatter , and set value to one or more tags, then the article will be automatically rendered in the list of the `/tag/<tag name>/` tag page.

For example, after adding this in frontmatter:

```md
---
tag:
  - HTML
  - Web
---

Page content...
```

Then you can find it under the `/tag/html` and `/tag/web` pages.

![Tag](./assets/tag-light.png#light)
![Tag](./assets/tag-dark.png#dark)

## View list

Besides directly accessing the corresponding link, the category and tag name will be displayed at the article information at the top of the article. You can click on it to navigate to the corresponding list to view the articles of the same category or tag.

![Article Information](./assets/info.png)

You can also select the category or tag tab in the sidebar of the blog homepage and select the corresponding item to enter the list.

![Sidebar Tab](./assets/sidebar.png)
