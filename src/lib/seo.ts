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
        "@id": `${baseUrl}/#profile`,
        "url": baseUrl,
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
        "image": p.avatar,
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
</rss>`.trim();
}

/**
 * Generate Sitemap XML dynamically from an array of articles
 */
export function generateSitemap(articles: Article[], baseUrl = brandConfig.baseUrl): string {
  const urlsXml = articles.map(article => {
    const rawDate = article.updatedDate || article.publishDate || '2026-08-12';
    const isoDate = rawDate.includes('T') ? rawDate : `${rawDate}T17:00:00+03:00`;
    return `  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}T17:00:00+03:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${urlsXml}
</urlset>`.trim();
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
