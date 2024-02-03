declare module "@temp/blog/type" {
  interface TypeConfig {
    path: string;
    items: number[];
  }

  type TypeMap = Record<
    /** Locale Path */ string,
    /** Locale Type config */ TypeConfig
  >;

  export const typeMap: Record<string, TypeMap>;
}
