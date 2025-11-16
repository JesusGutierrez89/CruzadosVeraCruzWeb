# Cruzados de la Vera Cruz

Aplicación web desarrollada con Next.js, TypeScript, Firebase y Tailwind CSS.

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Firebase** - Backend como servicio
- **Radix UI** - Componentes de UI primitivos
- **Genkit AI** - Integración con IA de Google
- **React Hook Form** - Manejo de formularios
- **Recharts** - Gráficos y visualización de datos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd WebCruzados/src
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Edita el archivo `.env.local` con tus credenciales de Firebase y Google AI.

## 🔧 Configuración de Firebase

El proyecto ya incluye la configuración de Firebase. Asegúrate de:

1. Tener un proyecto de Firebase configurado
2. Habilitar Authentication, Firestore y Storage
3. Configurar las reglas de seguridad apropiadas

## 🚀 Desarrollo

Ejecutar en modo desarrollo:
```bash
npm run dev
```

Construir para producción:
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── dashboard/      # Páginas del dashboard
│   ├── auth/           # Páginas de autenticación
│   └── ...
├── components/         # Componentes reutilizables
│   ├── ui/            # Componentes de UI base
│   ├── auth/          # Componentes de autenticación
│   └── dashboard/     # Componentes del dashboard
├── firebase/          # Configuración de Firebase
├── hooks/             # React Hooks personalizados
└── lib/              # Utilidades y configuración
```

## 🔑 Variables de Entorno Requeridas

```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
GOOGLE_AI_API_KEY=
```

## 🎨 Características

- ✅ Autenticación con Firebase Auth
- ✅ Base de datos con Firestore
- ✅ UI moderna con Tailwind CSS
- ✅ Componentes accesibles con Radix UI
- ✅ Tipado completo con TypeScript
- ✅ Integración con IA generativa
- ✅ Dashboard interactivo
- ✅ Responsive design

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación
- `npm run start` - Inicia la aplicación en producción
- `npm run lint` - Ejecuta ESLint
- `npm run type-check` - Verifica los tipos de TypeScript

## 🚨 Notas Importantes

1. **Genkit AI**: Si necesitas usar las funciones de IA, instala Genkit por separado:
   ```bash
   npm install genkit @genkit-ai/google-genai
   ```

2. **Variables de entorno**: Nunca subas el archivo `.env.local` al repositorio.

3. **Firebase**: Asegúrate de configurar las reglas de seguridad apropiadas en tu proyecto de Firebase.

## 🐛 Solución de Problemas

Si encuentras problemas durante la instalación:

1. Elimina `node_modules` y `package-lock.json`
2. Ejecuta `npm install` nuevamente
3. Si persisten los errores con Genkit, instálalo por separado después

## 📄 Licencia

[Especificar licencia]