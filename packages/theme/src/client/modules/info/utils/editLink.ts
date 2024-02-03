import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/helper/client";
import type { RepoType } from "vuepress-shared/client";
import { resolveRepoType } from "vuepress-shared/client";

export const editLinkPatterns: Record<Exclude<RepoType, null>, string> = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket:
    ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default",
};

interface EditLinkOptions {
  docsRepo: string;
  docsBranch: string;
  docsDir: string;
  filePathRelative: string | null;
  editLinkPattern?: string;
}

export const resolveEditLink = ({
  docsRepo,
  docsBranch,
  docsDir,
  filePathRelative,
  editLinkPattern,
}: EditLinkOptions): string | null => {
  if (!filePathRelative) return null;

  const repoType = resolveRepoType(docsRepo);

  let pattern: string | undefined;

  if (editLinkPattern) pattern = editLinkPattern;
  else if (repoType !== null) pattern = editLinkPatterns[repoType];

  if (!pattern) return null;

  return pattern
    .replace(
      /:repo/u,
      isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`,
    )
    .replace(/:branch/u, docsBranch)
    .replace(
      /:path/u,
      removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`),
    );
};
