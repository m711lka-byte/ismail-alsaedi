import React, { useState } from 'react';
import { Article, CategoryType } from '../types';
import { saveArticleMultiTier } from '../lib/articleStorage';
import { Plus, Trash2, Send, CheckCircle2, Sparkles, HelpCircle, BarChart3, AlertCircle } from 'lucide-react';

interface ArticleEditorProps {
  onArticleCreated: (article: Article) => void;
  onCancel: () => void;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({ onArticleCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<'برمجة' | 'يوميات' | 'إعلانات' | 'خدمات'>('برمجة');
  const [introDirectAnswer, setIntroDirectAnswer] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200');
  const [coverAlt, setCoverAlt] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState(`## المشكلة التقنية وأثرها
اكتب هنا وصف المشكلة والسبب الجذري...

## الحل العملي والخطوات
1. **الخطوة الأولى:** الإجراء الفوري
2. **الخطوة الثانية:** الإجراء الفوري

| المؤشر | قبل التعديل | بعد التعديل | النتيجة |
| :--- | :--- | :--- | :--- |
| **المعالج** | 80% | 25% | انخفاض |
`);
  const [valueAddedSummary, setValueAddedSummary] = useState<string[]>(['حل عملي مباشر بالأرقام', 'جدول مقارنة حقيقي']);
  const [newValueAdded, setNewValueAdded] = useState('');

  const [recommendations, setRecommendations] = useState<string[]>(['مراجعة أداء السيرفر أسبوعياً']);
  const [newRec, setNewRec] = useState('');

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    { question: 'ما هو الوقت المتوقع للتنفيذ؟', answer: 'أقل من يوم عمل واحد.' }
  ]);
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // Case Study State
  const [caseStudyTitle, setCaseStudyTitle] = useState('دراسة حالة تطبيقية في السوق السعودي');
  const [caseStudyProblem, setCaseStudyProblem] = useState('بطء استجابة النظام وتراكم بلاغات الدعم.');
  const [caseStudySolution, setCaseStudySolution] = useState('تطبيق الفهرسة المركبة مع Firestore Caching.');
  
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddValueAdded = () => {
    if (newValueAdded.trim()) {
      setValueAddedSummary([...valueAddedSummary, newValueAdded.trim()]);
      setNewValueAdded('');
    }
  };

  const handleRemoveValueAdded = (index: number) => {
    setValueAddedSummary(valueAddedSummary.filter((_, i) => i !== index));
  };

  const handleAddRec = () => {
    if (newRec.trim()) {
      setRecommendations([...recommendations, newRec.trim()]);
      setNewRec('');
    }
  };

  const handleRemoveRec = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const handleAddFaq = () => {
    if (faqQ.trim() && faqA.trim()) {
      setFaqs([...faqs, { question: faqQ.trim(), answer: faqA.trim() }]);
      setFaqQ('');
      setFaqA('');
    }
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !introDirectAnswer) {
      alert('الرجاء كتابة العنوان والإجابة المباشرة على الأقل.');
      return;
    }

    setIsSaving(true);

    const slug = title
      .toLowerCase()
      .replace(/[^\w\u0621-\u064A\s-]/g, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);

    const newArticle: Article = {
      id: 'art-' + Date.now(),
      slug: slug || 'article-' + Date.now(),
      title,
      keyword: keyword || title,
      introDirectAnswer,
      category,
      author: {
        name: 'إسماعيل الساعدي',
        role: 'مهندس حلول تقنية وبناء أنظمة برمجية',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        bio: 'متخصص في بناء وتكبير المنصات الرقمية وتحسين كفاءة قواعد البيانات والأداء البرمجي.'
      },
      publishDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      readTime: '5 دقائق',
      views: 1,
      likes: 1,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      coverAlt: coverAlt || title,
      contentMarkdown,
      valueAddedSummary,
      recommendations,
      faqs,
      tags: [category, 'إسماعيل_الساعدي', 'مقالات_تقنية'],
      caseStudy: {
        title: caseStudyTitle,
        problem: caseStudyProblem,
        solution: caseStudySolution,
        metrics: [
          { label: 'الأداء العام', before: 'بطيء', after: 'سريع جداً', change: 'تحسن ملموس' }
        ]
      }
    };

    // Save via Multi-Tier Storage (LocalStorage + Express Server + Firebase Firestore)
    await saveArticleMultiTier(newArticle);

    setIsSaving(false);
    setSuccessMsg('تم حفظ ونشر المقال بنجاح في Firebase Firestore!');
    
