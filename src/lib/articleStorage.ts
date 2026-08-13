import { Article } from '../types';
import { INITIAL_ARTICLES } from '../data/initialArticles';
import { saveArticleToFirestore, deleteArticleFromFirestore } from './firebase';
import { sortArticlesByScore } from './articleRanking';

const CUSTOM_ARTICLES_KEY = 'esmail_custom_articles_v1';
const DELETED_ARTICLES_KEY = 'esmail_deleted_article_ids_v1';

/**
 * Get custom articles stored in localStorage
 */
export function getLocalArticles(): Article[] {
  try {
    const raw = localStorage.getItem(CUSTOM_ARTICLES_KEY);
    if (raw) {
      return JSON.parse(raw) as Article[];
    }
  } catch (err) {
    console.warn("Could not read local articles:", err);
  }
  return [];
}

/**
 * Get set of deleted article IDs from localStorage
 */
export function getDeletedArticleIds(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_ARTICLES_KEY);
    if (raw) {
      return new Set(JSON.parse(raw) as string[]);
    }
  } catch (err) {
    console.warn("Could not read deleted article IDs:", err);
  }
  return new Set();
}

/**
 * Combine Firestore, LocalStorage, and Initial fallback articles safely.
 */
export function getMergedArticles(firestoreArticles: Article[] = []): Article[] {
  const localArticles = getLocalArticles();
  const deletedIds = getDeletedArticleIds();

  const articleMap = new Map<string, Article>();

  // 1. Load initial hardcoded articles
  INITIAL_ARTICLES.forEach(art => {
    if (!deletedIds.has(art.id)) {
      articleMap.set(art.id, art);
    }
  });

  // 2. Override with LocalStorage articles
  localArticles.forEach(art => {
    if (!deletedIds.has(art.id)) {
      articleMap.set(art.id, art);
    }
  });

  // 3. Override with Firestore articles (if available)
  firestoreArticles.forEach(art => {
    if (!deletedIds.has(art.id)) {
      articleMap.set(art.id, art);
    }
  });

  const merged = Array.from(articleMap.values());
  return sortArticlesByScore(merged);
}

/**
 * Multi-Tier Save Function:
 * Saves article to LocalStorage + Server API + Firestore
 */
export async function saveArticleMultiTier(article: Article): Promise<boolean> {
  let isSavedLocally = false;

  // 1. Tier 1: LocalStorage (Instant Sync Guarantee)
  try {
    const currentLocal = getLocalArticles();
    const updatedLocal = [article, ...currentLocal.filter(a => a.id !== article.id)];
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(updatedLocal));

    // Remove from deleted IDs if previously deleted
    const deletedSet = getDeletedArticleIds();
    if (deletedSet.has(article.id)) {
      deletedSet.delete(article.id);
      localStorage.setItem(DELETED_ARTICLES_KEY, JSON.stringify(Array.from(deletedSet)));
    }
    isSavedLocally = true;
  } catch (err) {
    console.warn("Error saving article to localStorage:", err);
  }

  // 2. Tier 2: Backend Express Server API (/api/articles)
  try {
    await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
  } catch (err) {
    console.warn("Could not sync article with Express backend server:", err);
  }

  // 3. Tier 3: Firebase Firestore
  try {
    await saveArticleToFirestore(article);
  } catch (err) {
    console.warn("Could not save article to Firestore:", err);
  }

  return isSavedLocally;
}

/**
 * Multi-Tier Add Comment Function:
 * Adds a new comment to an article, updates commentsCount and algorithm score, and saves across tiers.
 */
export async function addCommentToArticleMultiTier(articleId: string, newCommentText: string, authorName: string = 'زائر', starRating?: number): Promise<Article | null> {
  const articles = getMergedArticles();
  const target = articles.find(a => a.id === articleId);
  if (!target) return null;

  const newCommentObj = {
    id: 'comm-' + Date.now(),
    authorName: authorName.trim() || 'زائر متفاعل',
    text: newCommentText,
    createdAt: 'الآن',
    rating: starRating
  };

  const currentComments = target.commentsList || [];
  const updatedComments = [newCommentObj, ...currentComments];
  const newCommentsCount = updatedComments.length;

  let newAverageRating = target.rating || 4.8;
  let newRatingsCount = target.ratingsCount || 10;

  if (starRating) {
    const totalRatingSum = (newAverageRating * newRatingsCount) + starRating;
    newRatingsCount += 1;
    newAverageRating = Number((totalRatingSum / newRatingsCount).toFixed(1));
  }

  const updatedArticle: Article = {
    ...target,
    commentsList: updatedComments,
    commentsCount: newCommentsCount,
    rating: newAverageRating,
    ratingsCount: newRatingsCount
  };

  await saveArticleMultiTier(updatedArticle);
  return updatedArticle;
}

/**
 * Multi-Tier Add Rating Function:
 * Recalculates article rating average and saves across tiers.
 */
export async function addRatingToArticleMultiTier(articleId: string, starRating: number): Promise<Article | null> {
  const articles = getMergedArticles();
  const target = articles.find(a => a.id === articleId);
  if (!target) return null;

  const currentAvg = target.rating || 4.8;
  const currentCount = target.ratingsCount || 10;
  const newCount = currentCount + 1;
  const newAvg = Number((((currentAvg * currentCount) + starRating) / newCount).toFixed(1));

  const updatedArticle: Article = {
    ...target,
    rating: newAvg,
    ratingsCount: newCount
  };

  await saveArticleMultiTier(updatedArticle);
  return updatedArticle;
}

/**
 * Multi-Tier Delete Function:
 * Removes article from LocalStorage + Server API + Firestore
 */
export async function deleteArticleMultiTier(articleId: string): Promise<boolean> {
  // 1. Tier 1: LocalStorage
  try {
    const currentLocal = getLocalArticles();
    const filteredLocal = currentLocal.filter(a => a.id !== articleId);
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(filteredLocal));

    const deletedSet = getDeletedArticleIds();
    deletedSet.add(articleId);
    localStorage.setItem(DELETED_ARTICLES_KEY, JSON.stringify(Array.from(deletedSet)));
  } catch (err) {
    console.warn("Error deleting article from localStorage:", err);
  }

  // 2. Tier 2: Backend Express Server API
  try {
    await fetch(`/api/articles/${articleId}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn("Could not delete article on Express server:", err);
  }

  // 3. Tier 3: Firebase Firestore
  try {
    await deleteArticleFromFirestore(articleId);
  } catch (err) {
    console.warn("Could not delete article from Firestore:", err);
  }

  return true;
}
