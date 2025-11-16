
'use server';
import 'server-only';
import { Record } from './definitions';

// This is a temporary in-memory data store.
// In a real application, this would be a database.
const initialRecords: Record[] = [
    {
        id: '1',
        name: 'Juramento del Cruzado',
        category: 'Texto',
        description: 'El juramento solemne que todo nuevo miembro debe prestar ante la Vera Cruz y sus hermanos.',
        date_added: '2024-04-15T10:00:00Z',
        last_modified: '2024-05-20T14:30:00Z',
    },
    {
        id: '2',
        name: 'Manual de Formación de Combate',
        category: 'Documento',
        description: 'Documento PDF con las formaciones, movimientos y coreografías de combate para los desfiles.',
        date_added: '2024-04-16T11:20:00Z',
        last_modified: '2024-05-22T09:00:00Z',
        files: [{ name: 'formacion_combate_v3.pdf', url: '#' }],
    },
    {
        id: '3',
        name: 'Diseño del Estandarte',
        category: 'Imagen',
        description: 'Archivos de imagen con el diseño oficial del estandarte del grupo para la temporada actual.',
        date_added: '2024-04-18T18:00:00Z',
        last_modified: '2024-05-18T12:00:00Z',
        files: [{ name: 'estandarte_final.jpg', url: '#' }, { name: 'estandarte_vectores.svg', url: '#' }],
    },
    {
        id: '4',
        name: 'Acta de la última Asamblea',
        category: 'Documento',
        description: 'Resumen y decisiones tomadas en la última asamblea general de los Cruzados.',
        date_added: '2024-05-10T20:00:00Z',
        last_modified: '2024-05-10T20:00:00Z',
    },
    {
        id: '5',
        name: 'Himno "El Diví"',
        category: 'Texto',
        description: 'Letra completa de nuestro himno en latín y su traducción al castellano.',
        date_added: '2024-04-15T10:05:00Z',
        last_modified: '2024-04-15T10:05:00Z',
    },
];

let records: Record[] = [...initialRecords];


/**
 * Fetches records from the in-memory store, with optional search.
 * @param searchTerm A string to search for in name, description, or category.
 * @returns A promise that resolves to an array of Record objects.
 */
export async function getRecords(searchTerm?: string): Promise<Record[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredRecords = records;

  if (searchTerm) {
    const lowercasedQuery = searchTerm.toLowerCase();
    filteredRecords = records.filter(
      (record) =>
        record.name.toLowerCase().includes(lowercasedQuery) ||
        record.description.toLowerCase().includes(lowercasedQuery) ||
        record.category.toLowerCase().includes(lowercasedQuery)
    );
  }

  // Sort by last modified date, descending.
  return filteredRecords.sort((a, b) => new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime());
}

/**
 * Fetches a single record by its ID from the in-memory store.
 * @param id The ID of the record.
 * @returns A promise that resolves to a Record object or null if not found.
 */
export async function getRecordById(id: string): Promise<Record | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const record = records.find((r) => r.id === id);
    return record || null;
}

/**
 * Creates a new record in the in-memory store.
 * @param data The record data to create.
 */
export async function createRecord(data: Omit<Record, 'id' | 'date_added' | 'last_modified'>) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newRecord: Record = {
        id: String(Date.now()), // Simple unique ID
        ...data,
        date_added: new Date().toISOString(),
        last_modified: new Date().toISOString(),
    };
    records.push(newRecord);
    return newRecord;
}

/**
 * Updates an existing record in the in-memory store.
 * @param id The ID of the record to update.
 * @param data The partial data to update.
 */
export async function updateRecord(id: string, data: Partial<Omit<Record, 'id' | 'date_added'>>) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const recordIndex = records.findIndex((r) => r.id === id);
    if (recordIndex !== -1) {
        records[recordIndex] = {
            ...records[recordIndex],
            ...data,
            last_modified: new Date().toISOString(),
        };
        return records[recordIndex];
    }
    throw new Error('Record not found');
}

/**
 * Deletes a record from the in-memory store.
 * @param id The ID of the record to delete.
 */
export async function deleteRecord(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initialLength = records.length;
    records = records.filter((r) => r.id !== id);
    if (records.length === initialLength) {
        throw new Error('Record not found');
    }
}
