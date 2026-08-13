import { generateSitemap } from '../src/lib/seo';
import { fetchAllArticlesServer } from '../src/lib/fetchArticlesServer';

export default async function handler(req: any, res: any) {
  try {
    const articles = await fetchAllArticlesServer();
    const xml = generateSitemap(articles);
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(xml);
  } catch (err) {
    console.error('Error in Vercel /api/sitemap handler:', err);
    res.status(500).send('Error generating sitemap');
  }
}
