/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@vuepress/shared-utils/lib/logger" {
  interface LoggerOptions {
    logLevel: number;
  }

  class Logger {
    options: LoggerOptions;

    constructor(options?: LoggerOptions);

    setOptions(options: LoggerOptions): void;

    debug(...args: any[]): void;

    warn(...args: any[]): void;

    error(...args: any[]): void;

    success(...args: any[]): void;

    tip(...args: any[]): void;

    info(...args: any[]): void;

    wait(...args: any[]): void;

    status(color: string, label: string, ...args: any[]): void;

    developer(...args: any[]): void;
  }

  const logger: Logger;
  /**
   * Expose a logger instance.
   */
  export = logger;
}

declare module "docsearch.js/dist/cdn/docsearch.min.js" {
  const docsearch: any;

  export default docsearch;
}

declare module "*.css" {}
