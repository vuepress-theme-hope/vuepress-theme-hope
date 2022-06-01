---
title: Options
icon: config
---

## Plugin Options

### config

- Type: `Record<string, string> | ((app: App) => Record<string, string>)`
- Required: No

Redirect map.

### hostname

- Type: `string`
- Required: No

Domain name to redirect to.

## Frontmatter options

### redirectFrom

- Type: `string | string[]`
- Required: No

The link which this page redirects from.

### redirectTo

- Type: `string`
- Required: No

The link which this page redirects to.
