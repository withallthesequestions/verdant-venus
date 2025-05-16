import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const log = defineCollection({
	/* Retrieve all Markdown and MDX files in your blog directory. */
	loader: glob({ pattern: '**/*.(md|mdx)', base: './src/data/logs' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()),
		draft: z.boolean(),
	}),
});
export const collections = { log };
