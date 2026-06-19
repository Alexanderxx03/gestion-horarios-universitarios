# 26. Informe Final de Lecciones Aprendidas (Final Lessons Learned Report)

Este documento consolida las reflexiones, buenas prácticas y oportunidades de mejora identificadas a lo largo de las reuniones de Retrospectiva de los 4 Sprints ejecutados durante el ciclo de vida del proyecto. Su objetivo es asegurar que la organización preserve el conocimiento empírico adquirido para futuros proyectos de ingeniería de software.

## 1. Lo que funcionó bien (Buenas Prácticas Adoptadas)

### Desarrollo Orientado a Pruebas (TDD) en el Motor Algorítmico
- **Contexto:** La lógica matemática del algoritmo de resolución de horarios (CSP) es altamente compleja y frágil frente a cambios.
- **Lección Aprendida:** Abordar la construcción del algoritmo definiendo primero las pruebas unitarias (TDD con Vitest) evitó horas de depuración en fases posteriores. Esta práctica aseguró que las reglas de negocio (ej. no solapar docentes) se mantuvieran íntegras tras múltiples refactorizaciones de rendimiento.

### Ecosistema MERN unificado con Vite
- **Contexto:** Mantener separados el desarrollo del Frontend y Backend creaba fricción en el despliegue local.
- **Lección Aprendida:** La utilización del patrón *Monorepo* mediante NPM Workspaces (`package.json` en la raíz) permitió levantar ambos entornos de desarrollo con un solo comando (`npm run dev`). Esto agilizó inmensamente el ritmo de desarrollo del equipo.

### Validaciones con Zod
- **Contexto:** La verificación manual de los tipos de datos en la entrada del API REST era propensa a errores.
- **Lección Aprendida:** Utilizar la librería `zod` para crear esquemas de validación de datos blindó el servidor de forma elegante contra parámetros nulos o inesperados, sirviendo simultáneamente como fuente de verdad tipada para TypeScript.

## 2. Lo que NO funcionó (Errores y Obstáculos)

### Subestimación de Peticiones HTTP en la Carga Inicial (N+1 Queries)
- **El Problema:** Durante las fases iniciales, la interfaz gráfica solicitaba individualmente los detalles de cada curso renderizado. En la vista del catálogo masivo, esto resultó en una avalancha de micro-peticiones que saturaba el ancho de banda (y el plan de base de datos en nube).
- **El Impacto:** Alta latencia en la UI y advertencias de consumo excesivo de red.
- **La Solución (Implementada tardíamente):** Se debió aplicar una arquitectura de almacenamiento en Caché desde el Sprint 1. El problema se corrigió recién en el Sprint 3 implementando el almacenamiento global con `zustand` y patrones de caché en memoria en el backend Express.
- **Acción Correctiva Futura:** Incorporar análisis de tamaño de Payload y optimización de Queries (Lazy Loading y Caché) como un requisito técnico no funcional (RNF) crítico desde la fase de planificación de la Arquitectura.

### Resistencia Inicial al Refactoring Estricto
- **El Problema:** La prisa por entregar incrementos de software funcionales en los Sprints 1 y 2 derivó en deuda técnica, incluyendo componentes largos de React sin modularizar.
- **El Impacto:** Menor calificación temprana en la calidad de código.
- **La Solución:** Se ejecutaron limpiezas estructurales apoyadas en el linter y se modularizó el código antes de la entrega final.
- **Acción Correctiva Futura:** Integrar un *Linter* estricto y un formateador (Prettier) amarrados a los *Git Hooks* (husky) obligatoriamente desde el Sprint 0 para rechazar automáticamente cualquier *commit* que no cumpla el estándar *Clean Code*.

## 3. Conclusiones y Oportunidades de Mejora
El equipo de desarrollo logró un producto sumamente robusto. Para el futuro, la estandarización temprana de las capas de seguridad (OWASP) y la adopción nativa de principios de *Green Software* (minimización de bytes transmitidos por la red) desde el día 1, facilitarán la escalabilidad a nivel empresarial sin sobresaltos.
