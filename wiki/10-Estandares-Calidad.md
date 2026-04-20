# 10 · Estándares de Calidad

## Marco de Calidad Aplicado

El proyecto aplica tres marcos de calidad complementarios:

| Estándar | Alcance | Aplicación |
|---|---|---|
| **OWASP Top 10** | Seguridad | Prevención de las 10 vulnerabilidades más críticas en web |
| **ISO/IEC 25010** | Calidad del Software | Modelo de características para evaluar la calidad del producto |
| **WCAG 2.1 Nivel AA** | Accesibilidad | Criterios de accesibilidad del W3C |

---

## OWASP Top 10 – Mitigaciones Implementadas

### A01:2021 – Broken Access Control

**Riesgo:** Usuarios acceden a funciones o datos fuera de sus permisos.

**Mitigaciones en este proyecto:**
- ✅ **Firebase Security Rules** verifican el rol del usuario en cada operación Firestore
- ✅ **Custom Claims** en el token JWT almacenan el rol (`ADMIN`, `COORDINATOR`, etc.)
- ✅ **Rutas de React protegidas** por componente `PrivateRoute` que verifica el rol antes de renderizar
- ✅ **Cloud Functions** verifican el token y rol antes de ejecutar lógica de negocio crítica

```typescript
// Ejemplo: verificar rol en Cloud Function
export const generateSchedule = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión')
  }
  if (!['ADMIN', 'COORDINATOR'].includes(request.auth.token.role)) {
    throw new HttpsError('permission-denied', 'Sin permiso para esta acción')
  }
  // ...lógica del motor CSP
})
```

---

### A02:2021 – Cryptographic Failures

**Riesgo:** Datos sensibles expuestos por cifrado débil o inexistente.

**Mitigaciones:**
- ✅ **HTTPS forzado** por Firebase Hosting en todos los endpoints
- ✅ **JWT tokens** generados y verificados por Firebase Auth (RS256)
- ✅ **Variables de entorno** con las claves Firebase nunca se suben a Git (`.gitignore`)
- ✅ Las contraseñas son gestionadas exclusivamente por Firebase Auth (nunca en nuestra base de datos)

---

### A03:2021 – Injection

**Riesgo:** SQL injection, NoSQL injection, command injection.

**Mitigaciones:**
- ✅ **Firestore no usa SQL** → imposibe SQL injection
- ✅ **Validación de inputs** en Cloud Functions antes de escribir en Firestore
- ✅ **TypeScript** captura errores de tipo en tiempo de compilación
- ✅ **Zod** para validación de esquemas en Functions

```typescript
// Ejemplo: validar input con Zod en Functions
import { z } from 'zod'

const EnrollmentSchema = z.object({
  studentId: z.string().min(1),
  periodId: z.string().min(1),
  courseIds: z.array(z.string()).min(1).max(10)
})

// Valida y lanza error si el input no cumple el esquema
const validated = EnrollmentSchema.parse(request.data)
```

---

### A07:2021 – Identification and Authentication Failures

**Riesgo:** Ataques de fuerza bruta, robo de sesión, gestión débil de credenciales.

**Mitigaciones:**
- ✅ **Firebase Authentication** gestiona todo el ciclo de autenticación
- ✅ **Token refresh automático** cada hora sin intervención del usuario
- ✅ **Revocación de tokens** al cerrar sesión
- ✅ **Google OAuth2** delega la autenticación a una entidad de confianza
- ✅ **Sign-in rate limiting** gestionado por Firebase Auth automáticamente

---

### A10:2021 – Server-Side Request Forgery (SSRF)

**Mitigaciones:**
- ✅ Las Cloud Functions no realizan peticiones HTTP a URLs proporcionadas por el usuario
- ✅ Todas las llamadas externas son a servicios Firebase internos con Admin SDK
- ✅ Sin listas blancas de URLs necesarias (no hay flujos SSRF en el diseño)

---

## ISO/IEC 25010 – Características de Calidad

### Funcionalidad

