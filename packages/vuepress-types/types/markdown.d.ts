import * as MarkdownIt from "markdown-it";

export interface Markdown extends Omit<MarkdownIt, "render"> {
  render(
    md: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env?: any
  ): {
    html: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    dataBlockString: string;
  };
  x: number;
}
