
'use server';

import { Resend } from 'resend';
import { format } from 'date-fns';

const toEmail = 'custodiosdetierrasanta@gmail.com';
const fromEmail = 'onboarding@resend.dev';

interface JoinRequestData {
    fullName: string;
    dni: string;
    birthDate: string;
    email: string;
    phone: string;
    address?: string;
    experience?: string[];
    motivation?: string;
}

export async function sendJoinRequestEmail(data: JoinRequestData) {
    if (!process.env.RESEND_API_KEY) {
        const message = 'RESEND_API_KEY no está configurada. El correo de notificación no se enviará, pero la solicitud continuará.';
        if (process.env.NODE_ENV === 'production') {
            console.error(message);
        } else {
            console.warn(message);
        }
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `Nueva Solicitud de Unión: ${data.fullName}`;
    
    const birthDate = format(new Date(data.birthDate), 'dd/MM/yyyy');

    const emailBody = `
        <h1>Nueva Solicitud de Unión</h1>
        <p>Se ha recibido una nueva solicitud para unirse a los Cruzados de la Vera Cruz.</p>
        <h2>Detalles del Solicitante:</h2>
        <ul>
            <li><strong>Nombre Completo:</strong> ${data.fullName}</li>
            <li><strong>DNI/NIE:</strong> ${data.dni}</li>
            <li><strong>Fecha de Nacimiento:</strong> ${birthDate}</li>
            <li><strong>Correo Electrónico:</strong> ${data.email}</li>
            <li><strong>Teléfono:</strong> ${data.phone}</li>
            <li><strong>Dirección:</strong> ${data.address || 'No especificada'}</li>
            <li><strong>Experiencia:</strong> ${data.experience?.join(', ') || 'No especificada'}</li>
            <li><strong>Motivación:</strong> ${data.motivation || 'No especificada'}</li>
        </ul>
    `;

    try {
        const { data: responseData, error } = await resend.emails.send({
            from: `Cruzados de la Vera Cruz <${fromEmail}>`,
            to: [toEmail],
            subject: subject,
            html: emailBody,
        });

        if (error) {
            // No volver a lanzar el error para no detener el flujo principal si el correo falla
            console.error('Error al enviar el correo con Resend:', error);
            return;
        }

        console.log('Correo de notificación enviado con éxito:', responseData);

    } catch (exception) {
        console.error('Una excepción ocurrió al intentar enviar el correo:', exception);
    }
}


interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function sendContactEmail(data: ContactFormData) {
    if (!process.env.RESEND_API_KEY) {
        const message = 'RESEND_API_KEY no está configurada. El correo de contacto no se enviará.';
        console.error(message);
        // En este caso, sí lanzamos un error porque el envío de correo es la acción principal.
        throw new Error(message);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `Nuevo Mensaje de Contacto: ${data.subject}`;

    const emailBody = `
        <h1>Nuevo Mensaje desde el Formulario de Contacto</h1>
        <p>Has recibido un nuevo mensaje a través de la web.</p>
        <h2>Detalles del Mensaje:</h2>
        <ul>
            <li><strong>Nombre:</strong> ${data.name}</li>
            <li><strong>Correo Electrónico del Remitente:</strong> ${data.email}</li>
            <li><strong>Asunto:</strong> ${data.subject}</li>
        </ul>
        <h2>Mensaje:</h2>
        <p style="white-space: pre-wrap;">${data.message}</p>
    `;

    const { data: responseData, error } = await resend.emails.send({
        from: `Formulario Web <${fromEmail}>`,
        to: [toEmail],
        subject: subject,
        reply_to: data.email, // Importante para poder responder directamente al usuario
        html: emailBody,
    });

    if (error) {
        console.error('Error al enviar el correo de contacto con Resend:', error);
        throw new Error('Error al enviar el correo con Resend.');
    }

    console.log('Correo de contacto enviado con éxito:', responseData);
}
