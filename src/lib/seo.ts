import { Article } from '../types';
import { brandConfig } from './brandConfig';

/**
 * Generate interconnected Person Knowledge Graph Schema.org (@graph)
 * Optimized for AI engines (ChatGPT, Claude, Perplexity, Gemini) and Google Knowledge Graph.
 */
export function generatePersonKnowledgeGraph(baseUrl = brandConfig.baseUrl) {
  const p = brandConfig.profile;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/ismailalsaedy#profile`,
        "url": `${baseUrl}/ismailalsaedy`,
        "name": `الملف الشخصي الرسمي | ${p.name}`,
        "description": p.bio,
        "inLanguage": "ar-SA",
        "mainEntity": {
          "@id": `${baseUrl}/#person`
        }
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": p.name,
        "alternateName": [p.englishName, "الساعدي"],
        "jobTitle": p.jobTitle,
        "description": p.bio,
        "image": {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#author-avatar`,
          "url": p.avatar,
          "caption": p.name
        },
        "url": baseUrl,
        "email": p.email,
        "telephone": p.phone,
        "nationality": "SA",
        "homeLocation": {
          "@type": "Place",
          "name": `مدينة ${p.city}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": p.city,
            "addressRegion": "منطقة مكة المكرمة",
            "addressCountry": "SA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": brandConfig.location.coordinates.latitude,
            "longitude": brandConfig.location.coordinates.longitude
          }
        },
        "sameAs": [
          p.whatsappUrl,
          p.harajUrl,
          p.twitterUrl,
          p.tiktokUrl,
          p.instagramUrl,
          p.linkedinUrl,
          p.githubUrl,
          p.youtubeUrl,
          p.website
        ],
        "knowsAbout": p.knowsAbout,
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "@id": `${baseUrl}/#whatsapp`,
            "telephone": p.phone,
            "contactType": "customer support & consulting",
            "url": p.whatsappUrl,
            "availableLanguage": ["Arabic", "English"]
          },
          {
            "@type": "ContactPoint",
            "@id": `${baseUrl}/#haraj-services`,
            "contactType": "field services & marketplace consulting",
            "url": p.harajUrl,
            "availableLanguage": ["Arabic"]
          }
        ],
        "worksFor": {
          "@id": `${baseUrl}/#organization`
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "منصة إسماعيل الساعدي للحلول التقنية",
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "founder": {
          "@id": `${baseUrl}/#person`
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": p.city,
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": brandConfig.location.coordinates.latitude,
          "longitude": brandConfig.location.coordinates.longitude
        }
      },
      ...p.services.map((srv, idx) => ({
        "@type": "Service",
        "@id": `${baseUrl}/#service-${idx + 1}`,
        "name": srv.title,
        "description": srv.desc,
        "provider": {
          "@id": `${baseUrl}/#person`
        },
        "areaServed": ["الطائف", "المدينة المنورة", "المملكة العربية السعودية"]
      }))
    ]
  };
}

/**
 * Generate full JSON-LD Schema according to Google Search Central guidelines:
 * Includes BlogPosting, ImageObject, FAQPage, Person, Place, Organization.
 */
