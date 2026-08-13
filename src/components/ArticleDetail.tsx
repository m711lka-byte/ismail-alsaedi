import React, { useState, useEffect } from 'react';
import { Article, ArticleComment } from '../types';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  CheckCircle2, 
  Tag, 
  HelpCircle, 
  Copy, 
  Check, 
  Code, 
  Rss, 
  Sparkles,
  Award,
  BarChart3,
  Lightbulb,
  Trash2,
  MapPin,
  AlertTriangle,
  Star,
  MessageSquare,
  Send,
  TrendingUp
} from 'lucide-react';
import { incrementArticleViews, toggleArticleLike } from '../lib/firebase';
import { deleteArticleMultiTier, addCommentToArticleMultiTier, addRatingToArticleMultiTier } from '../lib/articleStorage';
import { getArticleScoreBreakdown } from '../lib/articleRanking';
import { generateArticleSchema, injectJsonLdInDOM } from '../lib/seo';
import { brandConfig } from '../lib/brandConfig';
import { ProgrammingLogoSlider } from './ProgrammingLogoSlider';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onUpdateLike?: (articleId: string) => void;
  onDeleteArticle?: (articleId: string) => void;
  onNavigateToProfile?: () => void;
  isAdmin?: boolean;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ 
  article, 
  onBack,
  onUpdateLike,
  onDeleteArticle,
  onNavigateToProfile,
  isAdmin
}) => {
  const [currentArticle, setCurrentArticle] = useState<Article>(article);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(article.likes);
  const [activeTab, setActiveTab] = useState<'content' | 'schema' | 'rss'>('content');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive Ratings & Comments State
  const [commentsList, setCommentsList] = useState<ArticleComment[]>(
    article.commentsList || [
      {
        id: 'c1',
        authorName: 'م. أحمد العتيبي',
        text: 'مقالة استثنائية وبها تفاصيل تطبيقية قيّمة جداً.',
        createdAt: 'منذ يومين',
        rating: 5
      },
      {
        id: 'c2',
        authorName: 'سارة الشمري',
        text: 'أعجبني وضوح دراسة الحالة والحلول المقدمة في المقالة.',
        createdAt: 'منذ 3 أيام',
        rating: 5
      }
    ]
  );
  const [currentRating, setCurrentRating] = useState<number>(article.rating || 4.9);
  const [ratingsCount, setRatingsCount] = useState<number>(article.ratingsCount || 24);
  const [userRating, setUserRating] = useState<number>(0);
  const [hasUserRated, setHasUserRated] = useState<boolean>(false);

  // Comment Submission Form State
  const [newCommentText, setNewCommentText] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newCommentRating, setNewCommentRating] = useState<number>(5);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentSuccessMsg, setCommentSuccessMsg] = useState('');

  // Calculate live score breakdown
  const scoreBreakdown = getArticleScoreBreakdown({
    ...currentArticle,
    likes: localLikes,
    rating: currentRating,
    ratingsCount,
    commentsCount: commentsList.length,
    commentsList
  });

  useEffect(() => {
    // Record view in Firestore
    incrementArticleViews(article.id);
    // Dynamically inject schema & geo tags into document.head
    injectJsonLdInDOM(article);
  }, [article.id]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLocalLikes(prev => prev + 1);
      toggleArticleLike(article.id);
      if (onUpdateLike) onUpdateLike(article.id);
    }
  };

  const handleRateArticle = async (stars: number) => {
    setUserRating(stars);
    setHasUserRated(true);
    const updated = await addRatingToArticleMultiTier(article.id, stars);
    if (updated) {
      setCurrentArticle(updated);
      setCurrentRating(updated.rating || currentRating);
      setRatingsCount(updated.ratingsCount || ratingsCount + 1);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmittingComment(true);
    const author = newAuthorName.trim() || 'زائر متفاعل';
    const updated = await addCommentToArticleMultiTier(article.id, newCommentText, author, newCommentRating);
    
    if (updated) {
      setCurrentArticle(updated);
      setCommentsList(updated.commentsList || []);
      if (updated.rating) setCurrentRating(updated.rating);
      if (updated.ratingsCount) setRatingsCount(updated.ratingsCount);
    } else {
      // Fallback local update
      const newComm: ArticleComment = {
        id: 'comm-' + Date.now(),
        authorName: author,
        text: newCommentText,
        createdAt: 'الآن',
        rating: newCommentRating
      };
      setCommentsList(prev => [newComm, ...prev]);
    }

    setNewCommentText('');
    setNewAuthorName('');
    setIsSubmittingComment(false);
    setCommentSuccessMsg('تمت إضافة تعليقك وتقييمك بنجاح وحساب الدرجة المحدثة!');
    setTimeout(() => setCommentSuccessMsg(''), 4000);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteArticleMultiTier(article.id);
    if (onDeleteArticle) {
      onDeleteArticle(article.id);
    } else {
      onBack();
    }
  };

  // Generate JSON-LD Schema from SEO module
  const schemaJsonLd = generateArticleSchema(article);

  // Generate RSS XML Item
  const rssXmlItem = `<item>
  <title>${article.title}</title>
  <link>https://esmail-alsaadi.com/articles/${article.slug}</link>
  <guid isPermaLink="true">https://esmail-alsaadi.com/articles/${article.slug}</guid>
  <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
  <dc:creator>${article.author.name}</dc:creator>
  <category>${article.category}</category>
  <description>${article.introDirectAnswer}</description>
</item>`;

  const copyToClipboard = (text: string, type: 'schema' | 'rss' | 'share') => {
    navigator.clipboard.writeText(text);
    if (type === 'schema') {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    } else if (type === 'rss') {
      setCopiedRss(true);
      setTimeout(() => setCopiedRss(false), 2000);
    } else {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#059669] mb-6 transition"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة إلى قائمة المقالات</span>
      </button>

      {/* Main Article Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Cover Banner */}
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img 
            src={article.coverImage} 
            alt={article.coverAlt} 
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 right-6 left-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {article.category}
              </span>
              <span className="bg-slate-800/80 text-slate-200 text-xs px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{brandConfig.location.city} ({brandConfig.location.coordinates.formatted})</span>
              </span>
              <span className="bg-slate-800/80 text-slate-200 text-xs px-3 py-1 rounded-full border border-slate-700">
                الكلمة المفتاحية: {article.keyword}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold font-tajawal leading-tight mb-2">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Toolbar & Author Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Author info (E-E-A-T) - Clickable to Profile */}
          <button 
            type="button"
            onClick={() => onNavigateToProfile && onNavigateToProfile()}
            className="flex items-center gap-3 text-right hover:opacity-85 transition group/author border-b border-transparent hover:border-[#059669] pb-1"
            title="انقر لزيارة الملف الشخصي الكامل للكاتب"
          >
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#059669] group-hover/author:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0F172A] text-sm group-hover/author:text-[#059669] underline-offset-2 group-hover/author:underline">{article.author.name}</span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-500 font-cairo">{article.author.role}</p>
            </div>
          </button>

          {/* Metadata & Actions */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>نُشر: {article.publishDate}</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.views + 1} مشاهدة</span>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition border ${
                liked
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{localLikes}</span>
            </button>

            <button
              onClick={() => copyToClipboard(window.location.href, 'share')}
              className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600 hover:text-[#059669] transition"
              title="مشاركة المقال"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Delete Article Action (Admin Only) */}
            {isAdmin && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 px-3 py-1.5 rounded-lg border border-red-200 font-bold transition text-xs"
                title="حذف المقال (للإدارة فقط)"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                <span>حذف المقال</span>
              </button>
            )}
          </div>

        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600 font-bold text-lg font-tajawal">
                <div className="p-2 bg-red-100 rounded-2xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span>تأكيد حذف المقال</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                هل أنت أسر برغبتك في حذف المقال <strong>"{article.title}"</strong> نهائياً من قاعدة البيانات والمنصة؟ لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition flex items-center gap-2"
                >
                  {isDeleting ? (
                    <span>جاري الحذف...</span>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>تأكيد الحذف</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Switcher (Article Content / JSON-LD Schema / RSS XML) */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'content'
                ? 'border-[#059669] text-[#059669]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            المحتوى الرئيسي
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-[#059669] text-[#059669]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>JSON-LD Schema (AI/SEO)</span>
          </button>
          <button
            onClick={() => setActiveTab('rss')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'rss'
                ? 'border-[#059669] text-[#059669]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Rss className="w-4 h-4" />
            <span>RSS XML Feed</span>
          </button>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="p-6 sm:p-10 space-y-8 font-cairo text-[#1E293B]">

            {/* Direct Answer Box (Google AI Overviews Hook) */}
            <div className="bg-[#F8FAFC] border-r-4 border-[#059669] p-5 rounded-l-2xl shadow-sm">
              <div className="flex items-center gap-2 text-[#059669] font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                <span>الإجابة المباشرة (Direct Answer / AI Overview):</span>
              </div>
              <p className="text-base text-slate-800 font-medium leading-relaxed">
                {article.introDirectAnswer}
              </p>
            </div>

            {/* Impact & Value Added Callout Box */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-md border border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-3 font-tajawal">
                <Lightbulb className="w-5 h-5 text-emerald-400" />
                <span>الأثر والقيمة المضافة للعميل (Impact & Value Added)</span>
              </div>
              <ul className="space-y-2 text-sm text-emerald-100">
                {article.valueAddedSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Markdown / Content Body */}
            <div className="prose prose-slate max-w-none text-base leading-relaxed space-y-4">
              {article.contentMarkdown.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-[#0F172A] font-tajawal pt-4 pb-2 border-b border-slate-200">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg font-bold text-[#059669] font-tajawal pt-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('|')) {
                  // Table parser simple
                  return (
                    <div key={idx} className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                      <table className="w-full text-sm text-right">
                        <tbody className="divide-y divide-slate-200">
                          {paragraph.split('\n').filter(r => !r.includes(':---')).map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx === 0 ? 'bg-[#0F172A] text-white font-bold' : 'hover:bg-slate-50'}>
                              {row.split('|').filter(c => c.trim() !== '').map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 border-l border-slate-200 last:border-l-0">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return <p key={idx} className="text-slate-700 leading-relaxed">{paragraph}</p>;
              })}
            </div>

            {/* Logo Slider - Only displayed for Programming Articles (شريط أشرطة الشركات المستفيدة) */}
            {(article.category === 'برمجة' || 
              article.category.includes('برمج') || 
              article.tags.some(t => t.includes('برمجة') || t.toLowerCase().includes('api') || t.toLowerCase().includes('firestore'))) && (
              <ProgrammingLogoSlider />
            )}

            {/* Case Study Section */}
            {article.caseStudy && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg font-tajawal">
                  <BarChart3 className="w-5 h-5 text-[#059669]" />
                  <span>{article.caseStudy.title}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-red-600 block mb-1">المشكلة العميقة:</span>
                    <p className="text-slate-600">{article.caseStudy.problem}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-600 block mb-1">الحل المنفّذ:</span>
                    <p className="text-slate-600">{article.caseStudy.solution}</p>
                  </div>
                </div>

                {/* Metrics Table */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {article.caseStudy.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm text-center">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold">{metric.label}</span>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="text-slate-400 line-through">{metric.before}</span>
                        <span className="text-[#059669] font-bold text-sm">{metric.after}</span>
                      </div>
                      <span className="mt-1 inline-block bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-bold">
                        {metric.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Executable Recommendations */}
            <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#0F172A] font-tajawal mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                <span>الخلاصة والتوصية العملية القابلة للتنفيذ اليوم</span>
              </h3>
              <ul className="space-y-2.5 text-sm">
                {article.recommendations.map((rec, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 text-slate-700">
                    <span className="bg-[#059669] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {rIdx + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-xl font-bold text-[#0F172A] font-tajawal mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#059669]" />
                  <span>الأسئلة الشائعة (FAQ)</span>
                </h3>
                <div className="space-y-3">
                  {article.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-[#0F172A] text-sm mb-1.5">
                        س: {faq.question}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        ج: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Footer */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500">الوسوم:</span>
              {article.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* 1. Algorithm Score Breakdown Showcase (خوارزمية حساب ترتيب المقال) */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-5 border border-slate-800 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-tajawal text-slate-100">
                      درجة ترتيب المقال بالخوارزمية (Article Score)
                    </h3>
                    <p className="text-xs text-slate-400">
                      معادلة حساب الترتيب بناءً على التقييم، التفاعل، الجودة، والوصول
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-2xl text-center shadow-md">
                  <span className="text-2xl font-black block font-mono">{scoreBreakdown.totalScore}</span>
                  <span className="text-[10px] font-bold block opacity-90">الدرجة الإجمالية / 100</span>
                </div>
              </div>

              {/* Breakdown Factors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-cairo">
                {/* Rating Factor 30% */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between items-center text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>التقييم (30%)</span>
                    </span>
                    <span className="font-mono text-sm">{scoreBreakdown.ratingScore} / 30</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-amber-400 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(scoreBreakdown.ratingScore / 30) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    المتوسط: {currentRating} من 5 ({ratingsCount} تقييم)
                  </span>
                </div>

                {/* Comments Factor 25% */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between items-center text-blue-400 font-bold">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>التعليقات والتفاعل (25%)</span>
                    </span>
                    <span className="font-mono text-sm">{scoreBreakdown.commentsScore} / 25</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(scoreBreakdown.commentsScore / 25) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    {commentsList.length} تعليقات ومشاركات
                  </span>
                </div>

                {/* Quality Factor 25% */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between items-center text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>جودة المحتوى (25%)</span>
                    </span>
                    <span className="font-mono text-sm">{scoreBreakdown.qualityScore} / 25</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-400 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(scoreBreakdown.qualityScore / 25) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    دراسة حالة + جدول + أسئلة شائعة
                  </span>
                </div>

                {/* Reach & Views Factor 20% */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between items-center text-purple-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>الوصول والمشاهدات (20%)</span>
                    </span>
                    <span className="font-mono text-sm">{scoreBreakdown.seoReachScore} / 20</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(scoreBreakdown.seoReachScore / 20) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    {article.views + 1} مشاهدة • {localLikes} إعجاب
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Interactive Star Rating Section (تقييم المقالة) */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
              <h3 className="font-bold text-amber-950 text-base font-tajawal flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>قيم هذه المقالة وساهم في رفع ترتيبها بالخوارزمية</span>
              </h3>
              <p className="text-xs text-amber-800 font-cairo">
                تقييمك المباشر يساعد القراء الآخرين ويؤثر فورياً على المعادلة البرمجية للترتيب.
              </p>

              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRateArticle(star)}
                    className="p-1.5 hover:scale-125 transition-transform text-amber-400 focus:outline-none"
                    title={`تقييم ${star} من 5`}
                  >
                    <Star 
                      className={`w-7 h-7 ${
                        star <= (userRating || Math.round(currentRating))
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-amber-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>

              {hasUserRated && (
                <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-full shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>شكراً لتقييمك! تم تحديث خوارزمية الترتيب فورياً ({currentRating} من 5).</span>
                </div>
              )}
            </div>

            {/* 3. Interactive Comments System Section (قسم التعليقات والمناقشة) */}
            <div className="pt-8 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#059669]" />
                  <span>التعليقات والمناقشات ({commentsList.length})</span>
                </h3>
                <span className="text-xs text-slate-500 font-cairo">
                  المجتمع التقني والتفاعلي
                </span>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <h4 className="font-bold text-slate-800 text-sm font-tajawal">أضف تعليقك أو وجهة نظرك:</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-cairo">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">الاسم الكريم:</label>
                    <input 
                      type="text" 
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      placeholder="مثال: م. خالد المطيري"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">التقييم المرفق بالتعليق:</label>
                    <select
                      value={newCommentRating}
                      onChange={(e) => setNewCommentRating(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 من 5 - ممتاز جداً)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 من 5 - جيد جداً)</option>
                      <option value={3}>⭐⭐⭐ (3 من 5 - جيد)</option>
                      <option value={2}>⭐⭐ (2 من 5 - مقبول)</option>
                      <option value={1}>⭐ (1 من 5 - يتطلب تحسين)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">نص التعليق:</label>
                  <textarea 
                    required
                    rows={3}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="اكتب تعليقك هنا حول تجربتك أو استفسارك التقني..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  ></textarea>
                </div>

                {commentSuccessMsg && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>{commentSuccessMsg}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingComment || !newCommentText.trim()}
                    className="bg-[#059669] hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingComment ? 'جاري النشر...' : 'إضافة التعليق'}</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-3 font-cairo">
                {commentsList.map((comm) => (
                  <div key={comm.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center">
                          {comm.authorName.charAt(0)}
                        </div>
                        <span className="font-bold text-xs text-slate-800">{comm.authorName}</span>
                        <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                      </div>

                      {comm.rating && (
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{comm.rating} / 5</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed pr-9">
                      {comm.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Schema Tab */}
        {activeTab === 'schema' && (
          <div className="p-6 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">JSON-LD Structured Data Schema:</span>
              <button
                onClick={() => copyToClipboard(JSON.stringify(schemaJsonLd, null, 2), 'schema')}
                className="flex items-center gap-1.5 bg-[#059669] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-emerald-500 transition"
              >
                {copiedSchema ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSchema ? 'تم النسخ!' : 'نسخ Schema'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 leading-relaxed whitespace-pre-wrap">
              {JSON.stringify(schemaJsonLd, null, 2)}
            </pre>
          </div>
        )}

        {/* RSS Tab */}
        {activeTab === 'rss' && (
          <div className="p-6 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">RSS 2.0 Item XML Snippet:</span>
              <button
                onClick={() => copyToClipboard(rssXmlItem, 'rss')}
                className="flex items-center gap-1.5 bg-[#059669] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-emerald-500 transition"
              >
                {copiedRss ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedRss ? 'تم النسخ!' : 'نسخ RSS Item'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 leading-relaxed whitespace-pre-wrap">
              {rssXmlItem}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
