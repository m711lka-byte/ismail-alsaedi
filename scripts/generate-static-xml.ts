import fs from 'fs';
import path from 'path';
import { INITIAL_ARTICLES } from '../src/data/initialArticles';
import { generateRssFeed, generateSitemap } from '../src/lib/seo';
import { sortArticlesByScore } from '../src/lib/articleRanking';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const articles = sortArticlesByScore(INITIAL_ARTICLES);

// Generate RSS XML
const rssXml = generateRssFeed(articles);
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8');
console.log('Successfully generated public/rss.xml');

// Generate Sitemap XML
const sitemapXml = generateSitemap(articles);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log('Successfully generated public/sitemap.xml');
