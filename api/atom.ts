import { generateAtomFeed } from '../src/lib/seo';
import { fetchAllArticlesServer } from '../src/lib/fetchArticlesServer';
import { INITIAL_ARTICLES } from '../src/data/initialArticles';

export default async function handler(req: any, res: any) {
  try {
    const articles = await fetchAllArticlesServer().catch(() => INITIAL_ARTICLES);
    const xml = generateAtomFeed(articles && articles.length ? articles : INITIAL_ARTICLES);
    res.setHeader('Content-Type', 'application/atom+xml; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).send(xml);
  } catch (err) {
    const fallbackXml = generateAtomFeed(INITIAL_ARTICLES);
    res.setHeader('Content-Type', 'application/atom+xml; charset=UTF-8');
    res.status(200).send(fallbackXml);
  }
}
