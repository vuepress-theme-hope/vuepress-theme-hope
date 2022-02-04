export interface Article<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  meta: T;
}

export type Articles<
  T extends Record<string, unknown> = Record<string, unknown>
> = Article<T>[];
