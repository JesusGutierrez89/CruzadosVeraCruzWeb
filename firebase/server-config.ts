// firebase/server-config.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'server-only';
import { firebaseConfig } from './config';

// Función para inicializar Firebase en el servidor
function initializeServerFirebase() {
  if (getApps().length > 0) {
    return getApp();
  }
  
  return initializeApp(firebaseConfig);
}

// Instancia de Firestore para el servidor
const app = initializeServerFirebase();
export const db = getFirestore(app);