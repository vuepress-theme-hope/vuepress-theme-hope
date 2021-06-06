import { isLinkHttp } from "@vuepress/shared";

export type RepoType = "GitHub" | "GitLab" | "Gitee" | "Bitbucket" | null;

export const resolveRepoType = (repo: string): RepoType =>
  !isLinkHttp(repo) || /github\.com/.test(repo)
    ? "GitHub"
    : /bitbucket\.org/.test(repo)
    ? "Bitbucket"
    : /gitlab\.com/.test(repo)
    ? "GitLab"
    : /gitee\.com/.test(repo)
    ? "Gitee"
    : null;
