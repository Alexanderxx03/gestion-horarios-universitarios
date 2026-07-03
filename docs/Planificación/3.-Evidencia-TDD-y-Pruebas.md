# Evidencia de TDD (Test-Driven Development) y Pruebas Unitarias

La fiabilidad del Motor CSP y las integraciones de la base de datos se aseguran a través de un estricto pipeline de pruebas automatizadas construido con **Vitest**.

## 1. Cobertura de Lógica de Dominio (Domain Testing)

El código más crítico de la aplicación reside en el paquete `functions/src/domain/`. Estas funciones se desarrollan siguiendo TDD puro, creando primero el test y luego la lógica que lo satisface.

### 1.1 Tests del Constraint Checker (`constraintChecker.test.ts`)

Esta suite prueba exhaustivamente las "Hard Constraints".

- `[PASS]` Verifica que el validador rechace horarios donde el mismo docente tiene dos cursos simultáneos.
- `[PASS]` Verifica la validación de capacidad (Inscritos <= Capacidad del Aula).
- `[PASS]` Garantiza que no existan colisiones de Aula (dos secciones en la misma sala física a la misma hora).

### 1.2 Tests de Matrícula (`validateEnrollment.test.ts`)

- `[PASS]` Rechaza matrícula si no se han completado los pre-requisitos.
- `[PASS]` Rechaza matrícula si el estudiante ya excedió su límite de créditos permitidos en el semestre.
- `[PASS]` Aprueba matrículas válidas.

---

## 2. Validación y Seguridad de Datos (Zod + Firebase Rules)

### 2.1 Zod Schemas (`schemas.test.ts`)

Toda la data que entra o sale de nuestras Cloud Functions es estrictamente validada en tiempo de ejecución utilizando `zod`.

- Se escribieron pruebas unitarias para asegurar que los "Payloads" inválidos sean rechazados automáticamente antes de que la Function procese la transacción.
- Garantizamos integridad tipográfica (String, Number, Enums) y límites estructurales.

### 2.2 Pruebas de Reglas de Firestore (`firestore.rules`)

Las `firestore.rules` son la primera y última línea de defensa en el cliente web.
El proyecto incluye scripts que emulan a Firestore para probar los _Custom Claims_:

- `[PASS]` Un usuario con claim `{ role: 'ADMIN' }` puede escribir en la colección `/courses`.
- `[PASS]` Un usuario autenticado básico NO puede escribir en `/courses`.
- `[PASS]` Un estudiante solo puede leer su propio documento de perfil, validando que `request.auth.uid == resource.data.studentId`.

## 3. Integración Continua (CI Pipeline)

Para garantizar la inmutabilidad de la rama `main`, cualquier Pull Request dispara un Pipeline local (`npm run test`) que ejecuta:

1. `typecheck` en el Frontend y Functions.
2. Suite completa de Vitest.
3. Linting usando ESLint y Prettier.
