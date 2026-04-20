# 09 · Despliegue en Firebase

## Requisitos Previos

- Firebase CLI instalada y sesión activa (`firebase login`)
- Proyecto Firebase creado y vinculado localmente (`.firebaserc`)
- Build del frontend generado (`npm run build` en `/frontend`)

---

## Despliegue Completo (Recomendado)

```bash
# 1. Generar el build de producción del frontend
cd frontend
npm run build
cd ..

# 2. Desplegar todo: hosting + reglas + índices
firebase deploy
```

---

## Despliegues Individuales

```bash
# Solo el frontend estático
firebase deploy --only hosting

# Solo las Cloud Functions
firebase deploy --only functions

# Solo las reglas de Firestore
firebase deploy --only firestore:rules

# Solo los índices de Firestore
firebase deploy --only firestore:indexes

# Hosting + Functions (sin reglas)
firebase deploy --only hosting,functions
```

---

## Verificar el Despliegue

```bash
# Ver el estado del hosting
firebase hosting:channel:list

# Abrir la URL del sitio en el navegador
firebase open hosting:site

# Ver logs de Cloud Functions en tiempo real
firebase functions:log --follow
```

---

## URLs del Proyecto Desplegado

| Recurso | URL |
|---|---|
| **Aplicación Web** | `https://gestion-horarios-uni.web.app` |
| **Firebase Console** | [console.firebase.google.com/project/gestion-horarios-uni](https://console.firebase.google.com/) |
| **Firestore Database** | Sección Firestore en la Console |
| **Functions Logs** | Sección Functions → Logs en la Console |

---

## Configuración de Seguridad para Producción

### Dominio Autorizado en Firebase Auth

Antes de hacer deploy, agregar el dominio de Firebase Hosting como dominio autorizado:

1. Ir a Firebase Console → Authentication → Settings → Domains autorizados
2. Agregar `gestion-horarios-uni.web.app`
3. Agregar `gestion-horarios-uni.firebaseapp.com`

### Reglas de Firestore en Producción

Las reglas de producción están en `firestore.rules`. Verificarlas antes del deploy:

```bash
# Probar las reglas sin desplegaer
firebase firestore:rules:get
```

---

## Preview Channels (Deploy de Vista Previa)

Firebase Hosting permite crear canales de preview para probar cambios sin afectar producción:

```bash
# Crear un canal de preview temporal (expira en 7 días)
firebase hosting:channel:deploy sprint-1-preview --expires 7d

# Ver la URL del canal
# → https://gestion-horarios-uni--sprint-1-preview-abc123.web.app
```

---

## CI/CD con GitHub Actions (Opcional)

Archivo `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install frontend dependencies
        run: cd frontend && npm ci

      - name: Build frontend
        run: cd frontend && npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: gestion-horarios-uni
```

### Configurar Secrets en GitHub

1. Ir al repositorio → Settings → Secrets and variables → Actions
2. Agregar cada variable `VITE_FIREBASE_*` como secret
3. Generar y agregar `FIREBASE_SERVICE_ACCOUNT` desde Firebase Console → Service Accounts

---

## Checklist de Despliegue

### Pre-deploy

- [ ] Variables de entorno del frontend correctas (`.env.local` no se sube a Git)
- [ ] `npm run build` sin errores
- [ ] Reglas de Firestore revisadas
- [ ] `firebase.json` configurado con el directorio `frontend/dist`
- [ ] Dominio autorizado en Firebase Auth

### Post-deploy

- [ ] La URL de producción carga correctamente
- [ ] Login con Google funciona en producción
- [ ] Las Cloud Functions responden correctamente
- [ ] Las reglas de Firestore bloquean accesos no autorizados

---

> 🔗 Anterior: [← Instalación](08-Instalacion-y-Configuracion) | Siguiente: [Estándares de Calidad →](10-Estandares-Calidad)
