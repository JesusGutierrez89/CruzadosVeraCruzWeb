// lib/temp-data.ts - Sistema temporal sin Firestore
'use server';
import { Record } from './definitions';

// Datos temporales en memoria hasta que se configure Firestore
let tempRecords: { [commission: string]: Record[] } = {
  'redes-sociales': [
    {
      id: '1',
      name: 'Estrategia Redes Sociales 2024',
      category: 'Documento',
      description: 'Plan de contenidos para las redes sociales durante las fiestas patronales.',
      date_added: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      files: []
    },
    {
      id: '2', 
      name: 'Publicación San Andrés',
      category: 'Imagen',
      description: 'Fotografías del desfile en honor a San Andrés Apóstol.',
      date_added: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      files: []
    }
  ],
  'patrimonio': [
    {
      id: '3',
      name: 'Inventario Vestuario Histórico',
      category: 'Documento',
      description: 'Registro completo de trajes, armas y complementos históricos del grupo.',
      date_added: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      files: []
    }
  ],
  'avituallamiento': [
    {
      id: '4',
      name: 'Lista Material Desfiles',
      category: 'Documento', 
      description: 'Inventario del equipamiento necesario para desfiles y eventos.',
      date_added: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      files: []
    }
  ],
  'musica': [],
  'historia': [],
  'diseno': [],
  'dinamizacion': [],
  'relaciones': [],
  'general': []
};

type CommissionType = 'redes-sociales' | 'patrimonio' | 'avituallamiento' | 'musica' | 'historia' | 'diseno' | 'dinamizacion' | 'relaciones' | 'general';

let nextId = 1000; // Para generar IDs únicos

/**
 * Obtiene registros temporales
 */
export async function getTempRecords(searchTerm?: string, commission: CommissionType = 'general'): Promise<Record[]> {
  try {
    let records = tempRecords[commission] || [];
    
    // Aplicar filtro de búsqueda si se proporciona
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
    console.error('Error fetching temp records:', error);
    return [];
  }
}

/**
 * Obtiene un registro temporal por ID
 */
export async function getTempRecordById(id: string, commission: CommissionType = 'general'): Promise<Record | null> {
  try {
    const records = tempRecords[commission] || [];
    return records.find(record => record.id === id) || null;
  } catch (error) {
    console.error('Error fetching temp record:', error);
    return null;
  }
}

/**
 * Crea un nuevo registro temporal
 */
export async function createTempRecord(
  data: Omit<Record, 'id' | 'date_added' | 'last_modified'>, 
  commission: CommissionType = 'general'
): Promise<Record> {
  try {
    if (!tempRecords[commission]) {
      tempRecords[commission] = [];
    }
    
    const newRecord: Record = {
      id: (nextId++).toString(),
      ...data,
      date_added: new Date().toISOString(),
      last_modified: new Date().toISOString()
    };
    
    tempRecords[commission].unshift(newRecord); // Agregar al principio
    
    return newRecord;
  } catch (error) {
    console.error('Error creating temp record:', error);
    throw new Error('Failed to create temp record');
  }
}

/**
 * Actualiza un registro temporal
 */
export async function updateTempRecord(
  id: string, 
  data: Partial<Omit<Record, 'id' | 'date_added'>>,
  commission: CommissionType = 'general'
): Promise<Record | null> {
  try {
    const records = tempRecords[commission] || [];
    const index = records.findIndex(record => record.id === id);
    
    if (index === -1) {
      throw new Error('Record not found');
    }
    
    const updatedRecord = {
      ...records[index],
      ...data,
      last_modified: new Date().toISOString()
    };
    
    tempRecords[commission][index] = updatedRecord;
    
    return updatedRecord;
  } catch (error) {
    console.error('Error updating temp record:', error);
    throw new Error('Failed to update temp record');
  }
}

/**
 * Elimina un registro temporal
 */
export async function deleteTempRecord(id: string, commission: CommissionType = 'general'): Promise<void> {
  try {
    const records = tempRecords[commission] || [];
    const index = records.findIndex(record => record.id === id);
    
    if (index === -1) {
      throw new Error('Record not found');
    }
    
    tempRecords[commission].splice(index, 1);
  } catch (error) {
    console.error('Error deleting temp record:', error);
    throw new Error('Failed to delete temp record');
  }
}