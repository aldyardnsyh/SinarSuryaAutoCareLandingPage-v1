import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domain final: sinarsuryaautocare.biz.id (deploy di Vercel).
// Jika domain berubah lagi, samakan juga domain di src/data/site.ts dan public/robots.txt.
export const SITE_URL = 'https://sinarsuryaautocare.biz.id';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
