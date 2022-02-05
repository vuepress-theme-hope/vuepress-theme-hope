declare module "@temp/blog/category" {
  interface CategoryConfig {
    path: string;
    keys: string[];
  }

  type CategoryLocaleMap = Record<
    /** Category name */ string,
    /** Category config */ CategoryConfig
  >;

  interface CategoryLocaleConfig {
    /** Main page of category */
    path: string;
    /** category map for current locale */
    map: CategoryLocaleMap;
  }

  type CategoryMap = Record<
    /** Locale Path */ string,
    /** Locale category config */ CategoryLocaleConfig
  >;

  export const categoryMap: Record<string, CategoryMap>;
}
