/* eslint-disable max-statements */
import hash = require("hash-sum");
import MarkdownIt = require("markdown-it");
import Token = require("markdown-it/lib/token");

const mermaid = (md: MarkdownIt): void => {
  const mermaidRender = (tokens: Token[], idx: number): string => {
    const token = tokens[idx];
    const key = `mermaid${hash(idx)}`;
    const { content } = token;

    return `<Mermaid id="${key}" data-code="${encodeURIComponent(
      content
    )}"></Mermaid>`;
  };

  // Handle ```mermaid blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, idx] = args;
    const { info } = tokens[idx];

    if (info.trim().split(":")[0] === "mermaid")
      return mermaidRender(tokens, idx);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args);
  };

  md.renderer.rules.mermaid = mermaidRender;
};

export default mermaid;
