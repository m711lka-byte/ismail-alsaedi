import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot, 
  query, 
  orderBy, 
  increment,
  Timestamp 
} from 'firebase/firestore';
import { Article } from '../types';

// Standard Firebase Configuration check
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForPreviewModeOnly12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "esmail-alsaadi-blog.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "esmail-alsaadi-blog",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "esmail-alsaadi-blog.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "617716817799",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:617716817799:web:a1b2c3d4e5f6g7h8"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Check if Firebase is using fallback/demo credentials
export const isFirestoreConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_PROJECT_ID && 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyDummyKeyForPreviewModeOnly12345"
);
export const isFirestoreDemo = !isFirestoreConfigured;

// Firestore Collection Reference
const ARTICLES_COLLECTION = 'articles';

/**
 * Fetch articles with real-time updates from Firestore
 */
export function subscribeArticles(
  onUpdate: (articles: Article[]) => void,
  fallbackArticles: Article[]
) {
  if (!isFirestoreConfigured) {
    onUpdate(fallbackArticles);
    return () => {};
  }

  try {
    const q = query(collection(db, ARTICLES_COLLECTION), orderBy('publishDate', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate(fallbackArticles);
        } else {
          const articles = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          })) as Article[];
          onUpdate(articles);
        }
      },
      (error) => {
        console.warn("Firestore snapshot listener notice (using reactive fallback):", error.message);
        onUpdate(fallbackArticles);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Using local articles state:", err);
    onUpdate(fallbackArticles);
    return () => {};
  }
}

/**
 * Save or update article in Firestore
 */
export async function saveArticleToFirestore(article: Article): Promise<boolean> {
  if (!isFirestoreConfigured) return false;
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, article.id);
    await setDoc(articleRef, {
      ...article,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving article to Firestore:", error);
    return false;
  }
}

/**
 * Increment view count in Firestore
 */
export async function incrementArticleViews(articleId: string) {
  if (!isFirestoreConfigured) return;
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await updateDoc(articleRef, {
      views: increment(1)
    });
  } catch {
    // Ignore error in fallback mode
  }
}

/**
 * Increment likes in Firestore
 */
export async function toggleArticleLike(articleId: string) {
  if (!isFirestoreConfigured) return;
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await updateDoc(articleRef, {
      likes: increment(1)
    });
  } catch {
    // Ignore error in fallback mode
  }
}

/**
 * Delete article from Firestore
 */
export async function deleteArticleFromFirestore(articleId: string): Promise<boolean> {
  if (!isFirestoreConfigured) return false;
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await deleteDoc(articleRef);
    return true;
  } catch (error) {
    console.error("Error deleting article from Firestore:", error);
    return false;
  }
}

