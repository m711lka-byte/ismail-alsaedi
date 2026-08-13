import React, { useState } from 'react';
import { ARTICLE_MARKDOWN_TEMPLATE, JSON_LD_SCHEMA_TEMPLATE } from '../data/templateData';
import { FileCode, Copy, Check, Sparkles, Download } from 'lucide-react';

export const TemplateSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'md' | 'schema'>('md');
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const copyText = (text: string, type: 'md' | 'schema') => {
    navigator.clipboard.writeText(text);
    if (type === 'md') {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    } else {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    }
  };

  const downloadFile = (filename: string, text: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Banner */}
      <div className="bg-[#0F172A] text-white p-8 rounded-3xl shadow-lg border border-slate-800">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
          <Sparkles className="w-4 h-4" />
          <span>قالب تحرير احترافي</span>
        </div>
        <h1 className="text-3xl font-extrabold font-tajawal mb-2">
          قالب مقال جاهز (Template) حسب المنهجية المعتمدة
        </h1>
        <p className="text-slate-300 text-sm font-cairo leading-relaxed">
          يمكنك استخدام هذا القالب القياسي مباشرة لكتابة المقالات وإصدارها متضمنة الهيكلة المعيارية (الكلمة المفتاحية، الإجابة المباشرة، H2/H3، جداول الحالة، والـ FAQs).
        </p>
      </div>

      {/* Tabs & Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('md')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'md'
                  ? 'bg-[#059669] text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              قالب المحتوى (Markdown Template)
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'schema'
                  ? 'bg-[#059669] text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              قالب Schema JSON-LD
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'md' ? (
              <>
                <button
                  onClick={() => copyText(ARTICLE_MARKDOWN_TEMPLATE, 'md')}
                  className="flex items-center gap-1.5 bg-[#059669] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
                >
                  {copiedMd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMd ? 'تم النسخ!' : 'نسخ قالب Markdown'}</span>
                </button>
                <button
                  onClick={() => downloadFile('ARTICLE_TEMPLATE.md', ARTICLE_MARKDOWN_TEMPLATE)}
                  className="p-1.5 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition"
                  title="تحميل كملف Markdown"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => copyText(JSON_LD_SCHEMA_TEMPLATE, 'schema')}
                  className="flex items-center gap-1.5 bg-[#059669] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
                >
                  {copiedSchema ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSchema ? 'تم النسخ!' : 'نسخ قالب Schema'}</span>
                </button>
                <button
                  onClick={() => downloadFile('SCHEMA_TEMPLATE.json', JSON_LD_SCHEMA_TEMPLATE)}
                  className="p-1.5 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition"
                  title="تحميل كملف JSON"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-6 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
          {activeTab === 'md' ? (
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-300 leading-relaxed whitespace-pre-wrap font-mono">
              {ARTICLE_MARKDOWN_TEMPLATE}
            </pre>
          ) : (
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-amber-300 leading-relaxed whitespace-pre-wrap font-mono">
              {JSON_LD_SCHEMA_TEMPLATE}
            </pre>
          )}
        </div>

      </div>

      {/* Usage Checklist */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs text-slate-700 font-cairo">
        <h3 className="font-bold text-[#0F172A] text-sm font-tajawal flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#059669]" />
          <span>توجيهات التعبئة والتنفيذ:</span>
        </h3>
        <ul className="list-disc list-inside space-y-1.5 text-slate-600">
          <li>استبدل الحقول بين الأقواس المربعة \`[...] \` بالقيم الواقعية الخاصة بمشروعك.</li>
          <li>احرص على ألا تزيد الإجابة المباشرة المرفقة في أول المقال عن 4 lines للحصول على أعلى نسبة ظهور في AI Overviews.</li>
          <li>قم دائماً بتعديل الجدول لتضمين الأرقام الملموسة قبل وبعد التعديل.</li>
        </ul>
      </div>

    </div>
  );
};
