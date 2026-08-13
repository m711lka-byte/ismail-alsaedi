import React, { useState } from 'react';
import { Article } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Plus, 
  Trash2, 
  Eye, 
  ThumbsUp, 
  Star, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  LogOut, 
  AlertTriangle,
  Award,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { deleteArticleMultiTier } from '../lib/articleStorage';

interface AdminDashboardProps {
  articles: Article[];
  isAdminLoggedIn: boolean;
  onAdminLogin: (passcode: string) => boolean;
  onAdminLogout: () => void;
  onOpenCreateArticle: () => void;
  onDeleteArticle: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout,
  onOpenCreateArticle,
  onDeleteArticle,
  onSelectArticle
}) => {
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdminLogin(passcode);
    if (!success) {
      setLoginError('رمز المرور غير صحيح. يرجى إدخال رمز دخول المسؤول المعتمد.');
    } else {
      setLoginError('');
      setPasscode('');
    }
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    await deleteArticleMultiTier(articleToDelete.id);
    onDeleteArticle(articleToDelete.id);
    setIsDeleting(false);
    setArticleToDelete(null);
  };

  // Stats calculations
  const totalArticles = articles.length;
  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalLikes = articles.reduce((acc, a) => acc + (a.likes || 0), 0);
  const totalComments = articles.reduce((acc, a) => acc + (a.commentsCount || (a.commentsList ? a.commentsList.length : 0)), 0);

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0F172A] font-tajawal">
              لوحة تحكم المسؤول (Admin Dashboard)
            </h2>
            <p className="text-xs text-slate-500 font-cairo">
              منطقة محمية خاصة بإدارة مقالات وحلول إسماعيل الساعدي. أدخل رمز المرور للمتابعة.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-[#059669]" />
                <span>رمز دخول الأدمن (PIN / Passcode):</span>
              </label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setLoginError('');
                }}
                placeholder="أدخل رمز المرور الخاص بالإدارة"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center font-mono font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-700 border border-red-200 text-xs p-3 rounded-xl font-bold flex items-center gap-2 text-right">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#059669] hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>تسجيل الدخول كمسؤول</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Admin Header Bar */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold font-tajawal text-white">لوحة تحكم المسؤول</h1>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                ADMIN LOGGED IN
              </span>
            </div>
            <p className="text-xs text-slate-400 font-cairo">
              صلاحيات كاملة لإضافة، تعديل، وحذف مقالات منصة إسماعيل الساعدي
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenCreateArticle}
            className="flex-1 sm:flex-none bg-[#059669] hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مقال جديد</span>
          </button>

          <button
            onClick={onAdminLogout}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition border border-slate-700 flex items-center justify-center gap-1.5"
            title="تسجيل الخروج من لوحة التحكم"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-cairo">
            <span>إجمالي المقالات</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-[#0F172A] font-mono block">{totalArticles}</span>
          <span className="text-[10px] text-emerald-600 font-bold">منشورة ونشطة</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-cairo">
            <span>مجموع المشاهدات</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-extrabold text-[#0F172A] font-mono block">{totalViews}</span>
          <span className="text-[10px] text-blue-600 font-bold">زيارات موثقة</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-cairo">
            <span>مجموع الإعجابات</span>
            <ThumbsUp className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-[#0F172A] font-mono block">{totalLikes}</span>
          <span className="text-[10px] text-purple-600 font-bold">تفاعلات قراء</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-cairo">
            <span>التعليقات والمناقشات</span>
            <MessageSquare className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-extrabold text-[#0F172A] font-mono block">{totalComments}</span>
          <span className="text-[10px] text-amber-600 font-bold">تعليق نشط</span>
        </div>
      </div>

      {/* Admin Articles Management Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#059669]" />
              <span>إدارة المقالات وإجراءات الحذف الخاصة بالمسؤول</span>
            </h2>
            <p className="text-xs text-slate-500 font-cairo">
              الزر المباشر لحذف مقال معين متاح هنا وفي أغطية البطاقات حصرياً عند تسجيل دخول المسؤول.
            </p>
          </div>

          <span className="text-xs font-bold bg-emerald-50 text-[#059669] px-3 py-1 rounded-full border border-emerald-200">
            {articles.length} مقال
          </span>
        </div>

        <div className="space-y-4">
          {articles.map((article, idx) => (
            <div 
              key={article.id}
              className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-300"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] bg-[#059669] text-white px-2 py-0.5 rounded-full font-bold">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      #{idx + 1}
                    </span>
                    {article.calculatedScore && (
                      <span className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold">
                        درجة الخوارزمية: {article.calculatedScore}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-sm font-tajawal line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-cairo">
                    نُشر بتاريخ {article.publishDate} • {article.views} مشاهدة • {article.likes} إعجاب
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <button
                  onClick={() => onSelectArticle(article)}
                  className="px-3.5 py-2 bg-white hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 transition flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>معاينة</span>
                </button>

                <button
                  onClick={() => setArticleToDelete(article)}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
                  title="حذف هذا المقال نهائياً"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف المقال</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 font-bold text-lg font-tajawal">
              <div className="p-2 bg-red-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span>تأكيد حذف المقال من قبل المسؤول</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-cairo">
              هل أنت متأكد من رغبتك كمسؤول في حذف المقال <strong>"{articleToDelete.title}"</strong> نهائياً من المنصة وقواعد البيانات السحابية والمحلية؟
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition flex items-center gap-2"
              >
                {isDeleting ? (
                  <span>جاري الحذف...</span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>تأكيد الحذف النهائي</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
