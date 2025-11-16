
export type Record = {
  id: string;
  name: string;
  category: 'Texto' | 'Documento' | 'Imagen';
  description: string;
  date_added: string;
  last_modified: string;
  files?: { name: string; url: string }[];
};

export type JoinRequest = {
  id: string;
  uid: string;
  fullName: string;
  dni: string;
  birthDate: string;
  email: string;
  phone: string;
  address?: string;
  experience?: string[];
  motivation?: string;
  submittedAt: string;
};

export type Evento = {
    id: string;
    date: string; // Stored as ISO string in Firestore
    title: string;
    description: string;
    time: string;
};
