# 08 · Instalación y Configuración Local

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión Mínima | Enlace                                                        |
| ----------- | -------------- | ------------------------------------------------------------- |
| **Node.js** | 20.x LTS       | [nodejs.org](https://nodejs.org/)                             |
| **npm**     | 9.x            | (incluido con Node.js)                                        |
| **MongoDB** | 7.x            | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git**     | 2.x            | [git-scm.com](https://git-scm.com/)                           |

### Verificar instalación

```bash
node --version      # v20.x.x
npm --version       # 9.x.x
mongod --version    # db version v7.x.x
git --version       # git version 2.x.x
```

---

## Paso 1 – Clonar el Repositorio

```bash
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
cd gestion-horarios-universitarios
```

---

## Paso 2 – Configurar el Backend (Node.js + Express)

```bash
cd functions
npm install
```

### Variables de Entorno del Backend

```bash
cp .env.example .env
```

Editar `.env` con los datos de tu entorno:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/gestion-horarios
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Iniciar el servidor Express:

```bash
npm run dev     # Con hot-reload (nodemon)
# o
npm start       # Producción
```

El backend estará en: **http://localhost:3001**

---

## Paso 3 – Configurar el Frontend (React + Vite)

```bash
cd ../frontend
npm install
```

### Variables de Entorno del Frontend

```bash
cp .env.example .env.local
```

Editar `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=UniHorarios
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará en: **http://localhost:5173**

---

## Paso 4 – Iniciar MongoDB Local

```bash
# Opción A: MongoDB Community instalado localmente
mongod --dbpath ./data/db

# Opción B: Docker
docker run -d -p 27017:27017 --name mongo-horarios mongo:7

# Opción C: MongoDB Atlas (nube gratuita)
# Cambiar MONGODB_URI en .env por la URI de conexión de Atlas
```

---

## Paso 5 – Cargar Datos de Prueba

```bash
# Desde la raíz del proyecto
node scripts/seed-database.js
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
# Backend
cd functions
npm run dev                     # Servidor Express con hot-reload
npm run build                   # Compilar TypeScript
npm run lint                    # Linting TypeScript

# Frontend
cd frontend
npm run dev                     # Servidor Vite desarrollo
npm run build                   # Build producción
npm run lint                    # Linting TypeScript
npm run type-check              # Verificar tipos

# Base de datos
mongod --dbpath ./data/db       # Iniciar MongoDB local
node scripts/seed-database.js   # Poblar datos de prueba
```

---

## Problemas Comunes

| Problema                         | Solución                                                      |
| -------------------------------- | ------------------------------------------------------------- |
| `mongod: command not found`      | Instalar MongoDB Community o usar Docker                      |
| `ECONNREFUSED` en el backend     | Verificar que MongoDB esté corriendo                          |
| Variables de entorno `undefined` | Asegurarse de que el archivo se llame `.env.local` (frontend) |
| Error de JWT `invalid signature` | Verificar que `JWT_SECRET` sea el mismo en frontend y backend |

---

> 🔗 Anterior: [← Requerimientos](07-Requerimientos) | Siguiente: [Despliegue →](09-Despliegue-Firebase)
