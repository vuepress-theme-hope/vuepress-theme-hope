/* eslint-disable */

/// <reference types="@mr-hope/vuepress-plugin-comment" />

/// <reference types="@mr-hope/vuepress-plugin-theme-color" />

/// <reference types="@mr-hope/vuepress-plugin-pwa" />

/// <reference types="vuepress-plugin-md-enhance" />

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module '@vuepress/shared-utils/lib/logger' {
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
