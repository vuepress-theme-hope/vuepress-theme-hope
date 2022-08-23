export interface PlaygroundCodeConfig {
  lang: string;
  content: string;
}

export interface PlaygroundData {
  /** Title of Playground */
  title?: string;
  /** Import map file name */
  importMap?: string;
  /** Files info */
  files: Record<string, PlaygroundCodeConfig>;
  /** Playground settings */
  settings?: unknown;
  /** hash key of playground */
  key: string;
}

export interface PlaygroundOptions {
  name: string;
  openRender: (playgroundData: PlaygroundData) => string;
  closeRender: () => string;
}
