---
title: Giscus Options
icon: github
---

## repo

- Type: `string`
- Required: No

The name of repository to store discussions.

## repoId

- Type: `string`
- Required: No

The ID of repository to store discussions. Generate through [Giscus Page](https://giscus.app/)

## category

- Type: `string`
- Required: No

The name of the discussion category.

## categoryId

- Type: `string`
- Required: No

The ID of the discussion category. Generate through [Giscus Page](https://giscus.app/)

## mapping

- Type: `string`
- Default: `"pathname"`

Page - Discussion mapping. For details see [Giscus Page](https://giscus.app/)

## reactionsEnabled

- Type: `boolean`
- Default: `true`

Whether enable reactions or not

## inputPosition

- Type: `"top" | "bottom"`
- Default: `"top"`

Input position
