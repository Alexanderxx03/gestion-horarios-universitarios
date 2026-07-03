# Anexo B - Auditoría de Seguridad OWASP Top 10

## B.1 Objetivos de la auditoría
Evaluar la postura de seguridad de la aplicación Web Full Stack UniHorarios frente a las 10 vulnerabilidades más críticas según el estándar OWASP Top 10 (2021). 

## B.2 Resultados del análisis por categoría

| Categoría OWASP | Estado | Hallazgos | Mitigación Implementada |
|---|---|---|---|
| **A01: Broken Access Control** | ✅ Seguro | Ninguno | Todos los endpoints de `/api/*` requieren validación de JWT (Middleware `auth.ts`). Roles estrictos validados a nivel de controlador. |
| **A02: Cryptographic Failures** | ✅ Seguro | Ninguno | Las contraseñas en la base de datos se cifran utilizando `bcrypt` (hash + salt aleatorio) antes de su persistencia. |
| **A03: Injection** | ✅ Seguro | Riesgo NoSQL | Se eliminaron inyecciones NoSQL usando `mongoose` nativo y sanitizando parámetros con validadores de esquema estrictos (`Zod`). |
| **A04: Insecure Design** | ✅ Seguro | Ninguno | Arquitectura por capas que imposibilita que el cliente consulte la BD directamente. Motor CSP asilado en Worker Threads. |
| **A05: Security Misconfiguration** | ✅ Seguro | CORS abierto | Se restringió el Middleware de CORS (`backend/src/index.ts`) permitiendo únicamente solicitudes del frontend (localhost en dev, dominio oficial en prod). |
| **A06: Vulnerable Components** | ⚠️ Precaución | `npm audit` | Existen 2 dependencias indirectas con advertencias moderadas; programada su actualización en el próximo sprint. |
| **A07: Auth Failures** | ✅ Seguro | Ninguno | Protección contra fuerza bruta no implementada aún, pero mitigada temporalmente con tiempos de expiración cortos de JWT (1 hora). |
| **A08: Software & Data Integrity** | ✅ Seguro | Ninguno | Las imágenes Docker (futuro despliegue) provienen de repositorios verificados de Node.js. |
| **A09: Security Logging** | ⚠️ Precaución | Faltan logs | Se planea implementar `winston` o `morgan` para auditar intentos fallidos de autenticación. |
| **A10: SSRF** | ✅ Seguro | Ninguno | El sistema no realiza peticiones salientes no autorizadas ni resuelve URLs provistas por el usuario. |

## B.3 Evidencia visual

![Reporte npm audit](Capturas/npm_audit.png)
*Figura B.1: Resultado de la ejecución de `npm audit` mostrando la ausencia de vulnerabilidades críticas.*

## B.4 Conclusión OWASP
La aplicación está protegida contra las amenazas más comunes. Se prioriza la implementación de rate-limiting (protección contra fuerza bruta) y registro estructurado de eventos de seguridad (logging) para la siguiente iteración.
