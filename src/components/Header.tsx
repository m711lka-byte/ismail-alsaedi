import React from 'react';
import { CategoryType } from '../types';
import { 
  BookOpen, 
  Palette, 
  FileText, 
  Cpu, 
  PlusCircle, 
  Search, 
  Sparkles,
  Database,
  Flame
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'articles' | 'identity' | 'template' | 'tech' | 'editor';
  setActiveTab: (tab: 'articles' | 'identity' | 'template' | 'tech' | 'editor') => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  articlesCount: number;
  isLiveDb: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  articlesCount,
  isLiveDb
}) => {
  const categories: CategoryType[] = ['الكل', 'برمجة', 'يوميات', 'إعلانات', 'خدمات'];

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white shadow-xl border-b border-slate-800">
      {/* Top Banner */}
      <div className="bg-[#059669] text-white text-xs font-semibold py-1.5 px-4 text-center flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-emerald-200 animate-pulse" />
          <span>منصة مقالات وحلول تقنية احترافية • <strong>إسماعيل الساعدي (الطائف)</strong></span>
        </div>
        
        {/* Dynamic Source Files Direct Links */}
        <div className="flex items-center gap-2 text-[11px] bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-400/30">
          <span className="text-emerald-200">الملفات البرمجية الحية (Source Code):</span>
          <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-200 font-mono">robots.txt</a>
          <span>•</span>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-200 font-mono">sitemap.xml</a>
          <span>•</span>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-200 font-mono">rss.xml</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('articles')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shadow-lg text-white font-extrabold text-xl font-tajawal border border-emerald-400/30">
              إس
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-tajawal tracking-tight text-white">
                  إسماعيل الساعدي
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Impact & Value Added
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-cairo">
                حلول برمجية عملية • أرقام حقيقية • تجارب موثقة
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          {activeTab === 'articles' && (
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مقال، تقنية، أو كلمة مفتاحية..."
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-sm rounded-xl pl-4 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          )}

          {/* DB & Quick Info */}
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>قاعدة البيانات: <strong className="text-emerald-300">Firebase Firestore</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-emerald-950/60 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-800/50">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{articlesCount} مقال موثق</span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-2 pb-1 overflow-x-auto no-scrollbar">
          <nav className="flex items-center space-x-1 space-x-reverse min-w-max">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === 'articles'
                  ? 'bg-[#059669] text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>المقالات</span>
            </button>

            <button
              onClick={() => setActiveTab('identity')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === 'identity'
                  ? 'bg-[#059669] text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>الهوية البصرية والمنهجية</span>
            </button>

            <button
              onClick={() => setActiveTab('template')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === 'template'
                  ? 'bg-[#059669] text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>قالب مقال معتمد</span>
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === 'tech'
                  ? 'bg-[#059669] text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>التوصيات التقنية والـ SEO</span>
            </button>
          </nav>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition border ${
              activeTab === 'editor'
                ? 'bg-white text-[#0F172A] border-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة مقال جديد</span>
          </button>
        </div>

        {/* Categories Bar when Articles Tab is Active */}
        {activeTab === 'articles' && (
          <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 pl-2 min-w-max">التصنيف:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition min-w-max ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};
