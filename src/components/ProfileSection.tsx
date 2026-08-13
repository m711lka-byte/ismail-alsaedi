import React, { useState } from 'react';
import { ISMAIL_PROFILE_DATA, BRAND_LOCATION } from '../data/identityData';
import { generatePersonKnowledgeGraph } from '../lib/seo';
import { 
  UserCheck, 
  MapPin, 
  MessageSquare, 
  ShoppingBag, 
  Globe, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Code, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Bot, 
  Network, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const p = ISMAIL_PROFILE_DATA;
  const personGraph = generatePersonKnowledgeGraph();
  const graphJsonString = JSON.stringify(personGraph, null, 2);

  const handleCopyGraph = () => {
    navigator.clipboard.writeText(graphJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* 1. Main Profile Hero Card */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right">
          
          {/* Avatar / Badge */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-1 shadow-2xl">
              <img 
                src={p.avatar} 
                alt={p.name}
                className="w-full h-full object-cover rounded-xl border-2 border-slate-900"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border-2 border-slate-900 flex items-center gap-1 shadow">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              متاح للاستشارات
            </div>
          </div>

          {/* Name & Titles */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-tajawal text-white tracking-tight">
                {p.name}
              </h1>
              <span className="text-xs text-slate-400 font-mono">({p.englishName})</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] px-3 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                هوية موثقة (AI Knowledge Graph)
              </span>
            </div>

            <p className="text-emerald-400 font-bold text-sm sm:text-base font-tajawal">
              {p.jobTitle}
            </p>

            {/* Location Tag */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-slate-300 font-cairo">
              <span className="bg-slate-800/90 text-slate-200 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                المقر الرئيسي: <strong>{p.city} / {p.secondaryCity}</strong>
              </span>
              <span className="bg-slate-800/90 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                {p.country} ({BRAND_LOCATION.coordinates.formatted})
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-cairo pt-2 border-t border-slate-800">
              {p.bio}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Direct Social Accounts & Contact Buttons Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-[#059669] rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">حسابات التواصل والقنوات المباشرة</h2>
              <p className="text-xs text-slate-500 font-cairo">مرتبطة برمجياً في الـ Knowledge Graph لسهولة الوصول والفهرسة الذكية</p>
            </div>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* WhatsApp Direct */}
          <a 
            href={p.whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100/80 rounded-2xl border border-emerald-200 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-950 text-sm font-tajawal flex items-center gap-1">
                  محادثة واتساب مباشرة
                </h3>
                <p className="text-[11px] text-emerald-700 font-cairo">+966 55 895 3588</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-700 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* TikTok */}
          <a 
            href={p.tiktokUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-rose-50/60 hover:bg-rose-100/80 rounded-2xl border border-rose-200 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold shadow">
                <Sparkles className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-tajawal">حساب تيك توك (TikTok)</h3>
                <p className="text-[11px] text-rose-700 font-cairo">@ismailalsaedy</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-rose-600 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* Instagram */}
          <a 
            href={p.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-pink-50/60 hover:bg-pink-100/80 rounded-2xl border border-pink-200 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold shadow">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-pink-950 text-sm font-tajawal">حساب انستقرام (Instagram)</h3>
                <p className="text-[11px] text-pink-700 font-cairo">@ismailalsaedy</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-pink-600 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* Haraj Profile */}
          <a 
            href={p.harajUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100/80 rounded-2xl border border-amber-200 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-amber-950 text-sm font-tajawal flex items-center gap-1">
                  صفحة حراج الموثقة
                </h3>
                <p className="text-[11px] text-amber-700 font-cairo">خدمات ميدانية وتجارة إلكترونية</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-700 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* Twitter / X */}
          <a 
            href={p.twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                <Twitter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-tajawal">حساب X (منصة تويتر)</h3>
                <p className="text-[11px] text-slate-500 font-cairo">@ismailalsaedy</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* YouTube */}
          <a 
            href={p.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-red-50/60 hover:bg-red-100/80 rounded-2xl border border-red-200 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-red-950 text-sm font-tajawal">قناة يوتيوب (YouTube)</h3>
                <p className="text-[11px] text-red-700 font-cairo">@ismailalsaedy</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-red-600 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* LinkedIn */}
          <a 
            href={p.linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-blue-50/60 hover:bg-blue-100/80 rounded-2xl border border-blue-200 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-blue-950 text-sm font-tajawal">حساب LinkedIn</h3>
                <p className="text-[11px] text-blue-700 font-cairo">ismailalsaedy</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-600 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* GitHub */}
          <a 
            href={p.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm font-tajawal">مستودعات GitHub</h3>
                <p className="text-[11px] text-slate-500 font-cairo">ismailalsaedy</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* Email */}
          <a 
            href={`mailto:${p.email}`}
            className="group flex items-center justify-between p-4 bg-purple-50/60 hover:bg-purple-100/80 rounded-2xl border border-purple-200 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-purple-950 text-sm font-tajawal">البريد الإلكتروني</h3>
                <p className="text-[11px] text-purple-700 font-cairo">{p.email}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-purple-600 group-hover:translate-x-[-2px] transition-transform" />
          </a>

        </div>
      </div>

      {/* 3. Specialties & Services Offered Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-[#059669] rounded-xl">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal">التخصصات والخدمات الميدانية والتقنية</h2>
            <p className="text-xs text-slate-500 font-cairo">مجالات الخبرة المعتمدة لدى إسماعيل الساعدي</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {p.specialties.map((spec, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-tajawal leading-relaxed">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. AI Knowledge Graph Engine (@graph Schema.org JSON-LD) */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-tajawal flex items-center gap-2">
                <span>AI Person Knowledge Graph Engine</span>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Schema.org @graph
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-cairo">
                بيانات مهيكلة ومترابطة بالكامل لتسهيل فهم وتكشيف شخصية إسماعيل الساعدي لدى محركات AI (ChatGPT, Claude, Perplexity, Gemini)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyGraph}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#059669] hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم نسخ كود الـ Graph!' : 'نسخ كود الـ JSON-LD'}</span>
            </button>
            <a
              href="/api/profile/schema.json"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>رابط الـ API</span>
            </a>
          </div>
        </div>

        {/* Code Box */}
        <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs text-emerald-300 max-h-96 overflow-y-auto no-scrollbar">
          <pre className="whitespace-pre-wrap leading-relaxed">{graphJsonString}</pre>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
          <p className="font-bold text-emerald-400 flex items-center gap-1.5">
            <Network className="w-4 h-4" />
            الربط الشبكي الكامل (Entity Relationships):
          </p>
          <p className="text-slate-400 leading-relaxed">
            تم ربط الكيان <code>#person</code> (إسماعيل الساعدي) بالصفحة <code>#profile</code> والمؤسسة <code>#organization</code> وقنوات الاتصال <code>#whatsapp</code> و <code>#haraj-services</code> في شجرة بيانات Schema واحدة متكاملة تجعل الذكاء الاصطناعي يعتبر الكيان مرجعاً جغرافياً ومهنياً موثوقاً في الطائف والمدينة المنورة بالمملكة العربية السعودية.
          </p>
        </div>
      </div>

    </div>
  );
};
