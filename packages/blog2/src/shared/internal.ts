export interface CategoryConfig {
  path: string;
  keys: string[];
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
  keys: string[];
}

export interface TypeMap {
  [localePath: string]: TypeLocaleConfig;
}