export function generateArticleSchema(article: Article, baseUrl = brandConfig.baseUrl) {
  const rawDate = article.updatedDate || article.publishDate || '2026-08-12';
  const isoPublishDate = article.publishDate.includes('T') ? article.publishDate : `${article.publishDate}T12:00:00+03:00`;
  const isoModifiedDate = rawDate.includes('T') ? rawDate : `${rawDate}T12:00:00+03:00`;

  const articleGraph: any[] = [
    {
      "@type": "BlogPosting",
      "@id": `${baseUrl}/articles/${article.slug}#article`,
      "headline": article.title,
      "description": article.introDirectAnswer,
      "inLanguage": "ar-SA",
      "datePublished": isoPublishDate,
      "dateModified": isoModifiedDate,
      "image": {
        "@type": "ImageObject",
        "@id": `${baseUrl}/articles/${article.slug}#primaryimage`,
        "url": article.coverImage,
        "caption": article.coverAlt || article.title
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/articles/${article.slug}`
      },
      "author": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": article.author.name,
        "jobTitle": article.author.role,
        "url": `${baseUrl}/ismailalsaedy`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": brandConfig.location.city,
          "addressCountry": brandConfig.location.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": brandConfig.location.coordinates.latitude,
          "longitude": brandConfig.location.coordinates.longitude
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": brandConfig.publisher.name,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/icon.png`
        }
      },
      "contentLocation": {
        "@type": "Place",
        "name": `مدينة ${brandConfig.location.city}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": brandConfig.location.city,
          "addressCountry": brandConfig.location.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": brandConfig.location.coordinates.latitude,
          "longitude": brandConfig.location.coordinates.longitude
        }
      },
      "keywords": article.tags.join(', ')
    }
  ];

  if (article.faqs && article.faqs.length > 0) {
    articleGraph.push({
      "@type": "FAQPage",
      "@id": `${baseUrl}/articles/${article.slug}#faq`,
      "mainEntity": article.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": articleGraph
  };
}

/**
 * Generate complete Atom 1.0 XML feed dynamically from an array of articles
 */
export function generateAtomFeed(articles: Article[], baseUrl = brandConfig.baseUrl): string {
  const entriesXml = articles.map(article => {
    const rawDate = article.updatedDate || article.publishDate || new Date().toISOString();
    const isoDate = rawDate.includes('T') ? rawDate : `${rawDate}T12:00:00.000Z`;
    return `  <entry>
    <title type="text"><![CDATA[${article.title}]]></title>
    <link rel="alternate" type="text/html" href="${baseUrl}/articles/${article.slug}"/>
    <id>${baseUrl}/articles/${article.slug}</id>
    <updated>${isoDate}</updated>
    <published>${article.publishDate.includes('T') ? article.publishDate : `${article.publishDate}T12:00:00.000Z`}</published>
    <author>
      <name><![CDATA[${article.author.name}]]></name>
      <uri>${baseUrl}/ismailalsaedy</uri>
    </author>
    <summary type="html"><![CDATA[${article.introDirectAnswer}]]></summary>
    <content type="html"><![CDATA[${article.contentMarkdown}]]></content>
    <category term="${article.category}"/>
  </entry>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title><![CDATA[${brandConfig.name} | مقالات برمجية وحلول تقنية - ${brandConfig.location.city}]]></title>
  <subtitle><![CDATA[${brandConfig.bio}]]></subtitle>
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${baseUrl}/" rel="alternate" type="text/html"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${baseUrl}/</id>
  <author>
    <name><![CDATA[${brandConfig.profile.name}]]></name>
    <email>${brandConfig.profile.email}</email>
    <uri>${baseUrl}/ismailalsaedy</uri>
  </author>
  <icon>${baseUrl}/icon.png</icon>
${entriesXml}
</feed>`.trim();
}

/**
 * Generate complete RSS 2.0 XML dynamically from an array of articles
 */
export function generateRssFeed(articles: Article[], baseUrl = brandConfig.baseUrl): string {
  const itemsXml = articles.map(article => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${article.author.name} (${brandConfig.location.city})]]></dc:creator>
      <category><![CDATA[${article.category}]]></category>
      <description><![CDATA[${article.introDirectAnswer}]]></description>
      <content:encoded><![CDATA[${article.contentMarkdown}]]></content:encoded>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${brandConfig.name} | مقالات برمجية وحلول تقنية - ${brandConfig.location.city}]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[${brandConfig.bio} - ${brandConfig.location.address}]]></description>
    <language>ar-sa</language>
    <copyright><![CDATA[جميع الحقوق محفوظة منصة إسماعيل الساعدي ${new Date().getFullYear()}]]></copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/icon.png</url>
      <title><![CDATA[${brandConfig.name}]]></title>
      <link>${baseUrl}</link>
    </image>
${itemsXml}
  </channel>
</rss>`.trim();
}

/**
 * Generate XML Sitemap with Google Image Sitemap Extensions (xmlns:image)
 */
export function generateSitemap(articles: Article[], baseUrl = brandConfig.baseUrl): string {
  const todayIso = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/ismailalsaedy`, priority: '0.95', changefreq: 'weekly' },
    { url: `${baseUrl}/identity`, priority: '0.85', changefreq: 'monthly' },
    { url: `${baseUrl}/tech`, priority: '0.85', changefreq: 'monthly' }
  ];

  const staticPagesXml = staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${todayIso}T17:00:00+03:00</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  const articlePagesXml = articles.map(article => {
    const rawDate = article.updatedDate || article.publishDate || todayIso;
    const isoDate = rawDate.includes('T') ? rawDate : `${rawDate}T17:00:00+03:00`;
    
    // Google Image Sitemap extension
    const imageSnippet = article.coverImage ? `
    <image:image>
      <image:loc>${article.coverImage}</image:loc>
      <image:title><![CDATA[${article.title}]]></image:title>
      <image:caption><![CDATA[${article.coverAlt || article.introDirectAnswer}]]></image:caption>
    </image:image>` : '';

    return `  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>${imageSnippet}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPagesXml}
${articlePagesXml}
</urlset>`.trim();
}

/**
 * Dynamically inject or update JSON-LD Schema and meta tags in client DOM <head>
 */
export function injectJsonLdInDOM(article: Article) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = `${article.title} | ${brandConfig.name}`;

  // Canonical tag
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.rel = 'canonical';
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.href = `${brandConfig.baseUrl}/articles/${article.slug}`;

  // Meta Description
  let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = 'description';
    document.head.appendChild(descMeta);
  }
  descMeta.content = article.introDirectAnswer || article.title;

  // Meta Robots
  let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  // OpenGraph Meta Tags
  let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
  if (ogTitle) ogTitle.content = article.title;
  let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
  if (ogDesc) ogDesc.content = article.introDirectAnswer;
  let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
  if (ogImage) ogImage.content = article.coverImage;

  // JSON-LD Schema Injection
  const schema = generateArticleSchema(article);
  const scriptId = 'json-ld-article-schema';
  let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = scriptId;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  scriptTag.textContent = JSON.stringify(schema, null, 2);

  // Geo Location Tags
  let geoPosTag = document.querySelector('meta[name="geo.position"]') as HTMLMetaElement;
  if (!geoPosTag) {
    geoPosTag = document.createElement('meta');
    geoPosTag.name = 'geo.position';
    document.head.appendChild(geoPosTag);
  }
  geoPosTag.content = `${brandConfig.location.coordinates.latitude};${brandConfig.location.coordinates.longitude}`;

  let geoPlaceTag = document.querySelector('meta[name="geo.placename"]') as HTMLMetaElement;
  if (!geoPlaceTag) {
    geoPlaceTag = document.createElement('meta');
    geoPlaceTag.name = 'geo.placename';
    document.head.appendChild(geoPlaceTag);
  }
  geoPlaceTag.content = brandConfig.location.city;
}
