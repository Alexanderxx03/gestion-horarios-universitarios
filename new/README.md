# Scaffold delivery — cómo aplicarlo en tu máquina

Dos formatos incluidos. **Usa el bundle, es más fiable** (incluye el commit entero con su SHA, autor y mensaje original). El patch es un respaldo.

Base del commit: `164e9e8` (`docs: Sprint 0 completo - README, Wiki ...`) en `origin/main`.
Commit del scaffold: `8951a75` — `chore: initial scaffold (frontend + functions + ci + hardened rules)`.

## Opción A — git bundle (recomendada)

Desde tu clon local del repo (asegúrate de tener `main` actualizado):

```bash
cd /ruta/a/gestion-horarios-universitarios
git fetch origin
git checkout main
git pull --ff-only

# Trae el commit del scaffold desde el bundle
git fetch /ruta/al/scaffold.bundle devin/1776972275-scaffold-inicial:devin/1776972275-scaffold-inicial
git checkout devin/1776972275-scaffold-inicial

# Pusheas la rama
git push -u origin devin/1776972275-scaffold-inicial
```

Luego abre el PR contra `main` en GitHub.

## Opción B — patch (si el bundle falla)

```bash
cd /ruta/a/gestion-horarios-universitarios
git fetch origin
git checkout -b devin/1776972275-scaffold-inicial origin/main
git am /ruta/al/scaffold.patch
git push -u origin devin/1776972275-scaffold-inicial
```

Si `git am` falla por conflictos (no debería, la base es la misma), revierte con `git am --abort` y usa el bundle.

## Verificación post-push

En local, antes o después del push, puedes correr todo el CI del scaffold:

```bash
nvm use         # Node 20
npm install
npm run lint
npm run typecheck
npm run test
npm -w frontend run build
npm -w functions run build
npm run rules:test   # requiere Java 17 para el emulador de Firestore
```

Todo esto pasa en mi entorno.

## Título y cuerpo sugeridos para el PR

**Título:**
`chore: initial scaffold (frontend + functions + ci + hardened rules)`

**Cuerpo:** usar el contenido de `.github/PULL_REQUEST_TEMPLATE.md` (se autorrellena en GitHub) y pegar arriba un resumen:

> Scaffold inicial del monorepo con frontend (Vite + React 19 + TS strict), Cloud Functions (hexagonal, Zod, Vitest), reglas de Firestore endurecidas con tests en el emulador, 3 workflows de CI y pre-commit con Husky + lint-staged.
