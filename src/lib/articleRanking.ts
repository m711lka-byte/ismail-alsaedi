import { Article } from '../types';

export interface ScoreBreakdown {
  totalScore: number;
  ratingScore: number;       // 30% weight
  commentsScore: number;     // 25% weight
  qualityScore: number;      // 25% weight
  seoReachScore: number;     // 20% weight
  rawRating: number;
  commentsCount: number;
  viewsCount: number;
  likesCount: number;
}

/**
 * Internal Article Scoring & Ranking Algorithm:
 * Article Score = (التقييم × 0.30) + (نسبة التعليقات × 0.25) + (درجة الجودة × 0.25) + (درجة الوصول لمحركات البحث × 0.20)
 */
export function getArticleScoreBreakdown(article: Article): ScoreBreakdown {
  // 1. Rating component (Weight: 30%)
  const rawRating = article.rating ?? 4.8;
  const ratingNormalized = (rawRating / 5) * 100;
  const ratingScore = Number((ratingNormalized * 0.30).toFixed(1));

  // 2. Comments & Engagement Ratio component (Weight: 25%)
  const commentsCount = article.commentsCount ?? (article.commentsList ? article.commentsList.length : Math.floor((article.likes || 10) * 0.3));
  const viewsCount = article.views > 0 ? article.views : 200;
  // Comment engagement ratio (comments / views scaled) + comment volume
  const ratioRaw = (commentsCount / viewsCount) * 1000;
  const commentsNormalized = Math.min(100, Math.max(20, Math.round(ratioRaw * 8 + commentsCount * 3)));
  const commentsScore = Number((commentsNormalized * 0.25).toFixed(1));

  // 3. Quality Score component (Weight: 25%)
  let qualityRaw = article.qualityScore ?? 0;
  if (!qualityRaw) {
    let score = 25; // base score
    if (article.contentMarkdown && article.contentMarkdown.length > 800) score += 20;
    if (article.caseStudy && article.caseStudy.metrics && article.caseStudy.metrics.length > 0) score += 20;
    if (article.faqs && article.faqs.length > 0) score += 15;
    if (article.valueAddedSummary && article.valueAddedSummary.length > 0) score += 10;
    if (article.coverImage) score += 10;
    qualityRaw = Math.min(100, score);
  }
  const qualityScore = Number((qualityRaw * 0.25).toFixed(1));

  // 4. Views, Likes & SEO Reach Score component (Weight: 20%)
  const likesCount = article.likes || 0;
  let seoRaw = article.seoReachScore ?? 0;
  if (!seoRaw) {
    let score = 30;
    if (article.keyword) score += 15;
    if (article.introDirectAnswer && article.introDirectAnswer.length > 50) score += 15;
    if (article.tags && article.tags.length >= 3) score += 10;
    // Views & Likes contribution
    const viewsPart = Math.min(15, Math.floor(viewsCount / 100));
    const likesPart = Math.min(15, Math.floor(likesCount / 10));
    score += viewsPart + likesPart;
    seoRaw = Math.min(100, score);
  }
  const seoReachScore = Number((seoRaw * 0.20).toFixed(1));

  // Total Score (0 - 100)
  const totalScore = Number((ratingScore + commentsScore + qualityScore + seoReachScore).toFixed(1));

  return {
    totalScore,
    ratingScore,
    commentsScore,
    qualityScore,
    seoReachScore,
    rawRating,
    commentsCount,
    viewsCount,
    likesCount
  };
}

export function calculateArticleScore(article: Article): number {
  return getArticleScoreBreakdown(article).totalScore;
}

/**
 * Sorts array of articles in descending order of their calculated algorithm score
 */
export function sortArticlesByScore(articles: Article[]): Article[] {
  return [...articles].map(article => ({
    ...article,
    calculatedScore: calculateArticleScore(article)
  })).sort((a, b) => (b.calculatedScore || 0) - (a.calculatedScore || 0));
}
