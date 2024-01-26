export interface CategoryConfig {
  path: string;
  items: number[];
}

export interface CategoryLocaleMap {
  [categoryName: string]: CategoryConfig;
}

export interface CategoryLocaleConfig {
  /** Main page of category */
  path: string;
  /** category map for current locale */
  map: CategoryLocaleMap;
}

export interface CategoryMap {
  [localePath: string]: CategoryLocaleConfig;
}

export interface TypeLocaleConfig {
  path: string;
  items: number[];
}

export interface TypeMap {
  [localePath: string]: TypeLocaleConfig;
}
