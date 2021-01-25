export interface RemoveMarkdownOptions {
  /**
   * char to insert instead of stripped list leaders
   *
   * @default ''
   */
  stripListLeaders?: string;
  /**
   * support GitHub-Flavored Markdown
   *
   * @default true
   */
  gfm?: boolean;
  /**
   * replace images with alt-text, if present
   *
   * @default true
   */
  useImgAltText?: boolean;
}

const gfmMarkdownRemove = (markdownContent: string): string =>
  markdownContent
    // Header
    .replace(/\n={2,}/gu, "\n")
    // Fenced codeblocks
    .replace(/~{3}.*\n/gu, "")
    // Strikethrough
    .replace(/~~/gu, "")
    // Fenced codeblocks
    .replace(/`{3}.*\n/gu, "");

export const removeMarkdown = (
  markdownContent = "",
  options: RemoveMarkdownOptions = {}
): string => {
  // Remove horizontal rules (stripListHeaders conflict with this rule, which is why it has been moved to the top)
  let output = markdownContent.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gmu, "");

  // strip list headers
  output = output.replace(
    /^([\s\t]*)([*\-+]|\d+\.)\s+/gmu,
    options.stripListLeaders ? `${options.stripListLeaders} $1` : "$1"
  );

  // handle gfm
  if (options.gfm !== false) output = gfmMarkdownRemove(output);

  // handle other content
  output = output
    // Remove HTML tags
    .replace(/<[^>]*>/gu, "")
    // Remove setext-style headers
    .replace(/^[=-]{2,}\s*$/gu, "")
    // Remove footnotes?
    .replace(/\[\^.+?\](: .*?$)?/gu, "")
    .replace(/\s{0,2}\[.*?\]: .*?$/gu, "")
    // Remove images
    .replace(
      /!\[(.*?)\][[(].*?[\])]/gu,
      options.useImgAltText === false ? "" : "$1"
    )
    // Remove inline links
    .replace(/\[(.*?)\][[(].*?[\])]/gu, "$1")
    // Remove blockquotes
    .replace(/^\s{0,3}>\s?/gu, "")
    // Remove reference-style links?
    .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/gu, "")
    // Remove atx-style headers
    .replace(
      /^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gmu,
      "$1$2$3"
    )
    // Remove emphasis (repeat the line to remove double emphasis)
    .replace(/([*_]{1,3})(\S.*?\S{0,1})\1/gu, "$2")
    .replace(/([\\*_]{1,3})(\S.*?\S{0,1})\1/gu, "$2")
    // Remove code blocks
    .replace(/(`{3,})(.*?)\1/gmu, "$2")
    // Remove inline code
    .replace(/`(.+?)`/gu, "$1")
    // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
    .replace(/\n{2,}/gu, "\n\n");

  return output;
};
