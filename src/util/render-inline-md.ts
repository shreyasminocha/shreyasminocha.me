import { createMarkdownProcessor } from "@astrojs/markdown-remark";

async function renderInlineMarkdown(markdown: string): Promise<string> {
    const processor = createMarkdownProcessor({
        rehypePlugins: ["./src/util/rehype-inline-paragraph/index.mjs"],
        syntaxHighlight: false,
    });

    return processor
        .then((p) => p.render(markdown))
        .then((result) => result.code);
}

export default renderInlineMarkdown;