| Subcaracterística | Implementación |
|---|---|
| **Completitud funcional** | Todos los RF documentados con criterios de aceptación |
| **Corrección funcional** | Tests unitarios del motor CSP |
| **Adecuación funcional** | Diseño orientado a las necesidades del coordinador académico |

### Desempeño y Eficiencia

| Subcaracterística | Meta | Implementación |
|---|---|---|
| **Tiempo de respuesta** | < 3s carga inicial | Vite con tree-shaking, lazy loading |
| **Uso de recursos** | Mínimo | Serverless: sin servidor idle |
| **Capacidad** | 50+ cursos sin degradación | Heurísticas MRV + Forward Checking |

### Compatibilidad

| Subcaracterística | Implementación |
|---|---|
| **Interoperabilidad** | API Firestore estándar; exportación PDF/Excel portátil |
| **Co-existencia** | SPA no interfiere con otras aplicaciones del navegador |

### Usabilidad

| Subcaracterística | Implementación |
|---|---|
| **Reconocibilidad** | Iconografía estándar, labels descriptivos, tooltips |
| **Aprendizaje** | Flujo guiado, mensajes de error descriptivos |
| **Operabilidad** | Accesible por teclado completo, responsive |
| **Estética** | Diseño premium consistente con CSS Variables y sistema de diseño |

### Confiabilidad

| Subcaracterística | Implementación |
|---|---|
| **Disponibilidad** | Firebase SLA 99.95% |
| **Tolerancia a fallos** | Estado FAILED en el motor CSP con mensaje explicativo |
| **Recuperabilidad** | Emuladores Firebase para pruebas sin afectar producción |

### Seguridad

Ver sección OWASP arriba.

### Mantenibilidad

| Subcaracterística | Implementación |
|---|---|
| **Modularidad** | Componentes React desacoplados, Functions independientes |
| **Reusabilidad** | Hooks personalizados (`useAuth`, `useSchedule`), servicios |
| **Testabilidad** | Emuladores Firebase para pruebas, Jest para unit tests |
| **Modificabilidad** | TypeScript strict mode, contratos bien definidos |

### Portabilidad

| Subcaracterística | Implementación |
|---|---|
| **Adaptabilidad** | SPA funciona en cualquier navegador moderno |
| **Instalabilidad** | Sin instalación del usuario, acceso solo por URL |
| **Reemplazabilidad** | Estructura modular permite reemplazar componentes fácilmente |

---

## WCAG 2.1 Nivel AA – Criterios de Accesibilidad

### Perceptible

| Criterio | Implementación |
|---|---|
| **1.1.1 Non-text Content** | Atributos `alt` en todas las imágenes e iconos |
| **1.3.1 Info and Relationships** | Uso semántico de headings, listas, tablas |
| **1.4.3 Contrast (Minimum)** | Relación de contraste ≥ 4.5:1 para texto normal |
| **1.4.4 Resize text** | Texto escala hasta 200% sin pérdida de funcionalidad |

### Operable

| Criterio | Implementación |
|---|---|
| **2.1.1 Keyboard** | Todos los elementos accesibles por Tab/Enter/Escape |
| **2.4.3 Focus Order** | Orden lógico de foco en formularios y modales |
| **2.4.6 Headings and Labels** | Títulos descriptivos en todas las secciones |

### Comprensible

| Criterio | Implementación |
|---|---|
| **3.1.1 Language of Page** | `<html lang="es">` declarado |
| **3.3.1 Error Identification** | Mensajes de error específicos junto al campo con error |
| **3.3.2 Labels or Instructions** | Labels asociados a todos los inputs del formulario |

### Robusto

| Criterio | Implementación |
|---|---|
| **4.1.1 Parsing** | HTML semántico válido |
| **4.1.2 Name, Role, Value** | Atributos ARIA en componentes custom (modales, dropdowns) |

---

> 🔗 Anterior: [← Despliegue Firebase](09-Despliegue-Firebase) | Siguiente: [Equipo →](11-Equipo-del-Proyecto)
