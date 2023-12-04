---
containerClass: home
home: true
icon: home
title: Home
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: VuePress Theme Hope
tagline: A VuePress theme with tons of features✨
actions:
  - text: Get Started
    link: ./get-started/
    icon: signs-post
    type: primary

  - text: Guide
    icon: lightbulb
    link: ./guide/

  - text: Demos
    icon: star
    link: ./demo/

highlights:
  - header: Easy to install
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: Run <code>pnpm create vuepress-theme-hope hope-project</code> to create a new project with this theme.
      - title: Run <code>pnpm create vuepress-theme-hope add .</code> in your project root to create a new project with this theme.

  - header: Add things you want in markdown
    description: We extended the standard commonMark specification and added tons of new features for you.
    image: /assets/image/markdown.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    features:
      - title: Links Check
        icon: clipboard-check
        details: Check markdown links
        link: ./guide/markdown/others.html#link-check

      - title: Hint box
        icon: box-archive
        details: Decorate Markdown content with styles
        link: ./guide/markdown/hint.html

      - title: GFM alerts
        icon: bell
        details: GFM alert box
        link: ./guide/markdown/alert.html

      - title: Tabs
        icon: table-columns
        details: Group similar content with tabs and switch them together
        link: ./guide/markdown/tabs.html

      - title: Code Tabs
        icon: code
        details: Group similar codes with tabs
        link: ./guide/markdown/code-tabs.html

      - title: Custom Align
        icon: align-center
        details: Let you decide to align paragraphs in the way you like
        link: ./guide/markdown/align.html

      - title: Attrs support
        icon: code
        details: Allow you to add attributes for Markdown content
        link: ./guide/markdown/attrs.html

      - title: Superscript and subscript support
        icon: superscript
        details: Your Markdown now support superscript and subscript
        link: ./guide/markdown/sup-sub.html

      - title: Footnote support
        icon: quote-left
        details: Your Markdown now support footnotes
        link: ./guide/markdown/footnote.html

      - title: Mark Support
        icon: highlighter
        details: Mark words and sentences in Markdown
        link: ./guide/markdown/mark.html

      - title: Tasklist Support
        icon: square-check
        details: Use tasklist in Markdown
        link: ./guide/markdown/tasklist.html

      - title: image syntax
        icon: image
        details: improve syntax to specify size and color scheme
        link: ./guide/markdown/image.html

      - title: Component Support
        icon: puzzle-piece
        details: Easily insert components in Markdown
        link: ./guide/markdown/component.html

      - title: Components
        icon: puzzle-piece
        details: Common components out fo box
        link: ./guide/markdown/components.html

      - title: Chart Support
        icon: chart-simple
        details: Display charts in Markdown
        link: ./guide/markdown/chartjs.html

      - title: Flowchart Support
        icon: route
        details: Create your flowchart in Markdown
        link: ./guide/markdown/flowchart.html

      - title: Mermaid Support
        icon: chart-pie
        details: Add mermaid diagram in Markdown
        link: ./guide/markdown/mermaid.html

      - title: Tex Support
        icon: square-root-variable
        details: Markdown now have Tex Support so you can write your formula
        link: ./guide/markdown/tex.html

      - title: Include snippet Support
        icon: fab fa-markdown
        details: split your docs with different parts and import them in Markdown
        link: ./guide/markdown/include.html

      - title: Playground Support
        icon: code
        details: You can add playground in Markdown files
        link: ./guide/markdown/playground.html

      - title: Kotlin playground Support
        icon: fab fa-kickstarter
        details: Reactive kotlin playground
        link: ./guide/markdown/koelin-playground.html

      - title: Vue playground Support
        icon: fab fa-vuejs
        details: Show living vue component in playground
        link: ./guide/markdown/vue-playground.html

      - title: Code Demo Support
        icon: laptop-code
        details: You can insert code demo easily
        link: ./guide/markdown/demo.html

      - title: Presentation Support
        icon: person-chalkboard
        details: Insert presentation in Markdown files via Reveal.js
        link: ./guide/markdown/revealjs.html

  - header: Customizable UI
    description: Customizable outlook with full a11y support.
    image: /assets/image/ui.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/9-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/9-dark.svg
    highlights:
      - title: Dark Mode
        icon: circle-half-stroke
        details: Switch between light and dark modes freely
        link: ./guide/interface/darkmode.html

      - title: Customizable Theme Color
        icon: palette
        details: Set theme color with the brand color and even a picker
        link: ./guide/interface/theme-color.html

      - title: Code Block Themes
        icon: wand-magic-sparkles
        details: Customize code block themes
        link: ./guide/interface/code-theme.html

      - title: More
        icon: ellipsis
        details: RTL layout, print support, fullscreen button, etc.
        link: ./guide/interface/others.html

  - header: Improved layouts
    description: An awesome responsive layout
    image: /assets/image/layout.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Navbar
        icon: window-maximize
        details: Fully customizable navbar with improved mobile support
        link: ./guide/layout/navbar.html

      - title: Sidebar
        icon: fas fa-window-maximize fa-rotate-270
        details: Generate sidebar based on page headings and file structure
        link: ./guide/layout/sidebar.html

      - title: Slide Page
        icon: person-chalkboard
        details: Adding slide pages to display things you like
        link: ./guide/layout/slides.html

      - title: Other Layout Improvement
        icon: object-group
        details: Improved page nav and new breadcrumb, footer and toc. We also bring you a brand new homepage.
        link: ./guide/layout/

  - header: New features
    image: /assets/image/features.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    features:
      - title: Catalog Page
        icon: network-wired
        details: Auto generating catalog page and out of box catalog component
        link: ./guide/feature/catalog.html

      - title: Pageviews and Comments
        icon: comment-dots
        details: Pageview statistics and comment support with 4 comment service
        link: ./guide/feature/comment.html

      - title: Article Information
        icon: circle-info
        details: Add author, writing date, reading time, word count and other information to your article
        link: ./guide/feature/page-info.html

      - title: Article Encryption
        icon: lock
        details: Encrypt you articles based on page links, so that only the one you want could see them
        link: ./guide/feature/encrypt.html

      - title: Search
        icon: search
        details: Support docsearch and client search
        link: ./guide/feature/search.html

      - title: Copy Code Blocks
        icon: copy
        details: Copy codes with one click in code blocks
        link: ./guide/feature/copy-code.html

      - title: Image Preview
        icon: image
        details: Support viewing, zooming, sharing your page images like a gallery
        link: ./guide/feature/photo-swipe.html

  - header: Blogging
    description: Create personal blog with theme
    image: /assets/image/blog.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Blog features
        icon: blog
        details: Listing your articles with their dates, tags and categories
        link: ./guide/blog/intro.html

      - title: Blog homepage
        icon: blog
        details: New blog homepage
        link: ./guide/blog/home.html

      - title: Blogger info
        icon: circle-info
        details: Customize avatar, name, slogan, introduction and social links
        link: ./guide/blog/blogger.html

      - title: Timeline
        icon: clock
        details: Read through blog posts in a timeline
        link: ./guide/blog/timeline.html

  - header: Advanced
    description: Advanced features to improve site SEO and user experience
    image: /assets/image/advanced.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: SEO Enhancement
        icon: dumbbell
        details: Optimize pages for search engines
        link: ./guide/advanced/seo.html

      - title: Sitemap
        icon: sitemap
        details: Generate a Sitemap for your site
        link: ./guide/advanced/sitemap.html

      - title: Feed
        icon: rss
        details: Generate feed to allow users to subscribe it
        link: ./guide/advanced/feed.html

      - title: PWA
        icon: mobile-screen
        details: Make your site more like an APP
        link: ./guide/advanced/pwa.html

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---
