import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { figure } from "@mdit/plugin-figure";
import type MarkdownIt from "markdown-it";
import type { RendererContext } from "vscode-notebook-renderer";

interface MarkdownItRenderer {
  extendMarkdownIt(extender: (markdownIt: MarkdownIt) => void): void;
}

export const activate = async (
  context: RendererContext<void>
): Promise<void> => {
  // FIXME: Debug
  console.log("Plugin loaded");

  const markdownItRenderer = (await context.getRenderer(
    "vscode.markdown-it-renderer"
  )) as MarkdownItRenderer | undefined;

  if (!markdownItRenderer)
    throw new Error(`Could not load 'vscode.markdown-it-renderer'`);

  markdownItRenderer.extendMarkdownIt((md: MarkdownIt) => {
    md.use(align);
    md.use(attrs);
    md.use(figure);
  });
};
