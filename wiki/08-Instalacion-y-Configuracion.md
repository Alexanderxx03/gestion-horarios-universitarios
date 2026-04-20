# 08 · Instalación y Configuración Local

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión Mínima | Enlace |
|---|---|---|
| **Node.js** | 20.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x | (incluido con Node.js) |
| **Firebase CLI** | 13.x | `npm install -g firebase-tools` |
| **Git** | 2.x | [git-scm.com](https://git-scm.com/) |
| **Cuenta Firebase** | — | [console.firebase.google.com](https://console.firebase.google.com/) |

### Verificar instalación

```bash
node --version      # v20.x.x
npm --version       # 9.x.x
firebase --version  # 13.x.x
git --version       # git version 2.x.x
```

---

## Paso 1 – Crear Proyecto en Firebase Console

1. Ir a [console.firebase.google.com](https://console.firebase.google.com/)
2. Click en **"Agregar proyecto"**
3. Nombre del proyecto: `gestion-horarios-uni`
4. Activar **Google Analytics** (opcional)
5. En el panel del proyecto, activar los siguientes servicios:
   - **Authentication** → Habilitar proveedores: Google + Email/Password
   - **Firestore Database** → Crear en modo **producción** (región: `us-central1`)
   - **Hosting** → Activar
   - **Functions** → Activar (requiere plan Blaze para deploy, pero plan Spark funciona en emuladores)

---

## Paso 2 – Clonar el Repositorio

```bash
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
cd gestion-horarios-universitarios
```

---

## Paso 3 – Instalar Firebase CLI y Vincular Proyecto

```bash
# Instalar Firebase CLI globalmente (si no lo tienes)
npm install -g firebase-tools

# Iniciar sesión en Firebase
firebase login

# Listar proyectos disponibles
firebase projects:list

# Vincular el proyecto local al proyecto Firebase
firebase use gestion-horarios-uni
```

---

## Paso 4 – Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

### Variables de Entorno del Frontend

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local
```

Editar `.env.local` con los datos de tu proyecto Firebase (los encuentras en Firebase Console → Configuración del proyecto → Aplicaciones web):

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=gestion-horarios-uni.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gestion-horarios-uni
VITE_FIREBASE_STORAGE_BUCKET=gestion-horarios-uni.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## Paso 5 – Instalar Dependencias de Cloud Functions

```bash
cd ../functions
npm install
```

### Variables de Entorno de Functions

```bash
cp .env.example .env
```

---

## Paso 6 – Iniciar Emuladores Firebase (Desarrollo Local)

Los emuladores permiten trabajar sin conexión a Firebase real.

```bash
# Desde la raíz del proyecto
firebase emulators:start
```

Esto inicia:

| Emulador | Puerto | URL |
|---|---|---|
| Authentication | 9099 | http://localhost:9099 |
| Firestore | 8080 | http://localhost:8080 |
| Functions | 5001 | http://localhost:5001 |
| Hosting | 5000 | http://localhost:5000 |
| **Emulator UI** | **4000** | **http://localhost:4000** |

---

## Paso 7 – Iniciar el Frontend en Modo Desarrollo

```bash
# En otra terminal
cd frontend
npm run dev
```

La aplicación estará en: **http://localhost:5173**

---

## Paso 8 – Cargar Datos de Prueba

Puedes usar el script de seed para cargar datos de ejemplo en el emulador:

```bash
# Desde la raíz del proyecto
node scripts/seed-emulator.js
```

Esto carga:
- 1 usuario ADMIN
- 1 usuario COORDINATOR
- 3 usuarios TEACHER
- 10 usuarios STUDENT
- 15 cursos con prereqs
- 8 docentes con disponibilidad
- 10 aulas (7 normales + 3 labs)
- 1 período académico activo

---

## Resumen de Comandos Útiles

```bash
# Desarrollo
npm run dev                          # Iniciar frontend
firebase emulators:start             # Iniciar todos los emuladores
firebase emulators:start --only auth,firestore  # Solo auth y firestore

# Testing
cd frontend && npm run lint          # Linting TypeScript
cd frontend && npm run type-check    # Verificar tipos
cd functions && npm run lint         # Linting Functions

# Build y Deploy (ver página de Despliegue)
cd frontend && npm run build         # Build de producción
firebase deploy                      # Deploy completo
```

---

## Estructura de Archivos de Configuración Firebase

```
├── firebase.json          ← Configuración de hosting, functions y Firestore rules
├── .firebaserc            ← ID del proyecto Firebase vinculado
├── firestore.rules        ← Reglas de seguridad de Firestore
└── firestore.indexes.json ← Índices compuestos de Firestore
```

### `firebase.json` de referencia

```json
{
  "hosting": {
    "public": "frontend/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "emulators": {
    "auth": { "port": 9099 },
    "functions": { "port": 5001 },
    "firestore": { "port": 8080 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 }
  }
}
```

---

## Problemas Comunes

| Problema | Solución |
|---|---|
| `firebase: command not found` | Ejecutar `npm install -g firebase-tools` |
| Error de permisos en emuladores | Verificar que el puerto no esté en uso |
| Variables de entorno `undefined` | Asegurarse de que el archivo se llame `.env.local` (no `.env`) |
| Error `auth/unauthorized-domain` | Agregar `localhost` como dominio autorizado en Firebase Console → Auth → Settings |

---

> 🔗 Anterior: [← Requerimientos](07-Requerimientos) | Siguiente: [Despliegue Firebase →](09-Despliegue-Firebase)
