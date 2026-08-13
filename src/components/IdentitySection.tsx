import React from 'react';
import { BRAND_COLORS, METHODOLOGY_STEPS, TONE_OF_VOICE_GUIDELINES, BRAND_LOCATION } from '../data/identityData';
import { Palette, CheckCircle, ShieldCheck, Sparkles, Layers, Type, MessageSquareCode, MapPin, Compass, Code, Globe2 } from 'lucide-react';

export const IdentitySection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Title & Introduction */}
      <div className="bg-[#0F172A] text-white p-8 rounded-3xl shadow-lg border border-slate-800">
        <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm mb-2">
          <Sparkles className="w-5 h-5" />
          <span>الدليل المرجعي للهوية المعتمدة</span>
        </div>
        <h1 className="text-3xl font-extrabold font-tajawal mb-3">
          الهوية البصرية والمنهجية المعتمدة لـ «إسماعيل الساعدي»
        </h1>
        <p className="text-slate-300 text-sm font-cairo leading-relaxed max-w-3xl">
          هوية ثابتة، تصاميم نظيفة، ونبرة متخصصة تركز بشكل مطلق على تقديم <strong>Impact</strong> و <strong>Value Added</strong> حقيقي للعميل في مجالات البرمجة، اليوميات، الإعلانات، والخدمات.
        </p>
      </div>

      {/* 0. Location & Geographic Coordinates Card (Taif) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-[#059669] rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">الموقع الجغرافي والإحداثيات (المقر الرئيسي)</h2>
            <p className="text-xs text-slate-500 font-cairo">مضمنة برمجيًا في كود المصدر (Source Code) وفي خطة محركات البحث وSchema</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm">
              <Globe2 className="w-4 h-4 text-[#059669]" />
              <span>المدينة والمنطقة:</span>
            </div>
            <p className="text-base font-extrabold text-[#059669] font-tajawal">
              {BRAND_LOCATION.city}، {BRAND_LOCATION.country}
            </p>
            <p className="text-xs text-slate-500 font-cairo">
              {BRAND_LOCATION.address}
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm">
              <Compass className="w-4 h-4 text-[#059669]" />
              <span>الإحداثيات الدقيقة (Geo Coordinates):</span>
            </div>
            <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl font-bold text-center">
              {BRAND_LOCATION.coordinates.formatted}
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Latitude: {BRAND_LOCATION.coordinates.latitude} | Longitude: {BRAND_LOCATION.coordinates.longitude}
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm">
              <Code className="w-4 h-4 text-[#059669]" />
              <span>التضمين التقني المباشر:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-cairo">
              مضمنة مباشرة في ملفات الكود <code>src/lib/brandConfig.ts</code> و <code>src/lib/seo.ts</code> وسيرفر الخادم <code>server.ts</code> لتغذية Google Maps و Schema الجغرافية.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Visual Identity Colors */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-[#059669] rounded-xl">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">1. وصف الهوية البصرية الثابتة</h2>
            <p className="text-xs text-slate-500 font-cairo">تجمّع بين الفخامة الداكنة (#0F172A) والحيوية الموثوقة للأخضر الزمردي (#059669)</p>
          </div>
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_COLORS.map((color) => (
            <div key={color.name} className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/50">
              <div className={`h-16 w-full rounded-xl ${color.bgClass} flex items-center justify-center text-white font-bold text-sm shadow-inner border border-black/10`}>
                {color.hex}
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-tajawal">{color.name}</h3>
                <p className="text-xs text-slate-600 font-cairo mt-1 leading-normal">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Typography & Layout Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm">
              <Type className="w-4 h-4 text-[#059669]" />
              <span>الخطوط الرسمية:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Tajawal:</strong> للعناوين الرئيسية والفرعية (Bold).<br />
              <strong>Cairo:</strong> لنصوص فقرات المقالات والقوائم المريحة للقراءة الطويلة (Regular).
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] text-sm">
              <Layers className="w-4 h-4 text-[#059669]" />
              <span>مبادئ التنسيق والتصميم:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              تصميم بسيط ونظيف، مساحات بيضاء متوازنة، حواف ملائمة (Rounded Radius)، وتباين كافٍ يضمن سهولة القراءة على الهواتف والشاشات الكبيرة.
            </p>
          </div>
        </div>

      </div>

      {/* 2. Tone of Voice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
            <MessageSquareCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">2. أسلوب ونبرة المحتوى (Tone of Voice)</h2>
            <p className="text-xs text-slate-500 font-cairo">واضح، مباشر، عملي، مدعوم بأرقام وأمثلة، بدون حشو، بلهجة سعودية فصحى مبسطة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TONE_OF_VOICE_GUIDELINES.map((guide, idx) => (
            <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
              <span>{guide}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Article Methodology (8 Fixed Steps) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-[#059669] rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">3. منهجية كتابة المقالات المعتمدة (8 خطوات إلزامية)</h2>
            <p className="text-xs text-slate-500 font-cairo">كل مقال يصدر باسم «إسماعيل الساعدي» يجب أن يلتزم بالخطوات الثمانية بالترتيب</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {METHODOLOGY_STEPS.map((m) => (
            <div key={m.step} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-[#059669] flex items-center justify-center font-extrabold text-sm shrink-0 font-tajawal border border-slate-700">
                {m.step}
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-tajawal">{m.title}</h3>
                <p className="text-xs text-slate-600 font-cairo mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
