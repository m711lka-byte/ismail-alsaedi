import { BrandColor } from '../types';

export const BRAND_NAME = 'إسماعيل الساعدي';
export const BRAND_TAGLINE = 'حلول برمجية • يوميات ميدانية • إعلانات موجهة • خدمات استشارية';
export const BRAND_BIO = 'منصة مقالات وحلول تقنية احترافية توفر Impact و Value Added حقيقي من واقع التجارب والأرقام الموثقة.';

export const BRAND_LOCATION = {
  city: 'الطائف',
  secondaryCity: 'المدينة المنورة',
  country: 'المملكة العربية السعودية',
  address: 'الطائف / المدينة المنورة، منطقة مكة المكرمة، المملكة العربية السعودية',
  coordinates: {
    latitude: 21.2854,
    longitude: 40.4244,
    formatted: '21.2854° N, 40.4244° E'
  },
  postalCode: '26511',
  region: 'SA-02'
};

export const ISMAIL_PROFILE_DATA = {
  name: 'إسماعيل الساعدي',
  englishName: 'Ismail Al-Saedi',
  jobTitle: 'مستشار تقني ومطور خبير • مهندس حلول سحابية وبرمجية',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  city: BRAND_LOCATION.city,
  secondaryCity: BRAND_LOCATION.secondaryCity,
  country: BRAND_LOCATION.country,
  fullAddress: BRAND_LOCATION.address,
  phone: '+966558953588',
  whatsappUrl: 'https://wa.me/966558953588?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A5%D8%B3%D9%85%D8%A7%D8%B9%D9%8A%D9%84%20%D8%A7%D9%84%D8%B3%D8%A7%D8%B9%D8%AF%D9%8A%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%A7%D9%84%D8%AD%D9%84%D9%88%D9%84%20%D8%A7%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9',
  harajUrl: 'https://haraj.com.sa/users/%D8%A5%D8%B3%D9%85%D8%A7%D8%B9%D9%8A%D9%84%20%D8%A7%D9%84%D8%B3%D8%A7%D8%B9%D8%AF%D9%8A',
  twitterUrl: 'https://x.com/ismailalsaedy',
  tiktokUrl: 'https://tiktok.com/@ismailalsaedy',
  instagramUrl: 'https://instagram.com/ismailalsaedy',
  linkedinUrl: 'https://linkedin.com/in/ismailalsaedy',
  githubUrl: 'https://github.com/ismailalsaedy',
  youtubeUrl: 'https://youtube.com/@ismailalsaedy',
  email: 'm711lka@gmail.com',
  website: 'https://ismail-alsaedi.vercel.app',
  bio: 'إسماعيل الساعدي، خبير ومستشار تقني ومطور أنظمة سعودي متخصص في بناء المنصات السحابية، تطوير تطبيقات الجوال، تصميم البنية التحتية، إدارة الحملات الإعلانية الموجهة وتحسين تكلفة الاستحواذ (CAC)، بالإضافة إلى تقديم الخدمات الميدانية والاستشارات المباشرة لحراج والشركات في الطائف والمدينة المنورة وكافة مناطق المملكة.',
  specialties: [
    'تطوير البرمجيات والأنظمة المخصصة (Full-Stack Software Development)',
    'استشارات اختيار الشريك التقني وتقييم البنية التحتية',
    'إدارة الإعلانات الرقمية وتحسين تكلفة الاستحواذ (CAC Optimization)',
    'خدمات حراج الميدانية والاستشارات المباشرة للعملاء والمؤسسات',
    'تهيئة محركات البحث المتقدمة والربط المباشر مع AI Knowledge Graph',
    'حلول قواعد البيانات السحابية (Firebase Firestore & Cloud SQL)'
  ],
  knowsAbout: [
    'Software Architecture & Cloud Solutions',
    'Full-Stack Web & Mobile Development',
    'Search Engine Optimization (SEO & Schema.org Graph)',
    'Digital Advertising & Customer Acquisition Cost (CAC)',
    'Haraj Marketplace Consulting & Field Services',
    'Saudi E-Commerce & Business Systems',
    'AI Overviews & LLM Knowledge Graphs',
    'Firebase Firestore & Real-Time Sync'
  ],
  services: [
    { title: 'برمجة وتطوير المنصات', desc: 'بناء تطبيقات ويب وجوال سريعة وآمنة ومصممة بأحدث التقنيات.' },
    { title: 'استشارات حراج والميدان', desc: 'تنسيق وإشراف ميداني على الخدمات والصفقات التجارية عبر حراج.' },
    { title: 'تحسين تكلفة الإعلانات (CAC)', desc: 'تحليل الأرقام وضمان أعلى عائد استثماري للزيارات والمبيعات.' },
    { title: 'الاستشارات التقنية المباشرة', desc: 'تقييم الأكواد المصدري، اختيار التجهيزات، وإدارة الفرق البرمجية.' }
  ]
};

