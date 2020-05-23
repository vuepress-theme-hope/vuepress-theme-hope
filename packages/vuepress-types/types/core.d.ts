declare module "@vuepress/core" {
  import {
    Context,
    ContextOptions,
  } from "@mr-hope/vuepress-types/types/context";

  export const version: string;

  export function createApp(options: ContextOptions): Context;

  export function dev(options: ContextOptions): Promise<Context>;

  export function build(options: ContextOptions): Promise<Context>;

  export function eject(dir: string): Promise<void>;
}
