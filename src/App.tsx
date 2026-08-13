import React, { useState, useEffect } from 'react';
import { Article, CategoryType } from './types';
import { INITIAL_ARTICLES } from './data/initialArticles';
import { subscribeArticles, isFirestoreDemo } from './lib/firebase';
import { sortArticlesByScore } from './lib/articleRanking';
import { getMergedArticles, deleteArticleMultiTier } from './lib/articleStorage';
import { Header } from './components/Header';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { IdentitySection } from './components/IdentitySection';
import { TemplateSection } from './components/TemplateSection';
import { TechnicalSpecsSection } from './components/TechnicalSpecsSection';
import { ArticleEditor } from './components/ArticleEditor';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Rss, 
  ShieldCheck, 
  BookOpen, 
  Code2, 
  Megaphone, 
  Briefcase, 
  Heart,
  ChevronLeft
} from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => getMergedArticles([]));
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'identity' | 'template' | 'tech' | 'editor'>('articles');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time Firestore & Server API sync with LocalStorage fail-safe
  useEffect(() => {
    // 1. Initial fetch from Express Server API (/api/articles)
    fetch('/api/articles')
      .then(res => res.json())
      .then((serverArticles: Article[]) => {
        if (Array.isArray(serverArticles) && serverArticles.length > 0) {
          setArticles(getMergedArticles(serverArticles));
        }
      })
      .catch(err => console.warn("Server API sync notice:", err));

    // 2. Real-time Firestore Sync Listener
    const unsubscribe = subscribeArticles((firestoreArticles) => {
      const merged = getMergedArticles(firestoreArticles);
      setArticles(merged);
    }, INITIAL_ARTICLES);

    return () => unsubscribe();
  }, []);

  // Filter articles based on category & search query (Preserving algorithm order)
  const sortedAndFiltered = sortArticlesByScore(articles);
  const filteredArticles = sortedAndFiltered.filter((art) => {
    const matchesCategory = selectedCategory === 'الكل' || art.category === selectedCategory;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.introDirectAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];

  const handleArticleCreated = (newArt: Article) => {
    setArticles(getMergedArticles([newArt]));
    setSelectedArticle(newArt);
    setActiveTab('articles');
  };

  const handleUpdateLike = (articleId: string) => {
    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    }));
  };

  const handleDeleteArticle = (articleId: string) => {
    deleteArticleMultiTier(articleId);
    setArticles(prev => prev.filter(art => art.id !== articleId));
    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-cairo">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'articles') setSelectedArticle(null);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        articlesCount={articles.length}
        isLiveDb={!isFirestoreDemo}
      />

      {/* Main Body */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: ARTICLES TAB */}
        {activeTab === 'articles' && (
          <>
            {selectedArticle ? (
              <ArticleDetail
                article={selectedArticle}
                onBack={() => setSelectedArticle(null)}
                onUpdateLike={handleUpdateLike}
                onDeleteArticle={handleDeleteArticle}
              />
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
                
                {/* Hero Banner (Only when no search or category filter active) */}
                {selectedCategory === 'الكل' && !searchQuery && featuredArticle && (
                  <div 
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="group relative bg-[#0F172A] rounded-3xl overflow-hidden shadow-xl border border-slate-800 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
                  >
                    <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-[#059669] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            مقال الأسبوع المميز
                          </span>
                          <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700">
                            {featuredArticle.category}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal group-hover:text-emerald-400 transition leading-snug">
                          {featuredArticle.title}
                        </h2>

                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                          {featuredArticle.introDirectAnswer}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <img 
                            src={featuredArticle.author.avatar} 
                            alt={featuredArticle.author.name}
                            className="w-8 h-8 rounded-full border border-emerald-500"
                          />
                          <span className="text-white font-bold">{featuredArticle.author.name}</span>
                        </div>

                        <span className="text-[#059669] font-bold text-sm flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                          قراءة دراسة الحالة المتميزة
                          <ChevronLeft className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 h-64 lg:h-auto relative bg-slate-800">
                      <img 
                        src={featuredArticle.coverImage} 
                        alt={featuredArticle.coverAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent lg:block hidden"></div>
                    </div>
                  </div>
                )}

                {/* Section Title & Filter Summary */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-[#059669]" />
                      <span>{selectedCategory === 'الكل' ? 'جميع المقالات والدروس العملية' : `مقالات تصنيف: ${selectedCategory}`}</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {filteredArticles.length} مقال متوافق مع منهجية الـ 8 خطوات ومكتوب بلهجة سعودية فصحى مبسطة
                    </p>
                  </div>

                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      مسح نتائج البحث
                    </button>
                  )}
                </div>

                {/* Articles Grid */}
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, idx) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        rankIndex={idx}
                        onSelectArticle={(art) => setSelectedArticle(art)}
                        onDeleteArticle={handleDeleteArticle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                    <p className="text-base font-bold text-slate-700 font-tajawal">لم نجد أي مقالات تطابق البحث لمصطلح: "{searchQuery}"</p>
                    <p className="text-xs text-slate-500">جرب كتابة كلمات مفتاحية مثل: Firestore، CAC، تطبيقات، أو اختر تصنيفاً آخر.</p>
                  </div>
                )}

              </div>
            )}
          </>
        )}

        {/* VIEW 2: IDENTITY TAB */}
        {activeTab === 'identity' && <IdentitySection />}

        {/* VIEW 3: TEMPLATE TAB */}
        {activeTab === 'template' && <TemplateSection />}

        {/* VIEW 4: TECHNICAL SPECS TAB */}
        {activeTab === 'tech' && <TechnicalSpecsSection />}

        {/* VIEW 5: NEW ARTICLE EDITOR */}
        {activeTab === 'editor' && (
          <ArticleEditor
            onArticleCreated={handleArticleCreated}
            onCancel={() => setActiveTab('articles')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-400 text-xs border-t border-slate-800 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white font-bold font-tajawal text-sm">
                إس
              </div>
              <span className="text-white font-bold text-lg font-tajawal">إسماعيل الساعدي</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              منصة مقالات وحلول تقنية احترافية توفر Value Added و Impact حقيقي عبر المنهجية المعتمدة والتجارب الميدانية بالأرقام.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-tajawal text-sm block mb-2">التخصصات والمسارات:</span>
            <ul className="space-y-1 text-slate-300">
              <li className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-emerald-400" /> برمجة وتطوير الأنظمة وبناء الـ API</li>
              <li className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-purple-400" /> يوميات مبرمج وتجارب السوق السعودي</li>
              <li className="flex items-center gap-1.5"><Megaphone className="w-3.5 h-3.5 text-amber-400" /> إعلانات وتكلفة الاستحواذ (CAC)</li>
              <li className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-blue-400" /> استشارات اختيار الشريك التقني</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-tajawal text-sm block mb-2">المعايير والتقنيات:</span>
            <p className="text-slate-400 leading-relaxed">
              تعتمد المنصة على **Google Firestore** للتخزين والتفاعل الحي، مع دعم **RSS 2.0 Feed**، و **Schema JSON-LD** لتهيئة الفهرسة الفورية ودعم **AI Overviews**.
            </p>
            <div className="pt-2 text-[11px] text-[#059669] font-bold">
              جميع الحقوق محفوظة منصة إسماعيل الساعدي © {new Date().getFullYear()}
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