export const BRAND_COLORS: BrandColor[] = [
  {
    name: 'الأساسي (Dark Navy)',
    hex: '#0F172A',
    usage: 'العناوين الرئيسية، الهيدر، البطاقات الرئيسية، والنصوص العالية التباين',
    bgClass: 'bg-[#0F172A]',
    textClass: 'text-[#0F172A]',
    borderClass: 'border-[#0F172A]'
  },
  {
    name: 'الثانوي (Emerald Green)',
    hex: '#059669',
    usage: 'أزرار CTA، الأرقام والتأثير الملموس (Impact)، التظليل، الروابط والشارات',
    bgClass: 'bg-[#059669]',
    textClass: 'text-[#059669]',
    borderClass: 'border-[#059669]'
  },
  {
    name: 'الخلفية (Crisp White & Slate Light)',
    hex: '#FFFFFF / #F8FAFC',
    usage: 'خلفيات الصفحة والمقالات المريحة للعين للقراءة الطويلة بدون إجهاد',
    bgClass: 'bg-[#F8FAFC]',
    textClass: 'text-[#F8FAFC]',
    borderClass: 'border-[#E2E8F0]'
  },
  {
    name: 'النصوص (Slate Gray)',
    hex: '#1E293B',
    usage: 'نصوص الفقرات والمحتوى العام للحصول على درجة قراءة مريحة جداً (AA High Contrast)',
    bgClass: 'bg-[#1E293B]',
    textClass: 'text-[#1E293B]',
    borderClass: 'border-[#CBD5E1]'
  }
];

export const METHODOLOGY_STEPS = [
  { step: 1, title: 'عنوان قوي يحتوي الكلمة المفتاحية', desc: 'عنوان صريح يحدد الفائدة والنتيجة المتوقعة بدون غموض أو إثارة مضللة.' },
  { step: 2, title: 'مقدمة تجيب مباشرة على السؤال', desc: 'الإجابة المباشرة (Direct Answer) للحل فوراً لتغذية Google AI Overviews وSnippet.' },
  { step: 3, title: 'تقسيم واضح بـ H2 و H3', desc: 'هيكلة القراءة والتنقل مع عناوين فرعية مرتبة أبجدياً وعاطفياً.' },
  { step: 4, title: 'جداول وقوائم منظمة', desc: 'استخدام المقارنات السريعة والجداول لتوفير جهد القارئ في التحليل.' },
  { step: 5, title: 'أمثلة عملية أو Case Study قصيرة', desc: 'عرض دراسة حالة حقيقية بالأرقام والخطوات لتأكيد المصداقية E-E-A-T.' },
  { step: 6, title: 'Impact و Value Added واضح', desc: 'إبراز الأثر المادي، البرمجي، أو الزمني الذي سيكسبه القارئ فور التطبيق.' },
  { step: 7, title: 'خلاصة وتوصية عملية قابلة للتنفيذ', desc: 'نقاط حاسمة يستطيع المطور أو رائد الأعمال تطبيقها اليوم.' },
  { step: 8, title: 'قسم FAQ في النهاية', desc: 'أسئلة وأجوبة شائعة من الميدان مهيكلة بـ FAQPage Schema.' }
];

export const TONE_OF_VOICE_GUIDELINES = [
  'نبرة هادئة، واثقة، متخصصة، وعملية.',
  'الاعتماد على الأرقام والنتائج القابلة للقياس والابتعاد عن الإنشائيات.',
  'اللغة: لهجة سعودية فصحى مبسطة تجمع بين السلاسة والدقة المفهومية.',
  'التركيز الدائم على تقديم قيمة مضافة (Value Added) تجعل المقال مرجعاً دائماً.'
];
