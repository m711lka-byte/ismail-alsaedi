import React from 'react';
import { Building2, ShieldCheck, Cpu, Code2, Server, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

interface CompanyClient {
  id: string;
  name: string;
  sector: string;
  city: string;
  techStack: string;
  logoBg: string;
  icon: React.ReactNode;
}

const PROGRAMMING_CLIENTS: CompanyClient[] = [
  {
    id: 'c1',
    name: 'شركة رؤية التقنية المتقدمة',
    sector: 'حلول الـ API والحوسبة السحابية',
    city: 'الطائف',
    techStack: 'Node.js • Cloud Run',
    logoBg: 'from-emerald-600 to-teal-800',
    icon: <Cpu className="w-6 h-6 text-emerald-300" />
  },
  {
    id: 'c2',
    name: 'منصة الأفق الرقمية للخدمات',
    sector: 'تطبيقات التجارة الإلكترونية',
    city: 'الرياض',
    techStack: 'React • Firestore',
    logoBg: 'from-blue-600 to-indigo-800',
    icon: <Globe2 className="w-6 h-6 text-blue-300" />
  },
  {
    id: 'c3',
    name: 'مجموعة الطائف للتكنولوجيا الذكية',
    sector: 'أنظمة إدارة قواعد البيانات',
    city: 'الطائف',
    techStack: 'PostgreSQL • Redis',
    logoBg: 'from-purple-600 to-slate-800',
    icon: <Server className="w-6 h-6 text-purple-300" />
  },
  {
    id: 'c4',
    name: 'شركة الابتكار والبرمجيات',
    sector: 'تطوير المنصات السحابية',
    city: 'جدة',
    techStack: 'TypeScript • Express',
    logoBg: 'from-emerald-700 to-emerald-950',
    icon: <Code2 className="w-6 h-6 text-emerald-300" />
  },
  {
    id: 'c5',
    name: 'شبكة البيانات الموحدة',
    sector: 'الأمن السبراني والربط المباشر',
    city: 'مكة المكرمة',
    techStack: 'OAuth 2.0 • Security',
    logoBg: 'from-cyan-600 to-blue-900',
    icon: <ShieldCheck className="w-6 h-6 text-cyan-300" />
  },
  {
    id: 'c6',
    name: 'مؤسسة الحلول الذكية للتطوير',
    sector: 'أتمتة الأعمال والأنظمة',
    city: 'الطائف',
    techStack: 'Microservices • Docker',
    logoBg: 'from-slate-700 to-slate-900',
    icon: <Building2 className="w-6 h-6 text-amber-300" />
  }
];

export const ProgrammingLogoSlider: React.FC = () => {
  // Duplicate array to achieve infinite continuous scrolling effect
  const duplicatedClients = [...PROGRAMMING_CLIENTS, ...PROGRAMMING_CLIENTS];

  return (
    <div className="my-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden relative group">
      
      {/* Decorative Gradient Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg sm:text-xl font-tajawal text-slate-100">
                المستفيدون من خدماتنا البرمجية والحلول التقنية
              </h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                خاص بمقالات البرمجة
              </span>
            </div>
            <p className="text-xs text-slate-400 font-cairo mt-0.5">
              شركات ومؤسسات تعتمد على حلولنا في تسريع الـ APIs وتطوير قواعد البيانات المستقرة في محافظة الطائف والمملكة.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-xl">
          <CheckCircle2 className="w-4 h-4" />
          <span>+45 مشروع برجمي ناجح</span>
        </div>
      </div>

      {/* Logo Slider Track with CSS Marquee Animation */}
      <div className="relative w-full overflow-hidden py-2">
        
        {/* Left & Right Shadow Gradient Fades */}
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>

        {/* Continuous Animated Marquee Container */}
        <div className="flex gap-4 w-max animate-logo-slider hover:[animation-play-state:paused]">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="w-64 sm:w-72 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl transition-all duration-300 shrink-0 shadow-md group/card flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${client.logoBg} shadow-inner flex items-center justify-center shrink-0`}>
                  {client.icon}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-slate-100 font-tajawal truncate group-hover/card:text-emerald-400 transition-colors">
                    {client.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate font-cairo">
                    {client.sector}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-cairo text-slate-400">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono text-[10px]">
                  {client.techStack}
                </span>
                <span className="text-emerald-400 font-semibold">
                  📍 {client.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-cairo">
        <span>👈 مرر الفأرة فوق الشريط للإيقاف المؤقت والتصفح</span>
        <span className="text-emerald-400 font-bold">حلول برمجية مخصصة للقطاع التجاري والتقني</span>
      </div>
    </div>
  );
};
