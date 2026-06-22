# 30. Registro de Defectos (Defect Log)

Este registro documenta los errores funcionales (*Bugs*) detectados durante las fases de Pruebas (QA) y Verificación del código.

| ID | Defecto Detectado (Bug) | Componente Afectado | Severidad | Estado | Resolución y Validación |
| :-- | :-- | :-- | :--: | :--: | :-- |
| **DEF-01** | **Solapamiento en Horarios (Choque):** El algoritmo asignaba exitosamente un docente a dos clases distintas en la misma hora, ignorando la restricción de exclusividad. | Backend (Motor CSP) | **Crítica** (Blocker) | Cerrado | Se corrigió el archivo `csp.ts` añadiendo la heurística de comprobación `checkTeacherAvailability()` al Forward Checking. Validado mediante pruebas unitarias (`test:coverage`). |
| **DEF-02** | **Fallo de Refresco en Sesión (JWT):** Tras 1 hora de uso, el token expiraba y el usuario no era redirigido a la pantalla de login, dejando la aplicación en un estado "congelado". | Frontend (API Interceptor) | **Alta** | Cerrado | Se configuró un interceptor global en *Axios/Fetch* para capturar el error `401 Unauthorized` y disparar la acción de limpiar estado (`logout`) en Zustand. |
| **DEF-03** | **Atributos HTML Huérfanos:** Las etiquetas de los formularios carecían de asociación explícita, afectando a lectores de pantalla (Screen Readers). | Frontend (React UI) | **Media** (WCAG) | Cerrado | Corrección masiva de propiedades `htmlFor` y `id` en `Inicio.tsx` durante la auditoría de Accesibilidad Web (Sprint 4). Validado mediante escáneres Lighthouse. |
| **DEF-04** | **Advertencia de Seguridad por Headers HTTP:** SonarQube detectó que el servidor Express devolvía la cabecera `X-Powered-By: Express`, revelando la tecnología al atacante. | Backend (Express) | **Baja** (Code Smell) | Cerrado | Implementación e instanciación del Middleware de seguridad `helmet()` en `index.ts`. Vulnerabilidad sellada y verificada mediante nuevo pase por SonarQube. |

---
**Responsable de QA:** Analista QA / Development Team  
**Última Actualización:** Fase de Cierre del Proyecto.
