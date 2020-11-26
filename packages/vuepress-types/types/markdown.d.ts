/* eslint-disable @typescript-eslint/no-explicit-any */
import * as MarkdownIt from "markdown-it";

export interface Markdown extends Omit<MarkdownIt, "render"> {
  render(
    md: string,
    env?: any
  ): {
    html: string;
    data: any;
    dataBlockString: string;
  };
  x: number;
}
