import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  MapPin,
  Briefcase,
  UserPlus,
  CheckCircle2,
  ExternalLink,
  Code2,
  Flame,
  Megaphone,
  Sparkles,
  ShieldCheck,
  FileText,
  X,
  Clock,
  Building2,
  Users,
  Globe,
  ChevronLeft
} from 'lucide-react';
import { ISMAIL_PROFILE_DATA, BRAND_LOCATION } from '../data/identityData';

const TwitterIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
  </svg>
);

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface FooterProps {
  onNavigateTab?: (tab: 'articles' | 'profile' | 'identity' | 'template' | 'tech' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  // Modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCareersModal, setShowCareersModal] = useState(false);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    serviceType: 'استشارة تقنية',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Careers Form State
  const [careersForm, setCareersForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'مطور Full-Stack (React/Node)',
    experience: '3-5 سنوات',
    portfolioUrl: '',
    notes: ''
  });
  const [careersSubmitted, setCareersSubmitted] = useState(false);

  const availableJobs = [
    {
      id: 'dev',
      title: 'مطور أنظمة وسحابية (Full-Stack Developer)',
      type: 'تعاون حر / عن بُعد',
      location: 'الرياض / الطائف / عن بُعد',
      desc: 'بناء وتطوير واجهات React وسيرفرات Node.js وقواعد بيانات Firebase/SQL.'
    },
    {
      id: 'ads',
      title: 'متخصص إعلانات رقمية وتحسين تكلفة الاستحواذ (CAC)',
      type: 'دوام جزئي / عقد مشاريع',
      location: 'عن بُعد',
      desc: 'إدارة وتتبع حملات Snapchat & TikTok وتحليل أرقام الأداء والعائد على الاستثمار.'
    },
    {
      id: 'field',
      title: 'ممثل ميداني واستشارات حراج والصفقات',
      type: 'ميداني / حسب المشروع',
      location: 'الطائف / المدينة المنورة',
      desc: 'التنسيق والرد الميداني والإشراف على الخدمات التجارية والحلول التقنية المباشرة.'
    },
    {
      id: 'seo',
      title: 'صانع محتوى تقني وخبير SEO & Schema',
      type: 'عن بُعد / دوام مرن',
      location: 'عن بُعد',
      desc: 'كتابة المقالات التقنية المعيارية طبقاً لـ E-E-A-T وإعداد التوثيق البرمجي.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    // Prepare direct whatsapp text if user wants
    const text = `مرحباً أستاذ إسماعيل الساعدي%0Aالاسم: ${encodeURIComponent(contactForm.name)}%0Aالجوال: ${encodeURIComponent(contactForm.phone)}%0Aنوع الطلب: ${encodeURIComponent(contactForm.serviceType)}%0Aالتفاصيل: ${encodeURIComponent(contactForm.message)}`;
    setTimeout(() => {
      window.open(`https://wa.me/966558953588?text=${text}`, '_blank');
    }, 1200);
  };

  const handleCareersSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCareersSubmitted(true);
    const text = `طلب انضمام لفرص العمل والتعاون%0Aالاسم: ${encodeURIComponent(careersForm.name)}%0Aالمسمى المستهدف: ${encodeURIComponent(careersForm.role)}%0Aالخبرة: ${encodeURIComponent(careersForm.experience)}%0Aالرابط/معرض الأعمال: ${encodeURIComponent(careersForm.portfolioUrl)}%0Aالبريد/الجوال: ${encodeURIComponent(careersForm.phone)}`;
    setTimeout(() => {
      window.open(`https://wa.me/966558953588?text=${text}`, '_blank');
    }, 1200);
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 text-xs border-t border-slate-800 pt-12 pb-8 mt-16 font-cairo relative">
      
      {/* Top CTA Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2 text-center md:text-right z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تواصل مباشر وفرص عمل متجددة</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-tajawal text-white">
              هل تبحث عن استشارة تقنية، أو ترغب بالانضمام لفريق العمل؟
            </h3>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              نرحب بالاستفسارات البرمجية والتجارية، كما نفتح أبواب التعاون للمبدعين والمطورين والخبراء الميدانيين.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 z-10 w-full md:w-auto justify-center">
            <button
              onClick={() => {
                setShowContactModal(true);
                setContactSubmitted(false);
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-emerald-500 text-white font-bold font-tajawal text-sm transition shadow-lg shadow-emerald-900/30 hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>تواصل مباشر الآن</span>
            </button>

            <button
              onClick={() => {
                setShowCareersModal(true);
                setCareersSubmitted(false);
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold font-tajawal text-sm transition hover:scale-[1.02]"
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>قسم التوظيف والإنضمام</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Column 1: Brand & Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#059669] flex items-center justify-center text-white font-bold font-tajawal text-base shadow-md">
              إس
            </div>
            <div>
              <span className="text-white font-bold text-lg font-tajawal block">إسماعيل الساعدي</span>
              <span className="text-[11px] text-emerald-400 font-mono block">Ismail Al-Saedi</span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            مستشار تقني ومطور خبير متخخص في بناء المنصات السحابية، تحسين تكلفة الاستحواذ الإعلاني (CAC)، وتقديم خدمات حراج الميدانية المباشرة.
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>المقر: الطائف / المدينة المنورة / كافة مناطق المملكة</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>الاستجابة الميدانية: خلال ساعات على مدار الأسبوع</span>
            </div>
          </div>
        </div>

        {/* Column 2: Careers & Opportunities */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold font-tajawal text-sm border-b border-slate-800 pb-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>قسم التوظيف والفرص</span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            نبحث دائماً عن الكفاءات التقنية والتسويقية للعمل الحر والميداني:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">مطور React & Node.js</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">عن بُعد</span>
            </li>
            <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">متخصص إعلانات & CAC</span>
              <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">مشاريع</span>
            </li>
            <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">ممثل ميداني وحراج</span>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">الطائف/المدينة</span>
            </li>
          </ul>

          <button
            onClick={() => {
              setShowCareersModal(true);
              setCareersSubmitted(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 font-bold transition text-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>تقديم طلب انضمام / توظيف</span>
          </button>
        </div>

        {/* Column 3: Contact & Direct Channels */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold font-tajawal text-sm border-b border-slate-800 pb-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>قنوات التواصل المباشر</span>
          </div>

          <div className="space-y-2">
            <a
              href={ISMAIL_PROFILE_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-300 transition group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-400 block">واتساب مباشر (سريع)</span>
                <span className="font-mono font-bold text-slate-100 dir-ltr text-xs dir-ltr block group-hover:text-emerald-400">
                  +966 55 895 3588
                </span>
              </div>
            </a>

            <a
              href={`mailto:${ISMAIL_PROFILE_DATA.email}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition group"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-400 block">البريد الإلكتروني</span>
                <span className="font-mono text-xs text-slate-200 block truncate group-hover:text-emerald-400">
                  {ISMAIL_PROFILE_DATA.email}
                </span>
              </div>
            </a>

            <a
              href={ISMAIL_PROFILE_DATA.harajUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">الحساب الموثق</span>
                <span className="font-bold text-xs text-amber-300 block group-hover:text-amber-200">
                  حراج | إسماعيل الساعدي
                </span>
              </div>
            </a>
          </div>

          {/* Social Icons */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-2 font-semibold">حسابات التواصل الاجتماعي:</span>
            <div className="flex items-center gap-2 flex-wrap">
              <a href={ISMAIL_PROFILE_DATA.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition" title="X / Twitter">
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a href={ISMAIL_PROFILE_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition" title="LinkedIn">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a href={ISMAIL_PROFILE_DATA.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition" title="GitHub">
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a href={ISMAIL_PROFILE_DATA.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition" title="YouTube">
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: Quick Nav & Standards */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold font-tajawal text-sm border-b border-slate-800 pb-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>روابط سريعة ومعايير</span>
          </div>

          <ul className="space-y-1.5 text-slate-400">
            {onNavigateTab && (
              <>
                <li>
                  <button onClick={() => onNavigateTab('articles')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                    <ChevronLeft className="w-3 h-3 text-emerald-500" /> المقالات والأبحاث التقنية
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('profile')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                    <ChevronLeft className="w-3 h-3 text-emerald-500" /> الملف الشخصي و Knowledge Graph
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('identity')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                    <ChevronLeft className="w-3 h-3 text-emerald-500" /> هوية المنصة والأثر (Impact)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('tech')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                    <ChevronLeft className="w-3 h-3 text-emerald-500" /> المواصفات التقنية والـ SEO
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="pt-3 space-y-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>مزامنة فورية حية عبر Google Firestore</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>فهرسة متوافقة مع Google AI Overviews</span>
            </div>
            <a
              href="/api/profile/schema.json"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 hover:underline pt-1"
            >
              <FileText className="w-3 h-3" />
              <span>استعرض Schema.org JSON-LD</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <p>
          جميع الحقوق محفوظة منصة إسماعيل الساعدي للحلول التقنية والاستشارات © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>الطائف / المدينة المنورة / المملكة العربية السعودية</span>
          <span>•</span>
          <span className="font-mono text-emerald-400">v2.5.0-Enterprise</span>
        </div>
      </div>

      {/* MODAL 1: CONTACT FORM MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative text-right font-cairo">
            
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg font-tajawal">التواصل المباشر مع إسماعيل الساعدي</h3>
                  <p className="text-slate-300 text-xs">أرسل استفسارك التقني أو التجاري للرد الفوري</p>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {contactSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-white font-bold text-xl font-tajawal">جاري تحويلك للواتساب المباشر...</h4>
                  <p className="text-slate-300 text-xs max-w-md mx-auto">
                    تم تجهيز رسالتك وسيتم فتح محادثة الواتساب المباشرة مع إسماعيل الساعدي للرد الفوري.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-slate-300 text-xs font-bold mb-1.5">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="أدخل اسمك الكريم"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-bold mb-1.5">رقم الجوال / الواتساب *</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="05XXXXXXXX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs dir-ltr text-right focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-bold mb-1.5">نوع الخدمة / الاستفسار *</label>
                    <select
                      value={contactForm.serviceType}
                      onChange={(e) => setContactForm({ ...contactForm, serviceType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="استشارة تقنية وبرمجية">استشارة تقنية وبرمجية</option>
                      <option value="تطوير تطبيق أو منصة سحابية">تطوير تطبيق أو منصة سحابية</option>
                      <option value="إدارية وحملات إعلانية وتكلفة CAC">إدارة حملات إعلانية وتكلفة CAC</option>
                      <option value="خدمات واستشارات حراج الميدانية">خدمات واستشارات حراج الميدانية</option>
                      <option value="طلب تقييم بنية تحتية وكود">طلب تقييم بنية تحتية وكود</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-bold mb-1.5">تفاصيل الطلب أو الاستفسار *</label>
                    <textarea
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="اكتب نبذة عن مشروعك أو استفسارك..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#059669] hover:bg-emerald-500 text-white font-bold font-tajawal rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال عبر الواتساب المباشر</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CAREERS / HIRING MODAL */}
      {showCareersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-right font-cairo max-h-[90vh] flex flex-col">
            
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg font-tajawal">قسم التوظيف والفرص المتاحة</h3>
                  <p className="text-slate-300 text-xs">انضم لفريق العمل والفرص الاستشارية والميدانية</p>
                </div>
              </div>
              <button
                onClick={() => setShowCareersModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Jobs list overview */}
              <div className="space-y-3">
                <h4 className="text-slate-200 font-bold font-tajawal text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>الفرص والمسارات المتاحة للتعاون:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableJobs.map((job) => (
                    <div key={job.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-100 text-xs">{job.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded font-semibold">{job.type}</span>
                        <span className="text-slate-400">{job.location}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed pt-1">{job.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Section */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <h4 className="text-white font-bold font-tajawal text-sm flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>استمارة التقديم والطلب:</span>
                </h4>

                {careersSubmitted ? (
                  <div className="text-center py-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="text-white font-bold text-base font-tajawal">تم إرسال طلب الانضمام بنجاح!</h5>
                    <p className="text-slate-300 text-xs max-w-md mx-auto">
                      سيتم مراجعة بياناتك ورابط أعمالك والرد عليك عبر الواتساب والبريد خلال 24-48 ساعة.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCareersSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 text-xs font-bold mb-1">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={careersForm.name}
                          onChange={(e) => setCareersForm({ ...careersForm, name: e.target.value })}
                          placeholder="اسمك الثلاثي"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-xs font-bold mb-1">رقم الجوال / الواتساب *</label>
                        <input
                          type="tel"
                          required
                          value={careersForm.phone}
                          onChange={(e) => setCareersForm({ ...careersForm, phone: e.target.value })}
                          placeholder="05XXXXXXXX"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs dir-ltr text-right focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 text-xs font-bold mb-1">المسمى المستهدف *</label>
                        <select
                          value={careersForm.role}
                          onChange={(e) => setCareersForm({ ...careersForm, role: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                        >
                          <option value="مطور Full-Stack (React/Node)">مطور Full-Stack (React/Node)</option>
                          <option value="متخصص إعلانات سريعة & CAC">متخصص إعلانات سريعة & CAC</option>
                          <option value="ممثل استشارات حراج وميدان">ممثل استشارات حراج وميدان</option>
                          <option value="كاتب محتوى تقني وSEO">كاتب محتوى تقني وSEO</option>
                          <option value="تخصص آخر">تخصص آخر / تعاون متنوع</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 text-xs font-bold mb-1">سنوات الخبرة *</label>
                        <select
                          value={careersForm.experience}
                          onChange={(e) => setCareersForm({ ...careersForm, experience: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                        >
                          <option value="مبتدئ (أقل من سنة)">مبتدئ (أقل من سنة)</option>
                          <option value="1-3 سنوات">1-3 سنوات</option>
                          <option value="3-5 سنوات">3-5 سنوات</option>
                          <option value="+5 سنوات خبير">+5 سنوات خبير</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-bold mb-1">رابط معرض الأعمال / LinkedIn / GitHub *</label>
                      <input
                        type="url"
                        required
                        value={careersForm.portfolioUrl}
                        onChange={(e) => setCareersForm({ ...careersForm, portfolioUrl: e.target.value })}
                        placeholder="https://github.com/... أو رابط السيرة الذاتية"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs dir-ltr text-right focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-bold mb-1">نبذة عن خبرتك وأبرز أعمالك</label>
                      <textarea
                        rows={2}
                        value={careersForm.notes}
                        onChange={(e) => setCareersForm({ ...careersForm, notes: e.target.value })}
                        placeholder="اذكر أهم المشاريع أو الأرقام التي حققتها..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#059669] hover:bg-emerald-500 text-white font-bold font-tajawal rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>إرسال طلب التقديم المباشر</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </footer>
  );
};
