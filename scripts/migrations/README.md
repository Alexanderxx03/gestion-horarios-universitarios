# Firestore migrations

Firestore es schemaless, pero el proyecto necesita pasos reproducibles para:

- Sembrar colecciones iniciales (`academic_periods`, `careers`, etc.).
- Aplicar cambios de estructura (`add field`, `rename`, backfill).
- Regenerar índices cuando cambia `firestore.indexes.json`.

## Convención

```
scripts/migrations/
├── 001_seed_academic_periods.ts
├── 002_add_isActive_to_courses.ts
└── ...
```

Cada script exporta una función `run(db: Firestore)` y un `id` numérico único.

## Registro de migraciones aplicadas

Se guarda en la colección `_migrations/{id}` con forma:

```json
{ "id": 1, "name": "seed_academic_periods", "appliedAt": "2026-04-01T12:00:00Z" }
```

El runner (pendiente) leerá `_migrations`, correrá sólo las migraciones faltantes y registrará el resultado.

## Ejecución (local contra emulador)

```bash
export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
npx ts-node scripts/migrations/run-migration.ts
```

## Ejecución (producción)

Requiere `GOOGLE_APPLICATION_CREDENTIALS` apuntando a una cuenta de servicio con rol `roles/datastore.user`. **Nunca** commitear esa clave.

> El runner (`run-migration.ts`) se implementará en un PR siguiente. Este README establece el contrato.
