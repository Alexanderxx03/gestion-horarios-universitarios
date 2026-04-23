# AGENTS.md

> Lee este archivo completo antes de generar o modificar cualquier línea de código en este repositorio.

## Alcance

Este archivo aplica a todo el monorepo. Si tocas código dentro de `frontend/` o `functions/`, lee también su `AGENTS.md` local si existe.

## Resumen del proyecto

`Gestión de Horarios Universitarios` es una plataforma web que genera horarios académicos óptimos mediante un motor CSP (Backtracking + MRV + Forward Checking).

### Stack base

| Capa | Tecnología |
|---|---|
| Frontend | React 19 · Vite 6 · TypeScript strict · npm workspaces |
| Backend | Firebase Cloud Functions (Node.js 20) · TypeScript |
| Base de datos | Cloud Firestore |
| Auth | Firebase Authentication · Custom Claims (`role`) |
| Estado FE | Zustand · React Hook Form · Zod |
| Infra | Firebase Hosting · Firebase Functions · Firebase Emulators |
| Solver CSP | TypeScript nativo en `functions/src/application/usecases` |

## Reglas absolutas

- **Firestore Rules** son la primera línea de defensa; toda operación debe pasar por `firestore.rules`.
- **Cloud Functions** nunca confían en el cliente: validan `request.auth`, el rol y el payload con Zod antes de tocar Firestore.
- **Custom Claims** (`role`) se setean **solo** desde una Cloud Function protegida por `ADMIN`, jamás desde el cliente.
- Lógica crítica (créditos, prerrequisitos, generar horario) va **solo en Functions**, nunca en el cliente.
- En TypeScript **prohibido `any`**. Usa `unknown` o tipos explícitos.
- Una sola instancia de Firebase en `frontend/src/lib/firebase.ts`. Nada de `initializeApp` repartido.
- Nunca commitees secrets, `service-account*.json`, tokens, ni `.env` reales. Usa `.env.example` para documentar variables.
- Secretos de Functions: `defineSecret` de `firebase-functions/params` + Firebase Secret Manager.
- En Cloud Functions HTTP (`onRequest`), CORS siempre con allowlist. Nunca `*`.
- Arquitectura hexagonal en `functions/src/`: `domain -> application -> infrastructure`. `domain` no importa nada de Firebase.
- Los handlers (`onCall`, `onRequest`) son delgados: parsean input, autorizan, delegan al use case.
- Índices Firestore declarados en `firestore.indexes.json`. Toda query nueva con filtros compuestos requiere su índice.

## Arquitectura backend (Cloud Functions)

```
functions/src/
├── domain/
│   ├── model/          # Tipos puros (Course, Teacher, Schedule, ...)
│   ├── errors/         # Errores de dominio tipados
│   └── ports/          # Interfaces para adapters
├── application/
│   └── usecases/       # Orquestación sin dependencias de Firebase
├── infrastructure/
│   ├── firestore/      # Adapters concretos
│   └── http/           # Handlers onCall / onRequest
└── shared/
    ├── schemas/        # Zod schemas compartidos
    ├── authz.ts        # Helpers de autorización
    └── logger.ts       # Logger estructurado
```

## Comandos útiles

```bash
# Monorepo
npm install                 # instala todos los workspaces
npm run lint
npm run typecheck
npm run test
npm run format

# Frontend
npm -w frontend run dev
npm -w frontend run build
npm -w frontend run test

# Functions
npm -w functions run build
npm -w functions run test

# Firestore Rules tests
npm run rules:test

# Emuladores Firebase (Auth, Firestore, Functions, Hosting)
npm run emulators
```

## Git y commits

- Ramas: `feat/*`, `fix/*`, `refactor/*`, `docs/*`, `test/*`, `chore/*`.
- Commits con convención `feat|fix|refactor|docs|test|chore: mensaje`.
- PRs pasan CI (`ci-frontend`, `ci-functions`, `ci-rules`) obligatoriamente.
- Nunca push directo a `main`.

## Idioma

- Código fuente: inglés.
- Comentarios internos: inglés.
- Mensajes visibles al usuario: español.
- Documentación en `docs/` y `wiki/`: español.

## No existe todavía

Evita asumir implementados estos módulos mientras no existan en el código:

- Motor CSP completo (solo scaffold + tipos).
- App Check.
- Sistema de migraciones para Firestore (hay carpeta `scripts/migrations/` vacía).
- Flujo completo de matrícula (solo validación básica de ejemplo).
