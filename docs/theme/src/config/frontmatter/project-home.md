---
title: Project Home Frontmatter Config
icon: home
order: 4
category:
  - Config
tag:
  - Frontmatter
  - Project Home
---

## Options

::: fields
@`home` type=boolean required

Whether to use the project home layout.

@`title` type=string

Page title, used in breadcrumb, SEO, etc.

@`heroText` type=string default="The site title"

Hero title. Set it to an empty string to hide the default title.

@`tagline` type=string default=`"Welcome to your VuePress site"`

Short description in the hero.

@`heroImage` type=string

Home hero (logo) image link. Relative paths are not supported.

@`heroImageDark` type=string default=`heroImage`

Dark mode home hero (logo) image link. Relative paths are not supported.

@`heroAlt` type=string default=`heroText`

Alt text of the home icon.

@`heroImageStyle` type=`Record<string, string> | string`

CSS style for the home icon.

@`bgImage` type=string

Link of the background image. Relative paths are not supported.

@`bgImageDark` type=string default=`bgImage`

Link of the dark mode background image. Relative paths are not supported.

@`bgImageStyle` type=`Record<string, string> | string`

CSS style of the background image.

@`heroStyle` type=string

Hero wrapper style.

@`heroFullScreen` type=boolean

Whether the hero is displayed full screen.

@`actions` type=`ThemeProjectHomeActionOptions[]`

Home actions.

@@`actions[*].text` type=string required

Action name.

@@`actions[*].link` type=string required

Action link.

@@`actions[*].type` type=`'primary' | 'default'` default=`'default'`

Type of the action.

@@`actions[*].icon` type=string

Action icon.

@`highlights` type=`(ThemeProjectHomeFeatureOptions | ThemeProjectHomeHighlightOptions)[]`

Highlight sections of the home page. Each item is either a feature section or a highlight section.

@@`highlights[*].header` type=string

Section header, which supports HTML strings. It is required for a highlight section.

@@`highlights[*].description` type=string

Section description, which supports HTML strings.

@@`highlights[*].color` type=string

Text color.

@@`highlights[*].image` type=string

Section image.

@@`highlights[*].imageDark` type=string default=`image`

Section image used in dark mode.

@@`highlights[*].bgImage` type=string

Section background image.

@@`highlights[*].bgImageDark` type=string default=`bgImage`

Section background image used in dark mode.

@@`highlights[*].bgImageStyle` type=`Record<string, string> | string`

Section background image style.

@@`highlights[*].features` type=`ThemeProjectHomeFeatureItem[]` feature-section=Yes

Features of a feature section.

@@@`highlights[*].features[*].title` type=string required

Item name, which supports HTML strings.

@@@`highlights[*].features[*].details` type=string

Item description, which supports HTML strings.

@@@`highlights[*].features[*].icon` type=string

Item icon. Image links and icon font classes are supported.

@@@`highlights[*].features[*].link` type=string

Item link.

@@`highlights[*].type` type=`'order' | 'un-order' | 'no-order'` default=`'un-order'` highlight-section=Yes

List type of a highlight section.

@@`highlights[*].highlights` type=`ThemeProjectHomeHighlightItem[]` highlight-section=Yes

Highlights of a highlight section.

@@@`highlights[*].highlights[*].title` type=string required

Item name, which supports HTML strings.

@@@`highlights[*].highlights[*].details` type=string

Item description, which supports HTML strings.

@@@`highlights[*].highlights[*].icon` type=string

Item icon. Image links and icon font classes are supported.

@@@`highlights[*].highlights[*].link` type=string

Item link.

@`features` type=`ThemeProjectHomeFeatureItem[]`

Features of the home page.

@@`features[*].title` type=string required

Feature name, which supports HTML strings.

@@`features[*].details` type=string

Feature description, which supports HTML strings.

@@`features[*].icon` type=string

Feature icon. Image links and icon font classes are supported.

@@`features[*].link` type=string

Feature link.

:::
