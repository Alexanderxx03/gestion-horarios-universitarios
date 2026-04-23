# Contribuir al proyecto

## Requisitos

- Node.js 20 (usa `nvm use` para alinearte con `.nvmrc`)
- Firebase CLI (`npm i -g firebase-tools`)
- Java JDK 17+ (requerido por los emuladores de Firebase)

## Setup inicial

```bash
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
cd gestion-horarios-universitarios
nvm use
npm install
npm run prepare        # activa hooks de Husky
```

## Flujo de trabajo

1. Crea una rama desde `main`: `git checkout -b feat/nombre-descriptivo`.
2. Asegúrate de que `npm run lint`, `npm run typecheck` y `npm run test` pasan.
3. Los pre-commit hooks corren Prettier sobre archivos staged automáticamente.
4. Commits siguen Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.
5. Abre PR contra `main`. CI debe pasar antes de mergear.

## Reglas obligatorias

Lee `AGENTS.md` antes de abrir cualquier PR. En particular:

- No uses `any` en TypeScript.
- No crees instancias Firebase fuera de `frontend/src/lib/firebase.ts`.
- Toda lógica de negocio crítica va en Cloud Functions, no en el cliente.
- Las `firestore.rules` son parte del contrato; si cambian, añade tests en `tests/rules/`.

## Ejecutar emuladores

```bash
npm run emulators
```

Puertos expuestos (ver `firebase.json`):

- Firestore: 8080
- Functions: 5001
- Auth: 9099
- Hosting: 5000
- Emulator UI: 4000

## Preguntas

Abre un issue o contacta al equipo en el canal de Slack del proyecto.
