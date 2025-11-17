// lib/firestore-data.ts
'use server';
import { db } from '@/firebase/server-config';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import 'server-only';
import { Record } from './definitions';

// Collection names for each commission
const COLLECTIONS = {
  'redes-sociales': 'records_redes_sociales',
  'avituallamiento': 'records_avituallamiento', 
  'patrimonio': 'records_patrimonio',
  'musica': 'records_musica',
  'historia': 'records_historia',
  'diseno': 'records_diseno',
  'dinamizacion': 'records_dinamizacion',
  'relaciones': 'records_relaciones',
  'general': 'records_general' // For backwards compatibility
} as const;

type CommissionType = keyof typeof COLLECTIONS;

/**
 * Fetches records from Firestore for a specific commission
 */
export async function getRecords(searchTerm?: string, commission: CommissionType = 'general'): Promise<Record[]> {
  try {
    const collectionName = COLLECTIONS[commission];
    const recordsRef = collection(db, collectionName);
    let recordsQuery = query(recordsRef, orderBy('last_modified', 'desc'));
    
    const querySnapshot = await getDocs(recordsQuery);
    let records: Record[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      records.push({
        id: doc.id,
        name: data.name || '',
        category: data.category || 'Documento',
        description: data.description || '',
        date_added: data.date_added || new Date().toISOString(),
        last_modified: data.last_modified || new Date().toISOString(),
        files: data.files || []
      });
    });

    // Apply search filter if provided
    if (searchTerm) {
      const lowercasedQuery = searchTerm.toLowerCase();
      records = records.filter(
        (record) =>
          record.name.toLowerCase().includes(lowercasedQuery) ||
          record.description.toLowerCase().includes(lowercasedQuery) ||
          record.category.toLowerCase().includes(lowercasedQuery)
      );
    }

    return records;
  } catch (error) {
    console.error('Error fetching records:', error);
    return [];
  }
}

/**
 * Fetches a single record by ID from Firestore
 */
export async function getRecordById(id: string, commission: CommissionType = 'general'): Promise<Record | null> {
  try {
    const collectionName = COLLECTIONS[commission];
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        category: data.category || 'Documento',
        description: data.description || '',
        date_added: data.date_added || new Date().toISOString(),
        last_modified: data.last_modified || new Date().toISOString(),
        files: data.files || []
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching record:', error);
    return null;
  }
}

/**
 * Creates a new record in Firestore
 */
export async function createRecord(
  data: Omit<Record, 'id' | 'date_added' | 'last_modified'>, 
  commission: CommissionType = 'general'
) {
  try {
    const collectionName = COLLECTIONS[commission];
    const recordsRef = collection(db, collectionName);
    
    const newRecord = {
      ...data,
      date_added: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };
    
    const docRef = await addDoc(recordsRef, newRecord);
    
    return {
      id: docRef.id,
      ...data,
      date_added: newRecord.date_added,
      last_modified: newRecord.last_modified
    };
  } catch (error) {
    console.error('Error creating record:', error);
    throw new Error('Failed to create record');
  }
}

/**
 * Updates an existing record in Firestore
 */
export async function updateRecord(
  id: string, 
  data: Partial<Omit<Record, 'id' | 'date_added'>>,
  commission: CommissionType = 'general'
) {
  try {
    const collectionName = COLLECTIONS[commission];
    const docRef = doc(db, collectionName, id);
    
    const updateData = {
      ...data,
      last_modified: new Date().toISOString(),
      updated_at: serverTimestamp()
    };
    
    await updateDoc(docRef, updateData);
    
    // Return updated record
    return await getRecordById(id, commission);
  } catch (error) {
    console.error('Error updating record:', error);
    throw new Error('Failed to update record');
  }
}

/**
 * Deletes a record from Firestore
 */
export async function deleteRecord(id: string, commission: CommissionType = 'general') {
  try {
    const collectionName = COLLECTIONS[commission];
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting record:', error);
    throw new Error('Failed to delete record');
  }
}

/**
 * Initialize collections with sample data (run once)
 */
export async function initializeCommissionData(commission: CommissionType) {
  const sampleData: Partial<{ [K in CommissionType]: Array<{ name: string; category: 'Texto' | 'Documento' | 'Imagen'; description: string; }> }> = {
    'redes-sociales': [
      {
        name: 'Estrategia de Contenido 2024',
        category: 'Documento' as const,
        description: 'Plan de contenidos para redes sociales del grupo durante las fiestas.',
      }
    ],
    'avituallamiento': [
      {
        name: 'Inventario de Equipamiento',
        category: 'Documento' as const,
        description: 'Lista completa del material disponible para desfiles y eventos.',
      }
    ],
    'patrimonio': [
      {
        name: 'Registro de Vestuario',
        category: 'Documento' as const,
        description: 'Inventario completo de trajes, armas y complementos del grupo.',
      }
    ]
    // Add more sample data for other commissions as needed
  };

  const data = sampleData[commission];
  if (data) {
    for (const record of data) {
      await createRecord(record, commission);
    }
  }
}