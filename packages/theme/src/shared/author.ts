export type AuthorName = string;

export interface AuthorInfo {
  /**
   * Author name
   *
   * 作者姓名
   */
  name: string;

  /**
   * Author website
   *
   * 作者网站
   */
  url?: string;

  /**
   * Author email
   *
   * 作者 Email
   */
  email?: string;
}

export type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
