# Estándares de Calidad y Políticas de Integración Continua (CI/CD)

## 1. Declaración de Misión de Calidad (Quality Charter)

El equipo de UniHorarios comprende que el código es efímero, pero la arquitectura y la calidad de construcción perduran. Este documento define las "Reglas del Juego" (Estándares de Codificación, Criterios de Aceptación y Políticas de Control de Versiones) a las cuales todo miembro del equipo se suscribe y obliga antes de fusionar (merge) una sola línea de código en la rama principal (Main/Master) de producción.

El objetivo central de este manifiesto de calidad es erradicar el factor humano del control de calidad. No dependemos de que un desarrollador "recuerde" probar su código; delegamos esa responsabilidad a canalizaciones automatizadas (CI Pipelines) que auditan despiadadamente la base del código.

---

## 2. Convenciones de Codificación (Code Standards)

La uniformidad del código reduce la deuda técnica, minimiza los errores de lectura y facilita la inducción de nuevos desarrolladores al equipo. Para forzar estas convenciones, UniHorarios emplea herramientas automáticas que prohíben subir código mal formateado (Mediante Husky Pre-commit Hooks).

### 2.1 Estándares de Tipado (TypeScript Strict Mode)
Se ha configurado el archivo `tsconfig.json` con la propiedad `"strict": true`. Esto fuerza a todo el equipo a adherirse a las siguientes normas:
- **Ausencia del `any` implícito:** Prohibido usar tipos `any` para escapar del tipado, pues destruye el propósito de TypeScript. Los contratos de datos (Interfaces) deben definir exactamente qué objetos transitan por la API.
- **Null Safety:** Obligación de validar si un objeto de la base de datos es `null` o `undefined` antes de leer sus propiedades, mitigando el famoso "Cannot read properties of undefined".

### 2.2 Estándares Estilísticos (Prettier & ESLint)
Toda disputa sobre si usar punto y coma, comillas simples o dobles, tabuladores o espacios, fue eliminada. 
- **ESLint:** Configurado con el *Standard JS* y recomendaciones de React. Obliga a los desarrolladores a colocar todas las dependencias necesarias en el array de un `useEffect` para prevenir bucles infinitos.
- **Prettier:** Formatea todo el documento automáticamente al guardar, obligando a usar comillas simples y tabulaciones de 2 espacios.

---

## 3. Barreras de Calidad (Quality Gates)

Un *Quality Gate* es una alcabala virtual que analiza el código subido a un *Pull Request* (PR) y le deniega el paso si no alcanza métricas de calidad mínimas.

### 3.1 La Política "Zero Tolerance" (Seguridad)
Ninguna rama (Branch) de desarrollo será aprobada si el análisis estático arroja vulnerabilidades de categoría **BLOCKER** o **CRITICAL** (ej. contraseñas quemadas o SQL/NoSQL Injections expuestos). Este es un límite no negociable.

### 3.2 El Umbral de Cobertura de Pruebas (Coverage Threshold)
Todo nuevo módulo desarrollado (Controlador, Componente, Servicio) debe contar con una suite de pruebas de Vitest o Jest que avale su funcionamiento. 
- La configuración del CI rechaza el Build si la métrica general de cobertura del proyecto decae con la inserción de nuevo código.
- Meta de Calidad Institucional: **> 70% de cobertura de código general (Coverage)**.

### 3.3 Límite de Deuda Técnica y Complejidad Cognitiva
No se permitirá subir funciones ciclópeas (Monolíticas). Si una función supera un puntaje de "15" en el medidor de **Cognitive Complexity** de SonarQube (demasiados condicionales `if-else` anidados en una misma rutina), la canalización obligará al programador a refactorizar, dividiendo la función gigante en 3 subfunciones atómicas y limpias.

---

## 4. Política Estricta de Control de Versiones (Git Workflow)

Para evitar el famoso problema de "Funciona en mi máquina, pero explotó en el servidor", se implementó una estrategia derivada de *GitFlow* y *Trunk-Based Development*.

### 4.1 Protección de Ramas (Branch Protection Rules)
La rama `main` (Producción) está bloqueada criptográficamente en GitHub.
- **Push Directo Prohibido:** Es imposible que un administrador o desarrollador ejecute un `git push origin main` saltándose los controles.
- **Revisión por Pares (Code Review):** Para integrar código a `main`, se requiere abrir un *Pull Request* (PR). Este PR exige la revisión aprobatoria de, al menos, un desarrollador secundario distinto al autor original (Técnica de los 4 ojos).
- **Aprobación de la Canalización (CI Pass):** El PR no habilita el botón verde de "Merge" hasta que los bots automatizados de GitHub Actions respondan con "Success" validando que las pruebas de Jest pasan y que la compilación (Build) no se rompe.

### 4.2 Nomenclatura de Commits (Conventional Commits)
Los mensajes de `git commit` deben apegarse al estándar internacional para facilitar la lectura del historial forense y la generación automática de versiones.
- `feat: [Módulo]` para nuevas características (ej. `feat: agregar filtro por facultad`).
- `fix: [Módulo]` para parchear bugs en producción (ej. `fix: corregir superposición visual de botones`).
- `test: [Módulo]` al inyectar únicamente nuevos tests de Jest.
- `refactor: [Módulo]` al limpiar código sin alterar la lógica.

---

## 5. Conclusión de Calidad
Este marco de trabajo garantiza que el código de UniHorarios no dependa de la buena voluntad o de días particularmente inspirados del equipo, sino que es guiado por un sistema frío, auditable e implacable de métricas de calidad de software (Software Quality Assurance). La estandarización nos dota de resiliencia empresarial.
