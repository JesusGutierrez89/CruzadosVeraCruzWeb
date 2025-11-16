
'use server';

import { z } from 'zod';
import { createRecord, deleteRecord, updateRecord } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { initializeFirebaseOnServer } from '@/firebase/server-init';
import { createUserWithEmailAndPassword, updateProfile, signOut as firebaseSignOut } from 'firebase/auth';
import { sendContactEmail } from './email';

const RecordSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El nombre es menester.'),
  category: z.enum(['Texto', 'Documento', 'Imagen'], {
    errorMap: () => ({ message: 'Por favor, elegid un tipo.' }),
  }),
  description: z.string().min(1, 'La descripción es menester.'),
  files: z.any().optional(),
});


const CreateRecord = RecordSchema.omit({ id: true });
const UpdateRecord = RecordSchema.omit({ id: true });

export async function handleCreateRecord(formData: FormData) {
    const validatedFields = CreateRecord.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        files: formData.getAll('files'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. No se pudo crear la información.',
        };
    }
    
    // NOTE: File handling logic needs to be implemented.
    // For now, we'll just store names, but a real app needs to upload to a service like Firebase Storage.
    const files = validatedFields.data.files;
    const uploadedFiles = [];
    if(files && files.length > 0 && files[0].size > 0) {
        for (const file of files) {
            // This is a placeholder. In a real app, you would upload the file to cloud storage
            // and get a URL.
            uploadedFiles.push({name: file.name, url: `/uploads/placeholder/${file.name}`});
        }
    }

    try {
        const dataToSave = { ...validatedFields.data, files: uploadedFiles };
        await createRecord(dataToSave as any);
        revalidatePath('/dashboard');
        
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: 'Error de la base de datos: No se pudo crear la información.',
        };
    }
}

export async function handleUpdateRecord(id: string, formData: FormData) {
    const validatedFields = UpdateRecord.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        files: formData.getAll('files'),
    });
  
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. No se pudo enmendar la información.',
        };
    }
  
    // NOTE: File handling logic needs to be implemented.
    const files = validatedFields.data.files;
    const uploadedFiles = [];
    if(files && files.length > 0 && files[0].size > 0) {
        for (const file of files) {
             // This is a placeholder. In a real app, you would upload the file to cloud storage
            // and get a URL.
            uploadedFiles.push({name: file.name, url: `/uploads/placeholder/${file.name}`});
        }
    }
  
    try {
        const dataToSave = { ...validatedFields.data, files: uploadedFiles };
        await updateRecord(id, dataToSave as any);
        revalidatePath('/dashboard');
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: 'Error de la base de datos: No se pudo enmendar la información.',
        };
    }
}

export async function handleDeleteRecord(id: string) {
  try {
    await deleteRecord(id);
    revalidatePath('/dashboard');
    return {};
  } catch (error) {
    return {
      message: 'Error de la base de datos: No se pudo eliminar la información.',
    };
  }
}

export async function register(prevState: string | undefined, formData: FormData) {
    const { auth } = initializeFirebaseOnServer();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const username = formData.get('username') as string;

    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden.';
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, {
            displayName: username,
        });

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            return 'Este correo electrónico ya está registrado.';
        }
        console.error('Firebase Registration Error:', error);
        return 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.';
    }

    redirect('/dashboard');
}

export async function signOut() {
  const { auth } = initializeFirebaseOnServer();
  await firebaseSignOut(auth);
  redirect('/');
}

const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;
const ProfileFormSchema = z.object({
    address: z.string().optional(),
    birthDate: z.string().transform((str) => new Date(str)),
    phone: z.string().regex(phoneRegex, 'Por favor, introduce un número de teléfono móvil español válido.'),
    motivation: z.string().max(200, 'La motivación no puede exceder los 200 caracteres.').optional(),
});
export async function updateUser(docId: string, data: { [k: string]: any }) {
    const { firestore } = initializeFirebaseOnServer();
    const { doc, updateDoc } = await import('firebase/firestore');

    const validatedData = ProfileFormSchema.safeParse(data);

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Los datos proporcionados no son válidos.',
        };
    }
    
    const docRef = doc(firestore, 'joinRequests', docId);

    try {
        const dataToUpdate = {
            ...validatedData.data,
            birthDate: validatedData.data.birthDate.toISOString(),
        };

        await updateDoc(docRef, dataToUpdate);
        revalidatePath('/dashboard/settings');

    } catch (error: any) {
        console.error('Error al actualizar el documento:', error);
        return {
            message: 'No se pudo actualizar la información en la base de datos.',
        };
    }
}


const ContactFormSchema = z.object({
    name: z.string().min(1, 'El nombre es menester.'),
    email: z.string().email('Por favor, introduce un correo electrónico válido.'),
    subject: z.string().min(1, 'El asunto es menester.'),
    message: z.string().min(1, 'El mensaje es menester.'),
  });
  
  export async function handleContactForm(formData: FormData) {
    const validatedFields = ContactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan campos o son inválidos. No se pudo enviar el mensaje.',
      };
    }
  
    try {
      await sendContactEmail(validatedFields.data);
    } catch (error) {
      console.error('Email Error:', error);
      return {
        message: 'Error del servidor: No se pudo enviar el mensaje. Inténtalo más tarde.',
      };
    }
  }