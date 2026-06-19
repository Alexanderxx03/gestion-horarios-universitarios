# 33. Declaración de Trabajo (Statement of Work - SOW)

La **Declaración de Trabajo (SOW)** sirve como un instrumento contractual o de verificación entre el proveedor de servicios (el Equipo de Desarrollo) y el cliente/patrocinador (Universidad/Cátedra). En esta fase, validamos que todos los entregables acordados han sido proporcionados.

## 1. Alcance Comprometido
El proveedor se comprometió a entregar un sistema Full Stack ("UniHorarios") capaz de gestionar la base académica y automatizar, mediante Inteligencia Artificial clásica (CSP Backtracking), la asignación de horarios sin conflictos de recursos. Adicionalmente, el sistema debía medir su propia sostenibilidad (Green Software CO₂).

## 2. Validación de Entregables Acordados

| Entregable | Criterio de Aceptación (SOW) | Resultado de Validación | Firma Cliente |
| :-- | :-- | :-- | :--: |
| **Plataforma Web Frontend** | SPA responsivo, con roles administrativos y de consulta (estudiante). | ✅ **Conforme.** Desarrollado en React+Vite, accesible (WCAG) y con UX validadas (SUS). | _______ |
| **Backend API y Base de Datos** | API REST segura en Node.js, almacenando la configuración en Base de datos documental. | ✅ **Conforme.** Ecosistema MERN asegurado (OWASP) y certificado libre de deuda técnica (SonarQube). | _______ |
| **Motor Matemático (CSP)** | Algoritmo lógico programado desde cero, sin APIs de terceros de pago. | ✅ **Conforme.** El motor MRV+Forward Checking está embebido nativamente en la arquitectura de TypeScript. | _______ |
| **Repositorio y Documentación** | Código fuente entregado en GitHub junto a una Wiki completa y manuales. | ✅ **Conforme.** Repositorio en GitHub estructurado en monorepo, Wiki (34 documentos formales PMBOK). | _______ |

## 3. Conformidad Contractual
Con la presente validación de entregables y la confirmación de la batería de Pruebas (Vitest), se declara que el trabajo **está completo**. Esto finaliza las obligaciones de la fase de construcción (Sprint 0 a 4) estipuladas en la presente Declaración de Trabajo. El producto es apto para transicionar hacia la fase de mantenimiento o cierre de contrato académico.
