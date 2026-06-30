import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    icon: z.string(),
    excerpt: z.string(),
    heroSubtitle: z.string().optional(),
    image: z.string().optional(),
    forWhom: z.array(z.string()).default([]),
    benefits: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string().default('Ghiduri'),
    excerpt: z.string(),
    image: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { services, blog };
