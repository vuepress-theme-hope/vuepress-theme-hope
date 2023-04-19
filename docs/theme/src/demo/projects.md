---
title: Real Projects
icon: splotch
category:
  - Demo

docs:
  - name: Fast Request
    desc: Born to simplify debugging APIs
    logo: https://dromara.org/fast-request/img/logo/logo.svg
    url: https://dromara.org/fast-request/en/
    repo: https://github.com/dromara/fast-request
    preview: /assets/image/fast-request.jpg

  - name: Waline
    desc: A Simple, Safe Comment System.
    logo: https://waline.js.org/logo.png
    url: https://waline.js.org/en/
    repo: https://github.com/walinejs/waline
    preview: /assets/image/waline.jpg

  - name: Apache IoTDB
    desc: An IoT native database with high performance for data management and analysis
    logo: https://iotdb.apache.org/logo.png
    url: https://iotdb.apache.org/
    repo: https://github.com/apache/iotdb
    preview: /assets/image/iotdb.jpg

  - name: bitsail
    desc: A high-performance data integration engine based on distributed architecture, supporting data synchronization between multiple heterogeneous data sources.
    logo: https://bytedance.github.io/bitsail/bitsail_logo.png
    url: https://bytedance.github.io/bitsail/
    repo: https://github.com/bytedance/bitsail
    preview: /assets/image/bitsail.jpg

  - name: Crawlab
    desc: A powerful Web Crawler Management Platform (WCMP)
    logo: https://docs.crawlab.cn/logo.svg
    url: https://docs.crawlab.cn/en/guide/
    repo: https://github.com/crawlab-team/crawlab-docs
    preview: /assets/image/crawlab.jpg

  - name: Pulsar
    desc: A Community-led Hyper-Hackable Text Editor
    logo: https://pulsar-edit.dev/logo-name-navbar-light.svg
    url: https://pulsar-edit.dev/
    repo: https://github.com/pulsar-edit/pulsar-edit.github.io
    preview: /assets/image/plusar.jpg

  - name: ct.js
    desc: Learn ct.js, complete tutorials, and contribute to ct.js documentation
    logo: https://docs.ctjs.rocks/assets/img/logo.png
    url: https://docs.ctjs.rocks/
    repo: https://github.com/ct-js/docs.ctjs.rocks
    preview: /assets/image/ctjs.jpg

  - name: ALIST
    desc: A file list program that supports multiple storage, powered by Gin and Solidjs.
    logo: https://alist.nn.ci/logo.svg
    url: https://alist.nn.ci/
    repo: https://github.com/alist-org/docs
    preview: /assets/image/alist.jpg

  - name: Taskiq
    logo: https://taskiq-python.github.io/logo.svg
    desc: Distributed task queue with full async support
    url: https://taskiq-python.github.io/
    repo: https://github.com/taskiq-python/taskiq/tree/master/docs
    preview: /assets/image/taskiq.jpg

  - name: Nosana
    desc: Next Gen CI/CD
    logo: https://nosana.io/img/NOS_logo.png
    url: https://docs.nosana.io/
    repo: https://github.com/nosana-ci/docs.nosana.io
    preview: /assets/image/nosana.jpg

  - name: zkSync Era
    desc: A trustless protocol that uses cryptographic validity proofs to provide scalable and low-cost transactions on Ethereum
    logo: https://era.zksync.io/docs/zk-sync-era-line-light.svg
    url: https://era.zksync.io/docs/
    repo: https://github.com/matter-labs/zksync-web-era-docs
    preview: /assets/image/era.jpg

  - name: Gorse
    desc: An open-source recommender system service written in Go.
    logo: https://gorse.io/logo.png
    url: https://gorse.io
    repo: https://github.com/gorse-io/docs
    preview: /assets/image/gorse.jpg

blog:
  - name: Mr.Hope’s Blog
    desc: Where there is light, there is hope
    logo: https://mrhope.site/logo.svg
    url: https://mrhope.site
    repo: https://github.com/Mister-Hope/Mister-Hope.github.io
    preview: /assets/image/mrhope.jpg

  - name: Mo7's Blog
    desc: Something wonderful is about to happen.
    logo: https://file.mo7.cc/static/lxh_gif/lxh_71.gif
    url: https://blog.mo7.cc/en/
    repo: https://github.com/mo7cc/BlogSource.git
    preview: https://file.mo7.cc/disk/blog_preview_en.png

  - name: Oragekk's Blog
    desc: I'm glad the sunset stays on me？Boring thinking can always inspire people, experience more, record more, and understand more
    logo: https://oragekk.me/logo.svg
    url: https://oragekk.me/
    repo: https://github.com/OrageKK/oragekk.github.io
    preview: /assets/image/oragekk.jpg
---

## Docs using VuePress Theme Hope

<SiteInfo
  v-for="item in $frontmatter.docs"
  :key="item.link"
  v-bind="item"
/>

## Blog using VuePress Theme Hope

<SiteInfo
  v-for="item in $frontmatter.blog"
  :key="item.link"
  v-bind="item"
/>

## More

- Feel free to add yours through pull request
