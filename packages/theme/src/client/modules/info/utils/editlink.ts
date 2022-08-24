import {
  isLinkHttp,
  removeLeadingSlash,
  removeEndingSlash,
} from "@vuepress/shared";
import { resolveRepoType } from "@theme-hope/utils/index.js";

import type { RepoType } from "@theme-hope/utils/index.js";

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
      /:repo/,
      isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
    )
    .replace(/:branch/, docsBranch)
    .replace(
      /:path/,
      removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`)
    );
};
