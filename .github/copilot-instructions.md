# VuePress Theme Hope Coding Standards

## Content Rules

- Target developers: concise, clear, essential information only
- Focus on essential information developers need to understand and implement features
- No typos or grammar errors

## Code Rules

### API Usage Restrictions

- No Node.js APIs in `client` folder
- No browser APIs in `node` folder
- No cross import between `client` and `node` folders
- No Node.js or browser APIs in `shared` folder

### Export Requirements

- **Plugin and theme exports** must satisfy:
  - Name: consistent with package name
  - Types: All types in export content shall be exported
- **Single function files**: filename should match export function/class name

### Import/Export Rules

- Relative imports/exports must use `.js` extension with `.ts` files
- No external dependencies warnings with `bundle` command

## CSS Rules

### Class Naming

- **Classes**: Must start with `vp-` prefix
- **External Integration Exception**: Classes for external content integration are exempt. E.g.: `waline-wrapper` for Waline comment system

### Variable Naming

- **Color variables**: Must contain `-c-`
- **Plugin variables**: Prefixed with plugin name
- **Theme variables**: Prefixed with `vp-`
- **Icon variables**: If in class definitions, `--icon` is required.

## JSDoc Rules

### Scope

- **Required for**: All user-visible exports
- **Not required for**: Internal implementations (but existing ones must be correct)

### Format Requirements

- **Bilingual**: English + Chinese for all exported content
- **@default**:
  - User-visible things: Always include if exists (including `@default false`)
  - Others: Only when not clearly visible in function parameters
- **@example**: Only for exported functions
- **@description**: Optional, only if necessary to explain more
- **@param**: Required for all parameters, should be bilingual, separate with `/` for English and Chinese

````typescript
/**
 * English description
 *
 * 中文描述
 *
 * @description (optional) English detailed description
 *
 * 中文详细描述
 *
 * @param paramName - English description / 中文描述
 *
 * @default defaultValue
 * @example
 * ```ts
 * // Example code in TypeScript
 * ```
 */
````

## Documentation Rules

### General Requirements

- Consistent with code behaviors
- Chinese/English content must be consistent in structure and content
- Make content concise and clear, remove unnecessary words, avoid redundancy, prefer shorter if possible
- Use "你" instead of "您" in Chinese
- Ignore any errors with `@[code ...` as they are VuePress code import grammar, which is not standard.
- Ignore any errors with VuePress components in markdown.

### Options Documentation Format

Each option in plugin/theme documentation must include these sections **in this exact order**:

1. **Type**
   - English: `- Type: \`type\``
   - Chinese: `- 类型：\`type\``
   - Follow with code fence for complex types

2. **Required Status**
   - Only for required options: `- Required: Yes` / `- 必填：是`
   - **Never write "Required: No" for optional options**

3. **Default Value**
   - **INCLUDE Default when**: Default value is NOT the expected/obvious value
   - **OMIT Default when**: Default value is expected/obvious
     - `boolean` options with `false` default → **OMIT**
     - `string` options with `''` default → **OMIT**
     - `object` options with `undefined` default → **OMIT**
   - Format: `- Default: \`value\``/`- 默认值：\`value\``

4. **Details** (必须包含)
   - English: `- Details: Brief description`
   - Chinese: `- 详情：简要描述`
   - Prefer same line for short contents and paragraph for long contents.

**Example Format:**

```md
### optionName

- Type: `boolean`
- Details: Whether to enable this feature.

### requiredOption

- Type: `string`
- Required: Yes
- Details: The required configuration.

### optionWithNonStandardDefault

- Type: `number`
- Default: `100`
- Details: Custom timeout value.
```
