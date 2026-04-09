import { definePlugin } from '@expressive-code/core';
import { h } from '@expressive-code/core/hast';

export function pluginLivePreview() {
  return definePlugin({
    name: 'Live Preview Plugin',
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

      .live-preview-wrapper > figure.expressive-code {
        margin: 0 !important;
      }
    `,
    hooks: {
      postprocessRenderedBlock: (context) => {
        if (!context.codeBlock.meta.includes('preview')) return;

        const code = context.codeBlock.getLines().map(l => l.text).join('\n');

        const originalBlockAst = context.renderData.blockAst;

        const previewContainer = h('div.live-preview-container', [
          { type: 'raw', value: code }
        ]);

        context.renderData.blockAst = h('div.live-preview-wrapper.not-content', [
          previewContainer,
          originalBlockAst
        ]);
      }
    }
  });
}