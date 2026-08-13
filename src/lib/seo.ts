import { Article } from '../types';
import { brandConfig } from './brandConfig';

/**
 * Generate full JSON-LD Schema including BlogPosting, FAQPage, Person, Place, and Organization with Taif coordinates.
 */
export function generateArticleSchema(article: Article, baseUrl = brandConfig.baseUrl) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${baseUrl}/articles/${article.slug}#article`,
        "headline": article.title,
        "description": article.introDirectAnswer,
        "inLanguage": "ar-SA",
        "datePublished": article.publishDate,
        "dateModified": article.updatedDate || article.publishDate,
        "image": article.coverImage,
        "mainEntityOfPage": `${baseUrl}/articles/${article.slug}`,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "jobTitle": article.author.role,
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
        "publisher": brandConfig.publisher,
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
      },
      {
        "@type": "FAQPage",
        "mainEntity": (article.faqs || []).map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };
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
</rss>`;
}

/**
 * Generate Sitemap XML dynamically from an array of articles
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemap(
  articles: Article[],
  baseUrl = brandConfig.baseUrl
): string {
  const urlsXml = articles
    .map((article) => {
      const url = `${baseUrl}/articles/${article.slug}`;

      const date = article.updatedDate || article.publishDate;

      const lastmod = date
        ? new Date(date).toISOString()
        : new Date().toISOString();

      return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(baseUrl)}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
${urlsXml}
</urlset>`;
}
/**
 * Dynamically inject or update JSON-LD Schema in the client DOM <head>
 */
export function injectJsonLdInDOM(article: Article) {
  if (typeof document === 'undefined') return;

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

  // Update meta location tags
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
