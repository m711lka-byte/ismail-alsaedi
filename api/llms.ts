import { brandConfig } from '../src/lib/brandConfig';

export default function handler(req: any, res: any) {
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
}
