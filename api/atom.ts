import { fetchAllArticlesServer } from '../src/lib/fetchArticlesServer';
import { generateAtomFeed } from '../src/lib/seo';

export default async function handler(req: any, res: any) {
  try {
    const articles = await fetchAllArticlesServer();
    const xml = generateAtomFeed(articles);
    res.setHeader('Content-Type', 'application/atom+xml; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(xml);
  } catch (error) {
    res.status(500).send('Error generating Atom feed');
  }
}
