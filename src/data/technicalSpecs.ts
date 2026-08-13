import { TechnicalCheckitem } from '../types';

export const RSS_SPECIFICATION_INFO = {
  title: 'خلاصة RSS 2.0 مع وسم Content XML المتقدم',
  description: 'توجيهات البرمجة والتهيئة لإنشاء وتفعيل خلاصة RSS ديناميكية متوافقة تماماً مع جميع قراء الأخبار ومحركات البحث وعوامل أتمتة المحتوى.',
  url: '/rss.xml',
  contentType: 'application/rss+xml; charset=UTF-8',
  exampleXml: `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2000/svg"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>إسماعيل الساعدي | مقالات برمجية وحلول تقنية</title>
    <link>https://esmail-alsaadi.com</link>
    <description>حلول عملية ودراسات حالة بالأرقام في البرمجة، اليوميات، الإعلانات والخدمات.</description>
    <language>ar-sa</language>
    <copyright>جميع الحقوق محفوظة منصة إسماعيل الساعدي 2026</copyright>
    <lastBuildDate>Wed, 12 Aug 2026 17:00:00 +0300</lastBuildDate>
    <atom:link href="https://esmail-alsaadi.com/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>https://esmail-alsaadi.com/icon.png</url>
      <title>إسماعيل الساعدي</title>
      <link>https://esmail-alsaadi.com</link>
    </image>
    <item>
      <title>كيف قلّلت زمن استجابة الـ API بنسبة 65% في تطبيق تجاري؟</title>
      <link>https://esmail-alsaadi.com/articles/api-latency-reduction-case-study</link>
      <guid isPermaLink="true">https://esmail-alsaadi.com/articles/api-latency-reduction-case-study</guid>
      <pubDate>Mon, 10 Aug 2026 10:00:00 +0300</pubDate>
      <dc:creator>إسماعيل الساعدي</dc:creator>
      <category>برمجة</category>
      <description>دراسة حالة عملية لتقليل زمن استجابة API من 850ms إلى 290ms باستخدام Firestore Composite Indexing و Redis Caching.</description>
      <content:encoded><![CDATA[ ... نص المقال الكامل ... ]]></content:encoded>
    </item>
  </channel>
</rss>`
};

export const GOOGLE_SEARCH_RECOMMENDATIONS: TechnicalCheckitem[] = [
  {
    title: 'خريطة الموقع XML (Sitemap.xml)',
    description: 'إنشاء خريطة ديناميكية تضم جميع روابط المقالات المقسمة حسب الأهمية وتاريخ التحديث lastmod بإنساق ISO والتوقيت الرسمي لتكشيف عناكب قوقل.',
    codeSnippet: `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://esmail-alsaadi.com/articles/api-latency-reduction-case-study</loc>
    <lastmod>2026-08-12T17:00:00+03:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`,
    status: 'جاهز'
  },
  {
    title: 'فهرسة سريعة عبر Google Indexing API',
    description: 'ربط السيرفر مباشرة مع Google Indexing API لإرسال إشعار فوري لغوغل بمجرد إضافة مقال جديد أو تحديث مقال قديم خلال ثوانٍ.',
    codeSnippet: `// Node.js server-side fast index dispatch
import { google } from 'googleapis';
const indexing = google.indexing('v3');
await indexing.urlNotifications.publish({
  requestBody: {
    url: 'https://esmail-alsaadi.com/articles/new-slug',
    type: 'URL_UPDATED'
  }
});`,
    status: 'جاهز'
  },
  {
    title: 'خوارزمية ترتيب وترتيب المقالات التلقائي (Article Score)',
    description: 'معادلة برمجية داخلية لترتيب المقالات وتحديد أولوية ظهورها بناءً على التقييم، نسبة التعليقات، الجودة، ووصول محركات البحث.',
    codeSnippet: `Article Score = (التقييم × 0.30) + (نسبة التعليقات × 0.25) + (درجة الجودة × 0.25) + (درجة الوصول لمحركات البحث × 0.20)`,
    status: 'جاهز'
  },
  {
    title: 'ملف robots.txt المفتوح للفهرسة والذكاء الاصطناعي',
    description: 'سيرفر حقيقي يوفر robots.txt يستقبل Googlebot و GPTBot و ClaudeBot و PerplexityBot بدون قيود.',
    codeSnippet: `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://esmail-alsaadi.com/sitemap.xml
RSS: https://esmail-alsaadi.com/rss.xml`,
    status: 'جاهز'
  }
];

export const AI_OPTIMIZATION_RECOMMENDATIONS: TechnicalCheckitem[] = [
  {
    title: 'هيكلة الإجابة المباشرة (Direct Answer Hook)',
    description: 'استخدام فقرة ملخصة صريحة في بداية كل مقال تجيب مباشرة عن السؤال الرئيسي، لتسهيل عملية الاقتباس في نماذج الذكاء الاصطناعي مثل Gemini و ChatGPT و Perplexity.',
    status: 'جاهز'
  },
  {
    title: 'دعم Schema JSON-LD المعززة (Article + FAQPage + Person)',
    description: 'إرفاق بيانات JSON-LD كاملة تزود الذكاء الاصطناعي باسم الكاتب "إسماعيل الساعدي"، هويته المنظمة، والأسئلة الشائعة ذات الإجابات المعتمدة.',
    status: 'جاهز'
  },
  {
    title: 'جداول المخرجات والأرقام الصريحة (Tables & Metrics)',
    description: 'نماذج LLM تفضل استخراج البيانات والجداول المنظمة ذات المقارنات الصريحة (قبل/بعد) للاقتباس كدراسات حالة موثوقة.',
    status: 'جاهز'
  },
  {
    title: 'مؤشرات E-E-A-T (الخبرة، التجربة، السلطة، الموثوقية)',
    description: 'تضمين بطاقة الكاتب المعرفية، الروابط المرجعية، ونماذج الكود الحقيقية لتجنب تصنيف المحتوى كـ "محتوى ذكاء اصطناعي مكرر".',
    status: 'جاهز'
  }
];

export const FIREBASE_SPECS = {
  dbEngine: 'Google Firestore (Cloud Firestore)',
  mode: 'Realtime Document Listening (onSnapshot) with High Performance Caching',
  collections: [
    { name: 'articles', description: 'تخزين المقالات مع العنوان، الكلمة المفتاحية، الوسوم، المحتوى، ودراسات الحالة' },
    { name: 'analytics', description: 'تسجيل المشاهدات والإعجابات والتفاعلات لكل مقال في الوقت الفعلي' },
    { name: 'users', description: 'إدارة بيانات المستخدمين وصلاحيات الكتابة والتعديل' }
  ]
};
