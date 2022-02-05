declare module "@temp/blog/type" {
  interface TypeConfig {
    path: string;
    keys: string[];
  }

  type TypeMap = Record<
    /** Locale Path */ string,
    /** Locale Type config */ TypeConfig
  >;

  export const typeMap: Record<string, TypeMap>;
}
