import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "@src/consts";

export async function GET(
    context: APIContext<
        Record<string, any>,
        Record<string, string | undefined>
    >,
) {
    const posts = await getCollection("blog");

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: (context.site?.toString() ?? "https://example.com") + "/blog",
        items: posts
            .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
            .map((post) => ({
                title: post.data.title,
                pubDate: post.data.date,
                description: post.data.description,
                link: `/blog/${post.slug}`,
            })),
    });
}
