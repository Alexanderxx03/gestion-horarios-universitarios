# 31. Registro de Supuestos (Assumption Log)

Las premisas listadas a continuación corresponden a las hipótesis y condiciones técnicas de entorno que el equipo asumió como verdaderas durante el planteamiento (Sprint 0) de la Gestión de Horarios Universitarios. Evaluar si se cumplieron ayuda a predecir condiciones en proyectos de software similares.

| ID | Supuesto Asumido al Inicio | Categoría | Validación Final al Cierre del Proyecto | Impacto Potencial (Si resultaba falso) |
| :-- | :-- | :--: | :-- | :-- |
| **SUP-01** | La base de datos de MongoDB Atlas en su capa gratuita (Tier M0) soportará adecuadamente el volumen de carga transaccional del Motor CSP sin generar bloqueos. | Infraestructura | **Parcialmente Validado.** Soportó la fase de desarrollo, pero requirió optimizaciones de caché en la API para evitar exceder los límites de ancho de banda al iterar. | Necesidad de invertir presupuesto temprano en bases de datos dedicadas. |
| **SUP-02** | Los lenguajes TypeScript y JavaScript son lo suficientemente rápidos ejecutando el algoritmo Backtracking en el Backend (Node.js) como para procesar el horario en menos de 30 segundos. | Tecnológico | **Completamente Validado.** Gracias al Motor V8 de Node y al tipado fuerte, la resolución promedia ~2 segundos para 50 cursos. | Obligación de re-escribir el core del motor en lenguajes de bajo nivel (C++, Go o Rust) mediante *microservicios*, retrasando meses el proyecto. |
| **SUP-03** | El equipo podrá desplegar el Frontend estático cómodamente en Firebase Hosting, independientemente de la refactorización a MERN. | Despliegue | **Completamente Validado.** La arquitectura SPA de Vite construyó un archivo `dist/` estático perfectamente asimilado por Firebase CLI. | Cuellos de botella en la entrega del producto y necesidad de reconfigurar pipelines CI/CD. |
| **SUP-04** | El administrador (usuario final) prefiere una interfaz limpia y oscura ("Dark Mode") nativamente por temas de confort visual. | UX/UI | **Parcialmente Validado.** Si bien fue preferido por la modernidad, la auditoría WCAG obligó a habilitar mandatoriamente un "Modo Día" con ratios de contraste más altos para asegurar la accesibilidad a personas con deficiencia visual. | Rechazo en la adopción del sistema por normativas universitarias de inclusión digital. |

---
**Responsable de Mantenimiento:** Product Owner / Project Manager  
**Última Actualización:** Fase de Cierre del Proyecto.
