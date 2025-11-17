
// IMPORTANT: This file is used for server-side initialization of Firebase services.
// It should not contain any client-side specific code or 'use client' directives.

import { firebaseConfig } from '@/firebase/config';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// This function is intended to be called from server-side code (e.g., Server Actions, API routes).
export function initializeFirebaseOnServer() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // When on the server, we always initialize using the explicit config.
  // Environment variables from App Hosting are handled on the client-side initialization.
  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}
