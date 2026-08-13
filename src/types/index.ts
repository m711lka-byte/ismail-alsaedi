export type CategoryType = 'برمجة' | 'يوميات' | 'إعلانات' | 'خدمات' | 'الكل';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ImpactMetric {
  label: string;
  before: string;
  after: string;
  change: string;
}

export interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  metrics: ImpactMetric[];
}

export interface ArticleComment {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
  rating?: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  keyword: string;
  introDirectAnswer: string;
  category: 'برمجة' | 'يوميات' | 'إعلانات' | 'خدمات';
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishDate: string;
  updatedDate: string;
  readTime: string;
  views: number;
  likes: number;
  coverImage: string;
  coverAlt: string;
  contentMarkdown: string;
  caseStudy?: CaseStudy;
  valueAddedSummary: string[];
  recommendations: string[];
  faqs: FAQItem[];
  tags: string[];
  isFeatured?: boolean;
  rating?: number; // 0 to 5 e.g. 4.9
  ratingsCount?: number; // Total ratings received
  commentsCount?: number; // Total comments
  commentsList?: ArticleComment[]; // List of comments
  qualityScore?: number; // 0 to 100
  seoReachScore?: number; // 0 to 100
  calculatedScore?: number; // Total calculated algorithm score
}

export interface BrandColor {
  name: string;
  hex: string;
  usage: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export interface TechnicalCheckitem {
  title: string;
  description: string;
  codeSnippet?: string;
  status: 'جاهز' | 'موصى به' | 'مطلوب';
}
