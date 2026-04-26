import {
  definePlugin,
  type PostprocessRenderedBlockContext,
} from "@expressive-code/core";
import { h } from "@expressive-code/core/hast";
import { fromHtml } from "hast-util-from-html";

export function pluginLivePreview() {
  return definePlugin({
    name: "Live Preview Plugin",
    baseStyles: `
      .live-preview-wrapper {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--sl-color-gray-5);
        overflow: hidden;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .live-preview-container {
        padding: 1.5rem;
        background: white; 
        color: black;
      }
    `,
    hooks: {
      postprocessRenderedBlock: (context) => {
        if (!context.codeBlock.meta.includes("preview")) return;
        if (context.codeBlock.meta.includes("iframe")) {
          renderWithIframe(context);
        } else {
          renderWithHast(context);
        }
      },
    },
  });
}

const renderWithHast = (context: PostprocessRenderedBlockContext) => {
  const code = context.codeBlock
    .getLines()
    .map((l) => l.text)
    .join("\n");
  const originalBlockAst = context.renderData.blockAst;

  const htmlAst = fromHtml(code, { fragment: true }).children;

  const previewContainer = h("div.live-preview-container", htmlAst);

  context.renderData.blockAst = h("div.live-preview-wrapper.not-content", [
    previewContainer,
    originalBlockAst,
  ]);
};

const renderWithIframe = (context: PostprocessRenderedBlockContext) => {
  const code = context.codeBlock
    .getLines()
    .map((l) => l.text)
    .join("\n");
  const originalBlockAst = context.renderData.blockAst;

  const previewIframe = h("iframe", {
    className: ["live-preview-iframe"],
    srcdoc: code,
    style: "width: 100%; border: none; background: white; min-height: 300px;",
    sandbox: "allow-scripts",
  });

  context.renderData.blockAst = h("div.live-preview-wrapper.not-content", [
    previewIframe,
    originalBlockAst,
  ]);
};
