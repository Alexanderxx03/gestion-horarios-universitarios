# Informe Técnico Integral - Aseguramiento de Calidad

**Proyecto:** Gestión de Horarios Universitarios (UniHorarios)  
**Curso:** Taller de Proyectos 2 - Ingeniería de Sistemas e Informática  
**Responsable:** Equipo de desarrollo UniHorarios  

---

## 1. Resumen ejecutivo

Se realizó un proceso integral de aseguramiento de calidad sobre la aplicación Web Full Stack UniHorarios, cubriendo análisis estático de código (SonarQube), auditoría de seguridad (OWASP), evaluación de accesibilidad (WCAG), usabilidad (SUS) y testing automatizado.

**Hallazgos críticos resueltos:** se mitigó la cadena de conexión de MongoDB hardcodeada en el backend (vulnerabilidad BLOCKER) y se eliminó el falso positivo de contraseña hardcodeada en los componentes de UI del frontend (React). **Avance relevante:** tras incorporar pruebas de integración con mocks en Vitest y Jest, la cobertura reportada por SonarQube subió en frontend de 12.3% a 45.6% y en backend de 35.0% a 61.7%. Ambas métricas continúan en proceso de mejora continua hacia el umbral recomendado (≥70%).

**Accesibilidad:** se ejecutó un escaneo automatizado con axe-core sobre 15 rutas reales, encontrando violaciones en 12/15. Se corrigieron problemas críticos de contraste de color y `<select>` sin nombre accesible. El reescaneo pasó a 14/15 rutas limpias, validado cruzadamente con Lighthouse (promedio 98/100).

Tras las correcciones, el backend y el motor CSP alcanzaron Security Rating A, garantizando la confidencialidad de los datos.

---

## 2. Métricas consolidadas de calidad

| Dimensión | Frontend (React) | Backend (Node.js) | Motor CSP |
|---|---|---|---|
| **Bugs** | 4 (-6) | 0 | 2 |
| **Vulnerabilities** | 0 (-1) | 0 (-1) | 0 |
| **Code Smells** | 316 | 77 | 38 |
| **Security Hotspots** | 2 | 1 | 2 |
| **Duplicación** | 19.2% | 1.6% | 0.5% |
| **Cobertura** | 45.6% (+33.3 pts) | 61.7% (+26.7 pts) | 69.8% |
| **Deuda técnica** | 1 611 min | 2 843 min | 690 min |
| **Mantenibilidad** | A | A | A |
| **Confiabilidad** | B | A | C |
| **Seguridad** | A | A | A |
| **Estado de Quality Gate** | OK | OK | OK |

---

## 3. Hallazgos críticos

### 3.1 Seguridad

| ID | Hallazgo | Severidad | Estado |
|---|---|---|---|
| SEC-01 | Cadena MongoDB (URI) hardcodeada en `backend/src/index.ts` | BLOCKER | ✅ Resuelto |
| SEC-02 | Posible contraseña hardcodeada en UI de Login (`frontend/src/pages/Login.tsx`) | MAJOR | ✅ Resuelto |

**Impacto original:** exposición de credenciales de la base de datos si el repositorio es público.
**Mitigación implementada:**
1. Se eliminó la URI quemada y se implementó `dotenv` forzando la lectura de `process.env.MONGO_URI`.
2. Se ajustaron los placeholders de contraseña en React y se agregó la directiva `// NOSONAR` para desestimar el falso positivo.

### 3.2 Calidad de código

- **Frontend:** 14 issues críticos, 4 bugs (reducción de 6), 316 code smells y 19.2% de duplicación. Gran parte de los code smells derivan del uso intensivo de Hooks complejos.
- **Backend:** 0 bugs y 0 vulnerabilidades; la refactorización reciente limpió por completo los controladores.
- **Motor CSP:** 2 bugs menores de tipado estricto en los Worker Threads.

### 3.3 Cobertura de pruebas

| Capa | Cobertura actual | Umbral recomendado | Brecha |
|---|---|---|---|
| Frontend | 45.6% | ≥70% | -24.4% |
| Backend | 61.7% | ≥70% | -8.3% |
| Motor CSP | 69.8% | ≥70% | -0.2% |

---

## 4. Análisis por dimensiones del PFA

### 4.1 Seguridad (OWASP)
- ✅ Autenticación JWT mediante cookies `httpOnly`.
- ✅ CORS restringido exclusivamente al origen del frontend.
- ✅ Inyección NoSQL mitigada utilizando los validadores estrictos de Mongoose.

### 4.2 Accesibilidad (WCAG)
*Datos reales del escaneo automatizado axe-core y verificación con Lighthouse.*
- ✅ Componentes interactivos accesibles por teclado (Focus trap).
- ✅ **Corregido:** Elementos `<select>` de la página de matrículas no poseían etiqueta ARIA vinculada.
- 🔄 **Contraste de color:** Se estandarizaron los colores primarios en `tailwind.config.js` para cumplir el ratio mínimo de 4.5:1.

### 4.3 Usabilidad (SUS)
- Puntaje promedio: **77.5 / 100** (interpretación: Bueno / Aceptable).
- Destaca la curva de aprendizaje rápida para coordinadores en el Builder de Horarios.

### 4.4 Testing automatizado
- ✅ Suite Vitest para el frontend (componentes y hooks).
- ✅ Suite Jest / Supertest para los endpoints del backend.

---

## 5. Plan de mejoras

| # | Mejora | Capa | Prioridad | Estado | Evidencia |
|---|---|---|---|---|---|
| 1 | Externalizar credenciales de MongoDB | Backend | Alta | ✅ Completado | `backend/src/index.ts`, `.env.example` |
| 2 | Refactorizar lógica compleja de validación de horarios | Frontend | Alta | ✅ Completado | `lib/horarios.ts` extraída en funciones puras |
| 3 | Subir cobertura SonarQube a ≥70% | Backend | Media | 🔄 En progreso | `jest.config.js`, nuevos test controllers |
| 4 | Reducir duplicación de interfaces TS | Global | Media | ✅ Completado | Tipos centralizados exportados globalmente |

---

## 6. Evidencias generadas

| Evidencia | Ubicación |
|---|---|
| Métricas SonarQube | [`metricas_sonarqube.csv`](metricas_sonarqube.csv) |
| Análisis SonarQube detallado | [`Anexo_A_SonarQube.md`](Anexo_A_SonarQube.md) |
| Auditoría OWASP | [`Anexo_B_OWASP.md`](Anexo_B_OWASP.md) |
| Evaluación WCAG | [`Anexo_C_WCAG.md`](Anexo_C_WCAG.md) |
| Instrumento SUS y resultados | [`Anexo_D_Usabilidad_SUS.md`](Anexo_D_Usabilidad_SUS.md), [`sus_resultados.csv`](sus_resultados.csv) |

---

## 7. Conclusiones

El proyecto UniHorarios cuenta con una base sólida en arquitectura y seguridad lógica. Durante el PFA se demostró una reducción verificable de deuda técnica al eliminar vulnerabilidades graves (credenciales de BD) y mitigar falsos positivos.

La integración continua con Vitest y Jest permitió elevar la cobertura de código sustancialmente, dejando el proyecto en una excelente posición para alcanzar el 70% recomendado en futuros Sprints. La aplicación cumple satisfactoriamente con los criterios de calidad académica y profesional exigidos.
