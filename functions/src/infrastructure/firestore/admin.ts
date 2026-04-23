import { getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Lazy-initialised Firebase Admin app. Functions that need Firestore import
 * `adminDb()` and reuse a single instance across cold starts.
 */
function getAdminApp(): App {
  const existing = getApps();
  return existing.length > 0 ? existing[0]! : initializeApp();
}

let cachedDb: Firestore | null = null;
export function adminDb(): Firestore {
  if (!cachedDb) {
    cachedDb = getFirestore(getAdminApp());
  }
  return cachedDb;
}
