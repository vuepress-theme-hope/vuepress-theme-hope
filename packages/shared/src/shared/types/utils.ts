export type AuthorInfo = { name: string; url?: string };

export type Author = string | string[] | AuthorInfo | AuthorInfo[];
