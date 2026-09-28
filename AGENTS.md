# vuepress-theme-hope — Agent Guide

Guidance for AI agents working on this monorepo. Read it before making changes.

## Repository Overview

A [pnpm workspaces](https://pnpm.io/workspaces) monorepo holding the VuePress Hope theme and its companion plugins, plus the documentation sites for each of them.

```plain
packages/   # Published packages (components, create, lightgallery, md-enhance, shared, theme)
docs/       # Documentation sites (components, lightgallery, md-enhance, shared, theme)
demo/       # Demo sites for each package
scripts/    # Shared build / release helpers
```

Each package follows the same layout:

```plain
src/
  client/   # Browser-only code (Vue components, composables, styles)
  node/     # Node.js-only code (plugin factory, markdown-it extensions)
  shared/   # Code that runs in both environments (types, constants, utils)
  index.ts  # Re-exports the node entry (consumed by VuePress core)
```

## Essential Commands

| Command                     | What it does                          |
| --------------------------- | ------------------------------------- |
| `pnpm build`                | Build every package with `tsdown`     |
| `pnpm bundle`               | Same, with `NODE_ENV=production`      |
| `pnpm test`                 | Run Vitest with coverage              |
| `pnpm lint`                 | OxLint + Oxfmt + Stylelint (auto-fix) |
| `pnpm lint:check`           | Same checks without auto-fix          |
| `pnpm lint:md`              | Markdownlint over every `*.md`        |
| `pnpm --filter <pkg> build` | Build a single package                |

Documentation sites are built per package, e.g. `pnpm --filter docs-theme docs:vite-build` or, from `docs/theme/`, `pnpm docs:vite-build`.

## Coding Standards

### Import / Export Rules

- Relative imports must use the `.js` extension even though sources are `.ts`.
- No cross-folder imports between `client`, `node` and `shared`.
- No Node.js APIs in `client`, no browser APIs in `node`, and neither in `shared`.
- No bundled external dependency warnings from the `bundle` command.

### CSS / SCSS

- All CSS classes start with `vp-`; classes integrating third-party content are exempt.
- Color variables must contain `-c-`; plugin variables are prefixed with the plugin name; theme variables with `vp-`.
- Icon variables inside class definitions must use `--icon`.

### JSDoc

- Required for all user-visible exports, bilingual (English, blank line, Chinese).
- `@param` for every parameter, `@default` for every option with a default, `@example` only on exported functions.

## Commit Messages

Conventional Commits, single line only (the `commit-msg` hook rejects a body and enforces a 1–50 character subject):

```plain
feat(theme): add markdown field option
```

Allowed types: `feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|release`.
Allowed scopes: `components|create|lightgallery|md-enhance|shared|theme|deps|demo|release` (or none).

## Documentation

Each package has its own docs site under `docs/<package>/src`, with English at the root and Chinese under `zh/`. Upstream plugin documentation lives in the [`vuepress-ecosystem`](https://github.com/vuepress/ecosystem) repository; when a plugin option or behavior changes upstream, sync the matching page here.

### General Requirements

- Consistent with code behaviors.
- Chinese and English content must be consistent in structure and content.
- Keep content concise and clear, prefer shorter over longer.
- Use "你" instead of "您" in Chinese.
- Ignore errors from the `@[code ...` import grammar and from VuePress components in markdown, which are valid in VuePress but not standard markdown.
- Always keep a blank line before a container closing marker (`:::`, `::::`). Without it Oxfmt treats the marker as a list continuation and drops it, leaving the container unclosed.
- Do not repeat a plugin's built-in locale data in its documentation; link to the shared locales page instead.

### Page Structure

Feature descriptions and option references are separated so the options section stays short:

- `## Usage`: install command and a minimal config example.
- `## Guide`: one `###` section per feature, explaining what it does and how to use it, with syntax examples and `::: preview` demos. Behavior, syntax markers and caveats belong here.
- `## Options`: only what each option configures, its type and its default. Link to the matching guide section with `See also: [Title](#anchor).` / `参考：[标题](#锚点)。` instead of repeating the explanation.

### Options Documentation Format

Options are documented with the `::: fields` container provided by `@vuepress/plugin-markdown-field`, not with `###` headings and `- Type:` lists.

```md
## Options

::: fields
@`optionName` type=boolean default=`true`

Whether to enable this feature.

@`requiredOption` type=string required

The required configuration.

@`optionWithNonStandardDefault` type=number default=`100`

Custom timeout value.

@`objectOption` type=`SomeOptions | boolean`

Whether to enable this feature. You can also pass an object to configure it.

@@`objectOption.child` type=string

A child option of `objectOption`.

:::
```

#### Field items

- A field item is a line starting with `@` followed by an inline code (the name, closed on the same line), then its attributes.
- The content after the marker, until the next field item or the closing marker, is the description. It supports full markdown, including lists, code fences and containers.
- Sub-options of an object option are nested by adding one more `@`: `` @@`parent.child` ``. Nesting is also used to expand a type definition instead of pasting a TypeScript interface in a code fence.
- When a path goes into an array of objects, append `[*]` to every indexed level so it reads as a member type rather than a single value, e.g. `` @@`contributors.info[*].username` `` for `contributors.info: ContributorInfo[]`, or `` @@@`config[*].actions[*].text` `` for `config: NoticeOptions[]` with `actions: NoticeActionOption[]`.
- When a path goes into a `Record<string, T>`, use a placeholder for the key, e.g. `` @@`locales.<localePath>.title` `` for `locales: LocaleConfig<...>`, where the key is a locale path (`/`, `/zh/`, ...). `LocaleConfig<T>` and `ExactLocaleConfig<T>` are both `Record<string, T>`, so they always need this level.
- Content that applies to the parent option as a whole — a list of accepted values, a note about the option group — belongs right after the parent field's own description, **before** the first sub-field. After the last sub-field it reads as if it belonged to that sub-option.
- Each field item gets a unique `id` from its name, so it can be linked to directly. Ids already used by headings are reserved first, so avoid naming a guide heading the same as an option (its id would get a `-1` suffix). `[*]` and `<...>` are stripped when generating the id.

#### Descriptions

- State the unit whenever the value is not unitless, e.g. `delay` in milliseconds, `offset` in pixels, a size in pixels, a duration in seconds. Write it in the sentence rather than in the type, e.g. `The delay in milliseconds of the debounced scroll event listener.`

#### Attributes

- `type`: the option type. Always rendered as inline code.
- `default`: the default value. Rendered as inline code **only when wrapped in backticks**, and as plain text otherwise.
- `required`, `optional`, `deprecated`: rendered as badges. A deprecated field's name is colored red and struck through.
- Any other attribute is rendered as a `Name: value` badge, which is useful for marking conditional support, e.g. `gfm=Yes`.

#### Attribute values

An unquoted value ends at the first whitespace, so values containing spaces must be quoted. Prefer the shortest form that parses correctly:

- Unquoted when the value has no whitespace and no quote, e.g. `type=boolean`, `default=true`, `default={}`.
- Backticks for literal values, especially `default`, so that they render as inline code and no escaping is applied, e.g. `` default=`'nord'` ``, `` type=`boolean | 'error'` ``.
- Double quotes for descriptive text, which renders as plain text and supports escaping with `\`, e.g. `default="Determined by the theme, set it explicitly to override"`.

#### Defaults

- Include `default` when the value is not the expected/obvious one.
- Omit `default` when it is expected/obvious: `boolean` options defaulting to `false`, `string` options defaulting to `''`, and `object` options defaulting to `undefined`.
- A multi-line default cannot be written as an attribute. Describe it in the field content instead, e.g. `Its default value is:` followed by a code fence.

#### Escaping

- To keep a marker-like line as content, escape the `@`: `` \@`not-a-field` ``.

#### Containers inside fields

- Use one more colon for the fields container when it contains a `:::` container, e.g. `:::: fields` with `::: tip` inside, closed by `::::`.
