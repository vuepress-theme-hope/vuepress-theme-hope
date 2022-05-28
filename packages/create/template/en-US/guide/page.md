---
# This control sidebar index
order: 1
# This is the icon of the page
icon: page
# This is the title of the article
title: page config
# Set author
author: Ms.Hope
# Set writing time
date: 2020-01-01
# A page can have multiple categories
category:
  - Guide
# A page can have multiple tags
tag:
  - Page config
  - Guide
# this page is sticky in article list
sticky: true
# this page will appear in aricle channel in home page
star: true
# You can customize the footer
footer: Footer content for test
---

Content before `more` comment is regarded as page excerpt.

<!-- more -->

## Page Information

You can set page information in Markdown’s Frontmatter.

- The author is set to Ms.Hope.

- The writing time should be January 1, 2020

- Category is "Guide"

- Tags are "Page Config" and "Guide"

## Page Content

You are free to write your Markdown here.

::: tip

- Please use the relative link `./` for pictures in source directory.

- For pictures in `.vuepress/public` directory, please use absolute link `/` for reference

:::

The theme contains a custom badge:

> A dark blue badge text badge at the end of line. <Badge text="Badge text" color="#242378" />

## Page Structure

This page should contain:

- Back to top button
- Route navigation
- Comments
- Footer
