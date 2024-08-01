import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
    site: "https://shreyasminocha.me",
    integrations: [mdx(), sitemap()],
    markdown: {
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "prepend",
                    properties: {
                        className: ["heading-anchor"],
                    },
                    content: (heading) => headingToLinkContent(heading),
                },
            ],
        ],
        shikiConfig: {
            theme: "material-theme",
        },
    },
});

function headingToLinkContent(heading) {
    return {
        type: "text",
        value: headingTagNameToMarkdown(heading.tagName),
    };
}

function headingTagNameToMarkdown(element) {
    switch (element) {
        case "h1":
            return "#";
        case "h2":
            return "##";
        case "h3":
            return "###";
        case "h4":
            return "####";
        case "h5":
            return "#####";
        case "h6":
            return "######";
        default:
            return "§";
    }
}
