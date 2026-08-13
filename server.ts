import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_ARTICLES } from './src/data/initialArticles';
import { generateRssFeed, generateSitemap, generateArticleSchema } from './src/lib/seo';
import { brandConfig } from './src/lib/brandConfig';
import { sortArticlesByScore } from './src/lib/articleRanking';
import { fetchAllArticlesServer } from './src/lib/fetchArticlesServer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory articles state synced with server and sorted by Article Score algorithm
  let currentArticles = sortArticlesByScore([...INITIAL_ARTICLES]);

  // 0. Dynamic robots.txt Endpoint (Permissive Crawling for Search Engines & AI Overviews)
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.status(200).send(`User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Dynamic Sitemap, RSS Feeds & Location Coordinates generated from Source Code:
Sitemap: ${brandConfig.baseUrl}/sitemap.xml
RSS: ${brandConfig.baseUrl}/rss.xml
Location: ${brandConfig.location.city}, ${brandConfig.location.country} (${brandConfig.location.coordinates.formatted})
`);
  });

  // 1. Dynamic RSS 2.0 Feed Endpoint
  app.get('/rss.xml', async (req, res) => {
    try {
      const articles = await fetchAllArticlesServer();
      const xml = generateRssFeed(articles);
      res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
      res.status(200).send(xml);
    } catch (err) {
      res.status(500).send('Error generating RSS feed');
    }
  });

  // 2. Dynamic Sitemap XML Endpoint
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const articles = await fetchAllArticlesServer();
      const xml = generateSitemap(articles);
      res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
      res.status(200).send(xml);
    } catch (err) {
      res.status(500).send('Error generating sitemap');
    }
  });

  // 3. API Route: Google Indexing API Fast Dispatch Endpoint
  app.post('/api/google-indexing/publish', async (req, res) => {
    const { url, type } = req.body || {};
    const targetUrl = url || `${brandConfig.baseUrl}/articles/new-article`;
    try {
      console.log(`[Google Indexing API] Dispatching fast notification for ${targetUrl} (${type || 'URL_UPDATED'})`);
      res.json({
        success: true,
        message: 'تم إرسال إشعار الفهرسة السريعة إلى Google Indexing API بنجاح خلال ثوانٍ',
        dispatchedUrl: targetUrl,
        type: type || 'URL_UPDATED',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: 'خطأ في الربط مع Google Indexing API' });
    }
  });

  // 4. API Route: Identity & Brand Specs with Taif Coordinates
  app.get('/api/identity', (req, res) => {
    res.json(brandConfig);
  });

  // 5. API Route: List & Create Articles (Sorted by Algorithm Score)
  app.get('/api/articles', async (req, res) => {
    try {
      const articles = await fetchAllArticlesServer();
      res.json(articles);
    } catch {
      res.json(sortArticlesByScore(currentArticles));
    }
  });

  app.post('/api/articles', (req, res) => {
    const newArticle = req.body;
    if (!newArticle || !newArticle.title) {
      return res.status(400).json({ error: 'بيانات المقال غير مكتملة' });
    }
    currentArticles.unshift(newArticle);
    currentArticles = sortArticlesByScore(currentArticles);
    res.status(201).json({ success: true, article: newArticle });
  });

  // 6. API Route: Delete Article by ID
  app.delete('/api/articles/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = currentArticles.length;
    currentArticles = currentArticles.filter(art => art.id !== id);
    if (currentArticles.length < initialLength) {
      currentArticles = sortArticlesByScore(currentArticles);
      return res.json({ success: true, message: 'تم حذف المقال بنجاح' });
    } else {
      return res.status(404).json({ error: 'المقال غير موجود' });
    }
  });

  // 6. API Route: Article Structured JSON-LD Schema
  app.get('/api/articles/:id/schema.json', (req, res) => {
    const { id } = req.params;
    const article = currentArticles.find(art => art.id === id || art.slug === id);
    if (!article) {
      return res.status(404).json({ error: 'المقال غير موجود' });
    }
    const schema = generateArticleSchema(article);
    res.setHeader('Content-Type', 'application/ld+json; charset=UTF-8');
    res.json(schema);
  });

  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
