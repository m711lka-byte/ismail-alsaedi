import { fetchAllArticlesServer } from '../src/lib/fetchArticlesServer';

export default async function handler(req: any, res: any) {
  try {
    const articles = await fetchAllArticlesServer();
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=30, stale-while-revalidate=120');
    res.status(200).json(articles);
  } catch (err) {
    console.error('Error in Vercel /api/articles handler:', err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
