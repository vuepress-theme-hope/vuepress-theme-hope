import { isLinkHttp } from "@vuepress/helper/client";

export type RepoType = "GitHub" | "GitLab" | "Gitee" | "Bitbucket" | null;

export const resolveRepoLink = (repo: string): string =>
  isLinkHttp(repo) ? repo : `https://github.com/${repo}`;

export const resolveRepoType = (repo = ""): RepoType =>
  !isLinkHttp(repo) || repo.includes("github.com")
    ? "GitHub"
    : repo.includes("bitbucket.org")
      ? "Bitbucket"
      : repo.includes("gitlab.com")
        ? "GitLab"
        : repo.includes("gitee.com")
          ? "Gitee"
          : null;
