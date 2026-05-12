# AGENTS.md

> Lee este archivo completo antes de generar o modificar cualquier línea de código en este repositorio.

## Alcance

Este archivo aplica a todo el monorepo. Si tocas código dentro de `frontend/` o `functions/`, lee también su `AGENTS.md` local si existe.

## Resumen del proyecto

`Gestión de Horarios Universitarios` es una plataforma web que genera horarios académicos óptimos mediante un motor CSP (Backtracking + MRV + Forward Checking).

### Stack base

| Capa          | Tecnología                                                 |
| ------------- | ---------------------------------------------------------- |
| Frontend      | React 19 · Vite 6 · TypeScript strict · npm workspaces     |
| Backend       | Node.js 20 · Express · TypeScript                          |
| Base de datos | MongoDB · Mongoose                                         |
| Auth          | JWT (JSON Web Tokens) en Backend MERN                      |
| Estado FE     | Zustand · React Hook Form · Zod                            |
| Infra         | Docker · Docker Compose · Firebase Hosting (solo Frontend) |
| Solver CSP    | TypeScript nativo en `backend/src/application/usecases`    |

## Reglas absolutas

- **Backend MERN** nunca confía en el cliente: se valida JWT, rol y el payload con Zod antes de tocar MongoDB.
- Lógica crítica (créditos, prerrequisitos, generar horario) va **solo en Backend**, nunca en el cliente.
- En TypeScript **prohibido `any`**. Usa `unknown` o tipos explícitos.
- Nunca commitees secrets ni `.env` reales. Usa `.env.example` para documentar variables.
- Arquitectura hexagonal en `backend/src/`: `domain -> application -> infrastructure`. `domain` no importa nada de Express o MongoDB.
- Los handlers (controladores REST) son delgados: parsean input, autorizan, delegan al use case.

## Arquitectura backend (Node.js MERN)

```
backend/src/
├── domain/
│   ├── model/          # Tipos puros (Course, Teacher, Schedule, ...)
│   ├── errors/         # Errores de dominio tipados
│   └── ports/          # Interfaces para adapters
├── application/
│   └── usecases/       # Orquestación sin dependencias de Express o MongoDB
├── infrastructure/
│   ├── database/       # Conexión Mongoose y Modelos (MongoDB)
│   └── http/           # Rutas y Handlers REST
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

# Backend
npm -w backend run dev
npm -w backend run build

# Docker (MERN)
docker-compose up -d        # levanta MongoDB (y opcionalmente backend)
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
