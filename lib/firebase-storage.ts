// lib/firebase-storage.ts
'use server';
import { initializeFirebaseOnServer } from '@/firebase/server-init';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import 'server-only';

/**
 * Uploads a file to Firebase Storage and returns the download URL
 * @param file - The file to upload
 * @param commission - The commission folder (e.g., 'redes-sociales')
 * @param recordId - The record ID for organization
 * @returns Promise with download URL
 */
export async function uploadFile(
  fileBuffer: ArrayBuffer, 
  fileName: string, 
  commission: string, 
  recordId: string
): Promise<string> {
  try {
    const { storage } = initializeFirebaseOnServer();
    
    // Create a unique file path: commission/recordId/fileName
    const filePath = `comisiones/${commission}/${recordId}/${fileName}`;
    const fileRef = ref(storage, filePath);
    
    // Upload file
    const snapshot = await uploadBytes(fileRef, fileBuffer);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Deletes a file from Firebase Storage
 * @param fileUrl - The download URL of the file to delete
 */
export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    const { storage } = initializeFirebaseOnServer();
    
    // Extract the storage path from the download URL
    let storagePath = fileUrl;
    if (fileUrl.includes('firebasestorage.googleapis.com')) {
      const url = new URL(fileUrl);
      const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
      if (pathMatch) {
        storagePath = decodeURIComponent(pathMatch[1]);
      }
    }
    
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    // Don't throw error for delete operations to avoid breaking the flow
  }
}

/**
 * Uploads multiple files and returns their URLs
 * @param files - Array of files to upload  
 * @param commission - The commission folder
 * @param recordId - The record ID
 * @returns Array of file objects with name and URL
 */
export async function uploadFiles(
  files: { buffer: ArrayBuffer; name: string }[], 
  commission: string, 
  recordId: string
): Promise<{ name: string; url: string }[]> {
  const uploadPromises = files.map(async (file) => {
    const url = await uploadFile(file.buffer, file.name, commission, recordId);
    return { name: file.name, url };
  });
  
  return Promise.all(uploadPromises);
}

/**
 * Deletes multiple files from Firebase Storage
 * @param fileUrls - Array of file URLs to delete
 */
export async function deleteFiles(fileUrls: string[]): Promise<void> {
  const deletePromises = fileUrls.map(url => deleteFile(url));
  await Promise.allSettled(deletePromises);
}