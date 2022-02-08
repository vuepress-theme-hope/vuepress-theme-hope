export interface Article<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  info: T;
}

export type Articles<
  T extends Record<string, unknown> = Record<string, unknown>
> = Article<T>[];

export interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  currentItems?: Articles<T>;
  map: Record<string, { path: string; items: Articles<T> }>;
}

export interface BlogTypeData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  items: Articles<T>;
}
