---
title: File Structure
icon: folder
category:
  - Cookbook
  - VuePress
tag:
  - File Structure
  - VuePress
---

## File Structure

```
.
├── docs → Docs folder depending on you
│    │
│    ├── .vuepress (Optional) → VuePress Config
│    │     │
│    │     ├── dist (Default) → Output folder
│    │     │
│    │     │
│    │     ├── public (Optional) → Static resource dir
│    │     │
│    │     ├── styles (Optional) → Stores style related files
│    │     │
│    │     ├── config.{js,ts} (Optional) → Entry file of configuration
│    │     │
│    │     └── clientAppEnhance.{js,ts} (Optional) → App level enhancement
│    │
│    ├── ... → Other docs
│    │
│    └── README.md → Project homepage
│
└── package.json → Node.js declaration file for the entire project
```
