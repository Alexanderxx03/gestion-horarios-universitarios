# 31. Registro de Supuestos (Assumption Log)

Registro analítico que documenta los supuestos, hipótesis y restricciones técnicas definidas al inicio del proyecto (Sprint 0), evaluando su validación empírica y el impacto de sus variaciones sobre las decisiones finales del sistema.

## 1. Validación de Supuestos

| ID | Supuesto Inicial | Impacto Potencial (Si era falso) | Validación durante la Ejecución | Conclusión del Proyecto |
|:---:|---|---|---|---|
| **SUP-01** | "El algoritmo Backtracking estándar es suficiente para resolver el CSP de 50 cursos." | Cuellos de botella masivos de procesamiento (Time-Out). | **FALSO**. En pruebas de estrés (Sprint 2), la complejidad O(n!) paralizó el motor sin heurísticas. | El supuesto obligó al equipo a investigar e implementar Inteligencia Artificial simbólica avanzada (Heurística MRV). |
| **SUP-02** | "Firebase Firestore será suficientemente rápido para las iteraciones masivas de lectura/escritura del algoritmo." | Costos exorbitantes y latencia de red inaceptable. | **FALSO**. Las llamadas repetitivas excedían el límite de cuota gratuita en minutos. | Cambio arquitectónico justificado hacia MongoDB (Mongoose) como solución óptima in-memory y local. |
| **SUP-03** | "Los estudiantes solo pueden matricular un máximo de 22 créditos." | Violación normativa universitaria. | **VERDADERO**. | Se incorporó estáticamente como una regla dura (Hard Constraint) inquebrantable en el Motor CSP. |

## 2. Restricciones del Proyecto (Constraints Validados)
1. **Recursos de Cómputo:** Limitados a la capa gratuita (Free Tier). *Cumplido exitosamente mediante arquitectura eco-eficiente (Green IT).*
2. **Ciclo de Vida:** Obligación de usar un modelo iterativo (Scrum). *Cumplido con 4 Sprints perfectamente documentados y trazables.*
3. **Pila Tecnológica:** Limitación al uso de ecosistemas basados en JavaScript/TypeScript. *Cumplido mediante Stack MERN de alto rendimiento.*
