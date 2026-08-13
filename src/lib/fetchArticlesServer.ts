import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { INITIAL_ARTICLES } from '../data/initialArticles';
import { sortArticlesByScore } from './articleRanking';
import { Article } from '../types';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForPreviewModeOnly12345",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "esmail-alsaadi-blog.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || "esmail-alsaadi-blog",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "esmail-alsaadi-blog.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "617716817799",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:617716817799:web:a1b2c3d4e5f6g7h8"
};

const isConfigured = Boolean(
  (process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID) &&
  (process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY) &&
  (process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY) !== "AIzaSyDummyKeyForPreviewModeOnly12345"
);

/**
 * Server-side helper to fetch merged initial + Firestore articles
 * for dynamic RSS, Sitemap, and API endpoints on both Vercel Serverless and Express.
 */
export async function fetchAllArticlesServer(): Promise<Article[]> {
  const articleMap = new Map<string, Article>();

  // 1. Seed initial fallback articles
  INITIAL_ARTICLES.forEach(art => {
    articleMap.set(art.id, art);
  });

  if (!isConfigured) {
    return sortArticlesByScore(Array.from(articleMap.values()));
  }

  // 2. Fetch from Firestore via Firebase JS SDK
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, 'articles'));

    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Article;
        if (data && data.title) {
          articleMap.set(docSnap.id || data.id, {
            ...data,
            id: docSnap.id || data.id
          });
        }
      });
    }
  } catch (sdkErr) {
    console.warn("Server Firestore SDK fetch notice (attempting REST API fallback):", sdkErr);

    // 3. REST API Fallback
    try {
      const projectId = firebaseConfig.projectId;
      const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/articles`);
      if (res.ok) {
        const json: any = await res.json();
        if (json.documents && Array.isArray(json.documents)) {
          json.documents.forEach((docItem: any) => {
            const fields = docItem.fields;
            if (fields) {
              const parseValue = (v: any): any => {
                if (!v) return null;
                if (v.stringValue !== undefined) return v.stringValue;
                if (v.integerValue !== undefined) return parseInt(v.integerValue, 10);
                if (v.doubleValue !== undefined) return parseFloat(v.doubleValue);
                if (v.booleanValue !== undefined) return v.booleanValue;
                if (v.arrayValue !== undefined) {
                  return (v.arrayValue.values || []).map(parseValue);
                }
                if (v.mapValue !== undefined) {
                  const obj: any = {};
                  for (const key in v.mapValue.fields || {}) {
                    obj[key] = parseValue(v.mapValue.fields[key]);
                  }
                  return obj;
                }
                return null;
              };

              const parsedArticle: any = {};
              for (const fieldKey in fields) {
                parsedArticle[fieldKey] = parseValue(fields[fieldKey]);
              }

              if (parsedArticle.id && parsedArticle.title) {
                articleMap.set(parsedArticle.id, parsedArticle as Article);
              }
            }
          });
        }
      }
    } catch (restErr) {
      console.warn("REST API fallback failed, using hardcoded initial articles:", restErr);
    }
  }

  const merged = Array.from(articleMap.values());
  return sortArticlesByScore(merged);
}
