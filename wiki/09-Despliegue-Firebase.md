# 09 · Despliegue (MERN en la Nube)

## Arquitectura de Despliegue

| Capa                        | Plataforma    | URL                                            |
| --------------------------- | ------------- | ---------------------------------------------- |
| **Frontend (React)**        | Vercel        | `https://gestion-unihorarios.vercel.app`       |
| **Backend (Node/Express)**  | Render        | `https://gestion-unihorarios-api.onrender.com` |
| **Base de Datos (MongoDB)** | MongoDB Atlas | Cluster M0 (gratuito)                          |

---

## Despliegue del Frontend en Vercel

```bash
# 1. Generar el build de producción
cd frontend
npm run build

# 2. Instalar CLI de Vercel (si no la tienes)
npm install -g vercel

# 3. Desplegar
vercel --prod
```

O conectar directamente el repositorio de GitHub en [vercel.com](https://vercel.com) y Vercel hará el deploy automático en cada push a `main`.

### Variables de Entorno en Vercel

Configurar en el panel de Vercel → Settings → Environment Variables:

```
VITE_API_BASE_URL=https://gestion-unihorarios-api.onrender.com/api
VITE_APP_NAME=UniHorarios
```

---

## Despliegue del Backend en Render

```bash
# El deploy es automático desde GitHub
# Solo se necesita configurar Render con el repositorio
```

Configurar en [render.com](https://render.com):

1. Crear nuevo **Web Service**
2. Conectar repositorio GitHub
3. **Root Directory:** `functions`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm start`

### Variables de Entorno en Render

```
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/gestion-horarios
JWT_SECRET=clave_secreta_muy_larga_y_segura
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

---

## Base de Datos: MongoDB Atlas

1. Ir a [cloud.mongodb.com](https://cloud.mongodb.com)
2. Crear proyecto y cluster **M0 (gratuito)**
3. Crear usuario de base de datos con permisos de lectura/escritura
4. Obtener la **Connection String** y usarla como `MONGODB_URI`
5. Agregar la IP de Render a la **IP Allowlist** (o usar `0.0.0.0/0` para permitir todas)

---

## CI/CD con GitHub Actions

Archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy MERN App

on:
  push:
    branches: [main]

jobs:
  deploy_frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install & Build Frontend
        run: |
          cd frontend
          npm ci
          npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Checklist de Despliegue

### Pre-deploy

- [ ] Variables de entorno configuradas en Vercel y Render
- [ ] `npm run build` sin errores en frontend
- [ ] `npm run build` sin errores en functions (TypeScript)
- [ ] MongoDB Atlas: usuario y IP configurados
- [ ] `JWT_SECRET` configurado en Render

### Post-deploy

- [ ] La URL de producción del frontend carga correctamente
- [ ] Login funciona en producción
- [ ] El backend responde en `/api/health`
- [ ] La generación de horario funciona end-to-end

---

> 🔗 Anterior: [← Instalación](08-Instalacion-y-Configuracion) | Siguiente: [Estándares de Calidad →](10-Estandares-Calidad)
