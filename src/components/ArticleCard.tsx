import React, { useState } from 'react';
import { Article } from '../types';
import { 
  Eye, 
  ThumbsUp, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  CheckCircle2, 
  TrendingUp,
  Tag,
  Trash2,
  AlertTriangle,
  Star,
  MessageSquare,
  Award
} from 'lucide-react';
import { deleteArticleFromFirestore } from '../lib/firebase';
import { deleteArticleMultiTier } from '../lib/articleStorage';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  onDeleteArticle?: (articleId: string) => void;
  onNavigateToProfile?: () => void;
  rankIndex?: number;
  isAdmin?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onSelectArticle, 
  onDeleteArticle, 
  onNavigateToProfile,
  rankIndex,
  isAdmin 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const categoryColors: Record<string, string> = {
    'برمجة': 'bg-blue-900/10 text-blue-800 border-blue-200',
    'يوميات': 'bg-purple-900/10 text-purple-800 border-purple-200',
    'إعلانات': 'bg-amber-900/10 text-amber-800 border-amber-200',
    'خدمات': 'bg-emerald-900/10 text-emerald-800 border-emerald-200'
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    await deleteArticleMultiTier(article.id);
    if (onDeleteArticle) {
      onDeleteArticle(article.id);
    }
  };

  const commentsCount = article.commentsCount ?? (article.commentsList ? article.commentsList.length : 12);
  const ratingValue = article.rating ?? 4.8;
  const ratingsCount = article.ratingsCount ?? 24;

  return (
    <article 
      onClick={() => onSelectArticle(article)}
      className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Cover Image & Category Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img 
            src={article.coverImage} 
            alt={article.coverAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5 max-w-[80%]">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${categoryColors[article.category] || 'bg-slate-100 text-slate-800'}`}>
              {article.category}
            </span>
            {typeof rankIndex === 'number' && rankIndex === 0 && (
              <span className="bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                المرتبة #1 بالخوارزمية
              </span>
            )}
            {article.calculatedScore && (
              <span className="bg-slate-900/90 text-emerald-400 border border-emerald-500/40 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                الدرجة: {article.calculatedScore}
              </span>
            )}
          </div>

          {/* Delete Action Button on Top Left of Card (Admin Only) */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="absolute top-3 left-3 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-xl backdrop-blur-md shadow-md transition flex items-center gap-1 text-xs font-bold z-10"
              title="حذف المقال (للإدارة فقط)"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">حذف</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Metadata Bar */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-cairo">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>قراءة {article.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-[#0F172A] font-tajawal group-hover:text-[#059669] transition line-clamp-2 leading-snug mb-2.5">
            {article.title}
          </h2>

          {/* Direct Answer / Intro */}
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 font-cairo">
            {article.introDirectAnswer}
          </p>

          {/* Value Added Bullet Snippet */}
          {article.valueAddedSummary && article.valueAddedSummary.length > 0 && (
            <div className="bg-[#F8FAFC] border-r-4 border-[#059669] rounded-l-xl p-3 mb-4 text-xs text-slate-700">
              <div className="font-bold text-[#059669] mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>الفائدة والقيمة المضافة (Value Added):</span>
              </div>
              <p className="text-slate-600 line-clamp-1">
                • {article.valueAddedSummary[0]}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-0.5 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Author & Metrics */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onNavigateToProfile) onNavigateToProfile();
          }}
          className="flex items-center gap-2 hover:text-[#059669] transition group/author"
          title="عرض الملف الشخصي للكاتب"
        >
          <img 
            src={article.author.avatar} 
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover border border-slate-300 group-hover/author:border-[#059669]"
          />
          <span className="text-xs font-semibold text-slate-700 group-hover/author:text-[#059669] underline-offset-2 group-hover/author:underline">{article.author.name}</span>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 text-amber-600 font-extrabold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{ratingValue}</span>
          </span>
          <span className="flex items-center gap-1 text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            <MessageSquare className="w-3 h-3 text-blue-500" />
            <span>{commentsCount}</span>
          </span>
          <span className="flex items-center gap-0.5 text-slate-500" title="المشاهدات">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.views}</span>
          </span>
          <span className="flex items-center gap-0.5 text-slate-500" title="الإعجابات">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{article.likes}</span>
          </span>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-default"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 font-bold text-lg font-tajawal">
              <div className="p-2 bg-red-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span>تأكيد حذف المقال</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-cairo">
              هل أنت أسر برغبتك في حذف المقال <strong>"{article.title}"</strong> نهائياً من قاعدة البيانات والمنصة؟ لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(false);
                }}
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
    </article>
  );
};