    setTimeout(() => {
      onArticleCreated(newArticle);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Editor Header */}
      <div className="bg-[#0F172A] text-white p-6 rounded-3xl shadow-md border border-slate-800 mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
            <Sparkles className="w-4 h-4" />
            <span>منهجية الـ 8 خطوات</span>
          </div>
          <h1 className="text-2xl font-bold font-tajawal">إضافة مقال جديد باسم «إسماعيل الساعدي»</h1>
          <p className="text-xs text-slate-300 font-cairo mt-1">يُحفظ تلقائياً في Firebase Firestore وتوليد JSON-LD Schema و RSS</p>
        </div>

        <button
          onClick={onCancel}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition"
        >
          إلغاء
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-950 text-emerald-200 border border-emerald-800 p-4 rounded-2xl mb-6 font-bold text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8 text-xs font-cairo text-slate-800">
        
        {/* Step 1 & Basic Details */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-base font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">1</span>
            <span>عنوان المقال والكلمة المفتاحية والتصنيف</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-slate-700">عنوان المقال (يحتوي الكلمة المفتاحية):</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: كيف تحسب وتخفض تكلفة استضافة قواعد البيانات في Firestore؟"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">التصنيف الرئيسي:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#059669]"
              >
                <option value="برمجة">برمجة</option>
                <option value="يوميات">يوميات</option>
                <option value="إعلانات">إعلانات</option>
                <option value="خدمات">خدمات</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">الكلمة المفتاحية الرئيسية (SEO Target):</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="مثال: خفض تكلفة Firestore المادية"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        {/* Step 2: Direct Answer */}
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <h2 className="text-base font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">2</span>
            <span>الإجابة المباشرة (Direct Answer / AI Overview Hook)</span>
          </h2>
          <p className="text-slate-500">اجعل الإجابة صريحة وموجزة في 2 إلى 3 أسطر لكي تظهر مباشرة في نتائج محركات البحث والذكاء الاصطناعي.</p>
          <textarea
            required
            rows={3}
            value={introDirectAnswer}
            onChange={(e) => setIntroDirectAnswer(e.target.value)}
            placeholder="اكتب الإجابة المباشرة والسريعة هنا..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs leading-relaxed focus:outline-none focus:border-[#059669]"
          />
        </div>

        {/* Step 3: Value Added Items */}
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <h2 className="text-base font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">3</span>
            <span>نقاط القيمة المضافة (Value Added Highlights)</span>
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newValueAdded}
              onChange={(e) => setNewValueAdded(e.target.value)}
              placeholder="إضافة نقطة فائدة عمليّة..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs"
            />
            <button
              type="button"
              onClick={handleAddValueAdded}
              className="bg-[#059669] text-white px-4 rounded-xl font-bold hover:bg-emerald-500 transition"
            >
              إضافة
            </button>
          </div>
          <div className="space-y-2 pt-2">
            {valueAddedSummary.map((val, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span>• {val}</span>
                <button type="button" onClick={() => handleRemoveValueAdded(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Content Markdown */}
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <h2 className="text-base font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">4</span>
            <span>المحتوى المنسق (H2, H3 والجداول)</span>
          </h2>
          <textarea
            rows={10}
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            className="w-full bg-slate-900 text-emerald-300 font-mono rounded-xl p-4 text-xs leading-relaxed focus:outline-none border border-slate-800"
          />
        </div>

        {/* Step 5: Case Study */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-base font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">5</span>
            <span>دراسة الحالة والأرقام الملموسة (Case Study)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={caseStudyTitle}
              onChange={(e) => setCaseStudyTitle(e.target.value)}
              placeholder="عنوان دراسة الحالة"
              className="bg-slate-50 border border-slate-300 rounded-xl p-2.5"
            />
            <input
              type="text"
              value={caseStudyProblem}
              onChange={(e) => setCaseStudyProblem(e.target.value)}
              placeholder="المشكلة العميقة"
              className="bg-slate-50 border border-slate-300 rounded-xl p-2.5"
            />
            <input
              type="text"
              value={caseStudySolution}
              onChange={(e) => setCaseStudySolution(e.target.value)}
              placeholder="الحل المنفذ"
              className="bg-slate-50 border border-slate-300 rounded-xl p-2.5"
            />
          </div>
        </div>

        {/* Step 6: FAQs */}
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <h2 className="text-base font-bold text-[#0F172A] font-tajawal flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">6</span>
            <span>الأسئلة الشائعة (FAQ)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={faqQ}
              onChange={(e) => setFaqQ(e.target.value)}
              placeholder="السؤال الشائع..."
              className="bg-slate-50 border border-slate-300 rounded-xl p-2.5"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={faqA}
                onChange={(e) => setFaqA(e.target.value)}
                placeholder="الإجابة المباشرة..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl p-2.5"
              />
              <button
                type="button"
                onClick={handleAddFaq}
                className="bg-[#059669] text-white px-4 rounded-xl font-bold hover:bg-emerald-500 transition"
              >
                إضافة
              </button>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            {faqs.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-[#0F172A]">س: {f.question}</span>
                  <p className="text-slate-600 text-[11px]">ج: {f.answer}</p>
                </div>
                <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step 7: Submit Button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#059669] hover:bg-emerald-500 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSaving ? 'جار الحفظ في Firestore...' : 'حفظ ونشر المقال الآن'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
