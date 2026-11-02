import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domain final: www.sinarsuryaautocare.biz.id (deploy di Vercel).
// Vercel me-redirect non-www ke www, jadi SEMUA URL resmi memakai www
// (canonical, og:url, sitemap, robots.txt). Satu-satunya sumber di sini.
export const SITE_URL = 'https://www.sinarsuryaautocare.biz.id';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
