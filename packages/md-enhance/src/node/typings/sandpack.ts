export interface MdSandpackOptions {
  /**
   * Sandpack container name
   *
   * 交互演示容器名
   */
  name: string;

  /**
   * Sandpack component name
   *
   * 交互演示组件名称
   *
   * @default "sandpack"
   */
  component?: string;

  /**
   * Props getter
   *
   * 属性获取器
   */
  propsGetter: (data: SandpackData) => Record<string, string>;
}

export interface SandpackData extends SandpackConfig {
  /**
   * Title of sandpack
   *
   * 交互演示标题
   */
  title?: string;

  /**
   * hash key based on sandpack content
   *
   * 根据交互演示内容生成的 hash key
   */
  key: string;
}

export interface SandpackConfig {
  /**
   * It accepts an object, where each key is the relative
   * path of that file in the sandbox folder structure. Files passed in
   * through the files prop override those in the template structure.
   *
   * Since each template uses the same type to define the files, you can
   * overwrite the contents of any of the template files.
   *
   * Example:
   * ```js
   * {
   *  "/App.js": "export default () => 'foo'"
   * }
   * ```
   */
  files: SandpackFiles;

  /**
   * Set of presets to easily initialize sandboxes. Each template contains
   * its files, environment and dependencies, and you can overwrite it
   * using `customSetup` or `dependencies`.
   */
  template?: SandpackPredefinedTemplate;

  /**
   * Pass custom properties to set your own Sandpack environment.
   *
   * Since each template uses the same type to define the files, you can
   * overwrite the contents of any of the template files.
   */
  customSetup?: SandpackSetup;

  /**
   * The theme specifies the color set of the components, syntax highlight,
   * and typography. Use this prop in order to match the design aspect of your website.
   *
   * Set as `auto` to turn it color scheme sensitive
   */
  theme?: SandpackPredefinedTheme;

  /**
   * Pass custom properties to customize the interface and the behavior
   * of the sandbox, such as initialization mode, recompile mode, files resolver, etc.
   */
  options?: SandpackOptions;

  /**
   * CodeSandbox team id: with this information, bundler can connect to CodeSandbox
   * and unlock a few capabilities, like private dependencies.
   */
  teamId?: string;
}

export type SandpackPredefinedTemplate =
  | "static"
  | "angular"
  | "react"
  | "react-ts"
  | "solid"
  | "svelte"
  | "test-ts"
  | "vanilla-ts"
  | "vanilla"
  | "vue"
  | "vue-ts"
  | "node"
  | "nextjs"
  | "vite"
  | "vite-react"
  | "vite-react-ts"
  | "vite-vue"
  | "vite-vue-ts"
  | "vite-svelte"
  | "vite-svelte-ts"
  | "astro";

/**
 * @category Setup
 */
export interface SandpackFile {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
}

export type SandpackFiles = Record<string, string | SandpackFile>;

/**
 * @category Theme
 */
export type SandpackPredefinedTheme = "light" | "dark" | "auto";

/**
 * @category Setup
 */
export interface SandpackSetup {
  /**
   * Any template will include the needed dependencies,
   * but you can specify any additional dependencies. The key
   * should be the name of the package, while the value is the version,
   * in exactly the same format as it would be inside package.json.
   *
   * Examples:
   * ```js
   * {
   *  "react": "latest",
   *  "@material-ui/core": "4.12.3",
   * }
   * ```
   */
  dependencies?: Record<string, string>;

  /**
   * Sandpack doesn't install devDependencies, because most tools in there
   * were build tools, which is not necessary to properly run a sandbox,
   * but maybe required for running locally or export to CodeSandbox.
   *
   * Examples:
   * ```js
   * {
   *  "@types/react": "latest",
   * }
   * ```
   */
  devDependencies?: Record<string, string>;

  /**
   * The entry file is the starting point of the bundle process.
   *
   * If you change the path of the entry file, make sure you control
   * all the files that go into the bundle process, as prexisting
   * settings in the template might not work anymore.
   */
  entry?: string;
}

/**
 * @category Setup
 */
export interface SandpackOptions {
  /**
   * List of files that will be visible for the user interacts with.
   * It defaults to the main file from a given template.
   */
  visibleFiles?: string[];

  /**
   * Use this to set a file as active by default in the editor component.
   * It defaults to the main file from a given template.
   */
  activeFile?: string;

  editorWidthPercentage?: number;
  editorHeight?: number | string;
  classes?: Record<string, string>;

  /**
   * right to left layout
   * @default false
   */
  rtl?: boolean;
  showNavigator?: boolean;
  showLineNumbers?: boolean;
  showInlineErrors?: boolean;
  showRefreshButton?: boolean;
  showTabs?: boolean;
  showConsoleButton?: boolean;
  showConsole?: boolean;
  closableTabs?: boolean;
  wrapContent?: boolean;
  resizablePanels?: boolean;
  /**
   * This disables editing of content by the user in all files.
   */
  readOnly?: boolean;

  /**
   * Controls the visibility of Read-only label, which will only
   * appears when `readOnly` is `true`
   */
  showReadOnly?: boolean;

  layout?: "preview" | "tests" | "console";

  /**
   * This provides a way to control how some components are going to
   * be initialized on the page. The CodeEditor and the Preview components
   * are quite expensive and might overload the memory usage, so this gives
   * a certain control of when to initialize them.
   */
  initMode?: SandpackInitMode;
  initModeObserverOptions?: IntersectionObserverInit;
  /**
   * Determines whether or not the bundling process should start automatically
   *  for a component in Sandpack. By default, when the component gets closer
   *  to the viewport or when the page loads and the component is already in
   *  the viewport, the bundling process will start automatically. However,
   *  if this prop is set to false, the bundling process will only start when
   *  triggered manually by the user.
   */
  autorun?: boolean;
  /**
   * Determines whether or not the component should automatically reload when
   *  changes are made to the code. When this prop is set to true, any changes
   *  made to the code will trigger an automatic reload of the component,
   * allowing the user to see the changes immediately. However, if this prop
   *  is set to false, the component will need to be manually reloaded by the
   *  user to see the changes.
   */
  autoReload?: boolean;
  recompileMode?: "immediate" | "delayed";
  recompileDelay?: number;

  /**
   * By default, Sandpack generates a random value to use as an id.
   * Use this to override this value if you need predictable values.
   */
  id?: string;
  logLevel?: SandpackLogLevel;
  bundlerURL?: string;
  startRoute?: string;
  skipEval?: boolean;
  fileResolver?: FileResolver;
  externalResources?: string[];
}

export type SandpackInitMode = "immediate" | "lazy" | "user-visible";

export interface FileResolver {
  isFile: (path: string) => Promise<boolean>;
  readFile: (path: string) => Promise<string>;
}

export enum SandpackLogLevel {
  None = 0,
  Error = 10,
  Warning = 20,
  Info = 30,
  Debug = 40,
}
