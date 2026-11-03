// src/content/config.ts — skema koleksi konten.
// Artikel blog: satu file markdown = satu artikel.
// Foto artikel ditulis langsung di body markdown dengan path relatif ke
// src/assets/ (otomatis dioptimasi astro:assets pada Astro 4).
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
