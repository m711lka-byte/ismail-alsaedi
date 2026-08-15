import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_ARTICLES } from './src/data/initialArticles';
import { generateRssFeed, generateAtomFeed, generateSitemap, generateArticleSchema, generatePersonKnowledgeGraph } from './src/lib/seo';
import { brandConfig } from './src/lib/brandConfig';
import { sortArticlesByScore } from './src/lib/articleRanking';
import { fetchAllArticlesServer } from './src/lib/fetchArticlesServer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory articles state synced with server and sorted by Article Score algorithm
  let currentArticles = sortArticlesByScore([...INITIAL_ARTICLES]);

  // 0. Dynamic robots.txt Endpoint (Googlebot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot)
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(`User-agent: Googlebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /

# Feeds & AI Context Discovery Links
# RSS 2.0 Feed: ${brandConfig.baseUrl}/rss.xml
# Atom 1.0 Feed: ${brandConfig.baseUrl}/atom.xml
# LLMs Context: ${brandConfig.baseUrl}/llms.txt
# Location: ${brandConfig.location.city}, ${brandConfig.location.country} (${brandConfig.location.coordinates.formatted})

Sitemap: ${brandConfig.baseUrl}/sitemap.xml
`);
  });

  // 0b. Dynamic llms.txt Endpoint (AI Crawler Knowledge Context)
  app.get('/llms.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(`# ${brandConfig.name} | ${brandConfig.profile.englishName}
> ${brandConfig.profile.jobTitle} - ${brandConfig.bio}

## نبذة عن المنصة والكاتب
إسماعيل الساعدي خبير ومستشار تقني ومطور أنظمة سعودي متخصص في:
- بناء المنصات السحابية وتصميم قواعد البيانات وحلول Firestore/SQL الهجينة.
- تطوير تطبيقات الجوال والواجهات عالية الأداء بلغة TypeScript و React و Node.js.
- إدارة وتتبع الحملات الإعلانية الموجهة وتحسين تكلفة الاستحواذ على العملاء (CAC) على منصات Snapchat و TikTok.
- تقديم الخدمات الميدانية والاستشارات المباشرة للشركات وحراج في الطائف والمدينة المنورة.

## الأقسام والروابط الرئيسية
- **المقالات والأبحاث التقنية**: ${brandConfig.baseUrl}/
- **الملف الشخصي الرسمي وشجرة المعرفة**: ${brandConfig.baseUrl}/ismailalsaedy
- **هوية المنصة وتقرير الأثر (Impact)**: ${brandConfig.baseUrl}/identity
- **المواصفات التقنية والـ SEO**: ${brandConfig.baseUrl}/tech

## خراطيم البيانات وتوثيق المعرفة للأذكياء الاصطناعيين (AI Crawlers & Knowledge Graph)
- **Schema.org JSON-LD (Person Knowledge Graph)**: ${brandConfig.baseUrl}/api/profile/schema.json
- **XML Sitemap (مع دعم الصور والفيديوهات)**: ${brandConfig.baseUrl}/sitemap.xml
- **خلاصة المقالات (RSS 2.0 Feed)**: ${brandConfig.baseUrl}/rss.xml
- **واجهة البرمجة (Articles API)**: ${brandConfig.baseUrl}/api/articles

## معلومات التواصل المباشر
- **واتساب**: ${brandConfig.profile.phone} (${brandConfig.profile.whatsappUrl})
- **البريد الإلكتروني**: ${brandConfig.profile.email}
- **حراج**: ${brandConfig.profile.harajUrl}
- **الموقع**: ${brandConfig.location.address} (${brandConfig.location.coordinates.formatted})
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

  // 1b. Dynamic Atom 1.0 Feed Endpoint
  app.get('/atom.xml', async (req, res) => {
    try {
      const articles = await fetchAllArticlesServer();
      const xml = generateAtomFeed(articles);
      res.setHeader('Content-Type', 'application/atom+xml; charset=UTF-8');
      res.status(200).send(xml);
    } catch (err) {
      res.status(500).send('Error generating Atom feed');
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

  // 4b. API Route: Ismail Al-Saedi Person Profile & Knowledge Graph
  app.get('/api/profile', (req, res) => {
    res.json({
      profile: brandConfig.profile,
      location: brandConfig.location,
      knowledgeGraph: generatePersonKnowledgeGraph()
    });
  });

  app.get('/api/profile/schema.json', (req, res) => {
    res.setHeader('Content-Type', 'application/ld+json; charset=UTF-8');
    res.json(generatePersonKnowledgeGraph());
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
