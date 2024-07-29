import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
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

export const collections = { blog, miscellaneous, gaming };
