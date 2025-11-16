'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // When developing locally, always use the firebaseConfig object.
  // In production, Firebase App Hosting will provide the necessary environment variables.
  if (process.env.NODE_ENV !== 'production') {
    return getSdks(initializeApp(firebaseConfig));
  }

  // For production, attempt to initialize via App Hosting environment variables first.
  let firebaseApp;
  try {
    firebaseApp = initializeApp();
  } catch (e) {
    console.warn('Automatic Firebase initialization failed. Falling back to firebaseConfig. Error:', e);
    firebaseApp = initializeApp(firebaseConfig);
  }
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';
