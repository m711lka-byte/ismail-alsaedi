import React, { useState } from 'react';
import { 
  RSS_SPECIFICATION_INFO, 
  GOOGLE_SEARCH_RECOMMENDATIONS, 
  AI_OPTIMIZATION_RECOMMENDATIONS, 
  FIREBASE_SPECS 
} from '../data/technicalSpecs';
import { 
  Rss, 
  Search, 
  Cpu, 
  Database, 
  Copy, 
  Check, 
  CheckCircle2, 
  Zap, 
  Globe, 
  FileCode2,
  Lock,
  Radio
} from 'lucide-react';

export const TechnicalSpecsSection: React.FC = () => {
  const [copiedRssXml, setCopiedRssXml] = useState(false);

  const copyRssXml = () => {
    navigator.clipboard.writeText(RSS_SPECIFICATION_INFO.exampleXml);
    setCopiedRssXml(true);
    setTimeout(() => setCopiedRssXml(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Banner Header */}
      <div className="bg-[#0F172A] text-white p-8 rounded-3xl shadow-lg border border-slate-800">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
          <Zap className="w-4 h-4" />
          <span>البنية التحتية البرمجية للـ SEO والـ RSS والذكاء الاصطناعي</span>
        </div>
        <h1 className="text-3xl font-extrabold font-tajawal mb-2">
          التوصيات التقنية المضمنة مباشرة في كود المصدر (Source Code)
        </h1>
        <p className="text-slate-300 text-sm font-cairo leading-relaxed">
          جميع التوصيات متضمنة برمجيًا عبر سيرفر Express في <code>server.ts</code> ومكتبة SEO في <code>src/lib/seo.ts</code> مع دعم كامل لإحداثيات مدينة الطائف، التكشيف السريع، والربط الفوري مع محركات البحث و AI Overviews.
        </p>
      </div>

      {/* 1. Database Infrastructure - Firebase Firestore */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">1. هيلكة قاعدة البيانات (Firebase Firestore)</h2>
            <p className="text-xs text-slate-500 font-cairo">تخزين البيانات وتحديثها في الوقت الفعلي (Real-time Sync) بأداء عالٍ جداً</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FIREBASE_SPECS.collections.map((col) => (
            <div key={col.name} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm">
                <FileCode2 className="w-4 h-4 text-[#059669]" />
                <span>مجموعة: <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-xs">{col.name}</code></span>
              </div>
              <p className="text-xs text-slate-600 font-cairo leading-relaxed">{col.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-950 text-emerald-100 p-4 rounded-2xl text-xs flex items-center justify-between border border-emerald-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>الحالة الحالية: <strong>Firestore Real-time Observer نشط تلقائياً</strong></span>
          </div>
          <span className="bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded font-bold">زمن الاستجابة: &lt; 50ms</span>
        </div>
      </div>

      {/* 2. RSS Feed Implementation */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
              <Rss className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">2. تفعيل خلاصة RSS 2.0 القياسية</h2>
              <p className="text-xs text-slate-500 font-cairo">توليد RSS Feed تلقائي مع دعمه لعناصر \`content:encoded\` لاستيراد المقالات كاملاً</p>
            </div>
          </div>

          <button
            onClick={copyRssXml}
            className="flex items-center gap-1.5 bg-[#059669] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
          >
            {copiedRssXml ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedRssXml ? 'تم النسخ!' : 'نسخ هيكل RSS الكامل'}</span>
          </button>
        </div>

        <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-xs overflow-x-auto">
          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 leading-relaxed whitespace-pre-wrap">
            {RSS_SPECIFICATION_INFO.exampleXml}
          </pre>
        </div>
      </div>

      {/* 3. Google Search Console & Fast Indexing */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">3. ربط Google Search والتكشيف السريع</h2>
            <p className="text-xs text-slate-500 font-cairo">خطوات الأتمتة لضمان أرشفة المقال في Google فور النشر</p>
          </div>
        </div>

        <div className="space-y-4">
          {GOOGLE_SEARCH_RECOMMENDATIONS.map((item, idx) => (
            <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#0F172A] text-sm font-tajawal flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>{item.title}</span>
                </h3>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                  item.status === 'جاهز' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-cairo leading-relaxed">{item.description}</p>
              {item.codeSnippet && (
                <div className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-emerald-300 overflow-x-auto">
                  <pre>{item.codeSnippet}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. AI Overviews & LLM Readiness */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-[#059669] rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">4. إعداد المحتوى ليكون صديقاً للذكاء الاصطناعي (AI-Friendly)</h2>
            <p className="text-xs text-slate-500 font-cairo">كيف تعزز ظهور مقالات «إسماعيل الساعدي» في نتائج Gemini و ChatGPT و Perplexity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_OPTIMIZATION_RECOMMENDATIONS.map((rec, rIdx) => (
            <div key={rIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h3 className="font-bold text-[#0F172A] text-sm font-tajawal flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>{rec.title}</span>
              </h3>
              <p className="text-xs text-slate-600 font-cairo leading-relaxed">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
