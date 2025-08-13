import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        tags: z.optional(z.array(z.string())),
    }),
});

const resources = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.optional(z.string()),
        tags: z.optional(z.array(z.string())),
    }),
});

const miscellaneous = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.optional(z.string()),
        tags: z.optional(z.array(z.string())),
    }),
});

const gaming = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
    }),
});

const type = z.enum(["article", "conference"]);
const title = z.string().or(
    z.object({
        value: z.string(),
        short: z.string(),
    }),
);

const coauthors = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        url: z.optional(z.string()),
    }),
});
const coauthor = reference("coauthors");

const papers = defineCollection({
    type: "data",
    // we attempt to keep this a subset of hayagriva
    schema: z.object({
        type,
        title,
        author: coauthor.or(z.array(coauthor)),
        date: z.coerce.date(),
        url: z.optional(z.string()),
        doi: z.optional(z.string()),
        artifactUrl: z.optional(z.string()),
        parent: z.object({
            type,
            title,
        }),
    }),
});

export const collections = {
    blog,
    resources,
    miscellaneous,
    gaming,
    papers,
    coauthors,
};
