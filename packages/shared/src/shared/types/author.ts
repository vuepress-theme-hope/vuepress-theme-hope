export type AuthorName = string;

export type AuthorInfo = { name: string; url?: string };

export type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
