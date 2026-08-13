import { BrandColor } from '../types';

export const BRAND_NAME = 'إسماعيل الساعدي';
export const BRAND_TAGLINE = 'حلول برمجية • يوميات ميدانية • إعلانات موجهة • خدمات استشارية';
export const BRAND_BIO = 'منصة مقالات وحلول تقنية احترافية توفر Impact و Value Added حقيقي من واقع التجارب والأرقام الموثقة.';

export const BRAND_LOCATION = {
  city: 'الطائف',
  country: 'المملكة العربية السعودية',
  address: 'الطائف، منطقة مكة المكرمة، المملكة العربية السعودية',
  coordinates: {
    latitude: 21.2854,
    longitude: 40.4244,
    formatted: '21.2854° N, 40.4244° E'
  },
  postalCode: '26511',
  region: 'SA-02'
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
