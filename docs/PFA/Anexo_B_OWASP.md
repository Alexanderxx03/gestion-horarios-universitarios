# Anexo B - Auditoría de Seguridad Profunda (OWASP Top 10)

## B.1 Marco Teórico y Objetivos de la Auditoría

El estándar OWASP (Open Worldwide Application Security Project) Top 10 es el documento de concientización por excelencia para desarrolladores y profesionales de seguridad web. Representa un consenso global sobre los diez riesgos de seguridad más críticos que amenazan a las aplicaciones web actuales.

Para el sistema **UniHorarios**, un software que maneja datos sensibles como perfiles de docentes, mallas curriculares y disponibilidad de horarios, garantizar la invulnerabilidad frente a estos vectores de ataque no es opcional, es un requisito estricto. El objetivo de este anexo es desglosar la auditoría técnica realizada sobre el stack MERN (MongoDB, Express, React, Node.js) de la aplicación, detallando las mitigaciones aplicadas categoría por categoría.

## B.2 Herramientas de Auditoría Utilizadas
- **npm audit:** Utilizado en el pipeline de Integración Continua (CI) para identificar vulnerabilidades conocidas (CVEs) en las dependencias de terceros (árbol de `node_modules`).
- **OWASP ZAP (Zed Attack Proxy):** Ejecutado en modo "Spidering" (rastreo pasivo) contra el servidor de pruebas local para detectar fugas de cabeceras de seguridad.
- **Auditoría Manual de Código (Code Review):** Inspección manual de *Pull Requests* enfocada en la sanitización de inputs y validación de tokens JWT.

---

## B.3 Análisis de Resultados por Categoría OWASP Top 10 (2021)

A continuación se detalla el veredicto técnico de la aplicación frente a cada una de las 10 vulnerabilidades críticas, así como el mecanismo de defensa arquitectónico implementado.

### A01: Broken Access Control (Control de Acceso Roto)
**Estado: ✅ Seguro y Probado**
- **Descripción del Riesgo:** Permite a los usuarios actuar fuera de sus permisos previstos (ej. un estudiante editando un horario o un usuario no autenticado accediendo a la API).
- **Implementación Defensiva (UniHorarios):** Todo el backend Node.js está protegido por un middleware de interceptación (`auth.ts`). Cualquier ruta que comience con `/api/v1/protected/*` requiere obligatoriamente un token JWT válido en las cookies de la petición o en el header `Authorization`. Adicionalmente, dentro del controlador, se verifica el `rol` extraído del payload del JWT (ej. `if (user.role !== 'ADMIN') throw new ForbiddenError()`).
- **Resultado:** Las pruebas de integración con Jest simulando peticiones maliciosas (Supertest) sin token devuelven invariablemente códigos `401 Unauthorized` y `403 Forbidden`.

### A02: Cryptographic Failures (Fallos Criptográficos)
**Estado: ✅ Seguro y Probado**
- **Descripción del Riesgo:** Exposición de datos confidenciales (como contraseñas) debido a algoritmos débiles o transmisión en texto plano.
- **Implementación Defensiva (UniHorarios):** Ninguna contraseña de usuario se almacena en texto plano en la colección de MongoDB. Al momento del registro, el esquema de Mongoose intercepta el hook `pre('save')` y utiliza la librería `bcryptjs` con un *Salt Rounds* de factor 10 para aplicar un hash criptográfico de un solo sentido.
- **Resultado:** Si la base de datos completa se filtrara a internet, las contraseñas reales serían matemáticamente irrecuperables mediante ataques de fuerza bruta tradicionales.

### A03: Injection (Inyección)
**Estado: ✅ Seguro (Mitigado)**
- **Descripción del Riesgo:** Datos no confiables enviados a un intérprete como parte de un comando o consulta (ej. SQL Injection, NoSQL Injection, XSS).
- **Implementación Defensiva (UniHorarios):** Al no utilizar bases de datos relacionales SQL, el riesgo clásico de inyección desaparece. Sin embargo, existe la Inyección NoSQL (pasar objetos de MongoDB como `{ $gt: "" }` en el cuerpo de una petición). Para mitigar esto, UniHorarios emplea la librería `Zod` en todas las rutas de Express. `Zod` sanitiza y valida estrictamente el tipo de dato de entrada antes de que toque los repositorios de Mongoose, destruyendo cualquier objeto malicioso anidado.

### A04: Insecure Design (Diseño Inseguro)
**Estado: ✅ Seguro**
- **Descripción del Riesgo:** Defectos arquitectónicos que no pueden ser corregidos por una configuración perfecta (ej. no prever un límite de intentos de inicio de sesión).
- **Implementación Defensiva (UniHorarios):** La aplicación fue diseñada bajo el principio de "Privilegio Mínimo". El cliente Frontend (React) nunca se comunica con la base de datos de manera directa; todo pasa obligatoriamente por los *Endpoints* del Backend. Además, el algoritmo CSP fue aislado en *Worker Threads*, garantizando que una petición maliciosa súper-compleja no bloquee el hilo principal (Event Loop) y cause una denegación de servicio (DoS).

### A05: Security Misconfiguration (Configuración de Seguridad Incorrecta)
**Estado: ⚠️ Mitigado tras Hallazgo**
- **El Hallazgo:** Durante las pruebas en el Sprint 1, el servidor Node.js tenía el paquete de CORS completamente abierto (`app.use(cors())`), lo que permitiría a cualquier dominio externo en internet consumir la API de la universidad. Además, se filtraba la cabecera `X-Powered-By: Express`, revelando la tecnología del servidor a posibles atacantes.
- **La Solución:** Se restringió el origen explícitamente en el archivo `index.ts`. Solo se aceptan peticiones provenientes del dominio oficial del frontend en producción, o de `localhost:5173` en desarrollo. Adicionalmente, se instaló y configuró el middleware `Helmet.js` que añade 11 cabeceras de seguridad HTTP automáticamente, mitigando ataques de *Clickjacking*.

### A06: Vulnerable and Outdated Components (Componentes Vulnerables y Desactualizados)
**Estado: ✅ Seguro (Controlado por CI)**
- **Implementación Defensiva (UniHorarios):** Las dependencias de un proyecto en Node.js pueden pudrirse rápidamente si un paquete *Open Source* es comprometido (Supply Chain Attack). Por ende, se exige la ejecución del comando `npm audit` antes de cualquier pase a producción.
- **Evidencia Actual:** El último reporte de NPM indica **0 vulnerabilidades de severidad alta o crítica**. (Ver Figura B.1).

### A07: Identification and Authentication Failures (Fallos de Autenticación e Identificación)
**Estado: ⚠️ Riesgo Aceptado (A mejorar)**
- **Descripción del Riesgo:** Permitir ataques de relleno de credenciales, fuerza bruta masiva o manejo débil de sesiones.
- **Estado Actual en UniHorarios:** La autenticación se apoya sólidamente en JWT (JSON Web Tokens). Los tokens tienen un tiempo de vida (TTL) muy corto (1 hora), lo que mitiga el riesgo de robo de sesión. **Sin embargo**, la aplicación actualmente carece de protección contra fuerza bruta (un atacante podría intentar 10,000 contraseñas por segundo en la ruta `/api/login`).
- **Plan de Acción:** Implementar un middleware de `express-rate-limit` restringiendo a 5 intentos de login por IP cada 15 minutos en el próximo Sprint.

### A08: Software and Data Integrity Failures (Fallos de Integridad de Software y Datos)
**Estado: ✅ Seguro**
- **Implementación Defensiva (UniHorarios):** Todo el código transita por un repositorio central en GitHub, sin parches directos a los servidores de producción. Si en el futuro se implementan pipelines automatizados (CI/CD) con Docker, se validarán los *hashes* de las imágenes bases utilizadas.

### A09: Security Logging and Monitoring Failures (Fallas en el Registro y Monitoreo de Seguridad)
**Estado: ⚠️ Planificado para Fase de Operaciones**
- **Descripción del Riesgo:** No registrar intentos de acceso fallidos, impidiendo la detección temprana de ataques en progreso.
- **Estado Actual en UniHorarios:** Actualmente los errores simplemente se imprimen en la consola (`console.error`). Para despliegues reales, este es un riesgo enorme.
- **Plan de Acción:** Migrar los logs de consola a un sistema estructurado de bitácoras utilizando librerías como `Winston` o `Pino`, conectadas idealmente a un agregador de logs externo (DataDog o CloudWatch) que genere alertas a los administradores ante picos de errores 401.

### A10: Server-Side Request Forgery (SSRF)
**Estado: ✅ Seguro**
- **Implementación Defensiva (UniHorarios):** La vulnerabilidad SSRF ocurre cuando una aplicación web obtiene un recurso remoto basado en una URL proporcionada por el usuario, sin validar dicha URL, permitiendo al atacante obligar al servidor a hacer peticiones hacia la red interna. UniHorarios no contiene funcionalidades de obtención de recursos externos, fetchers de URLs ni webhooks personalizados. El riesgo está completamente erradicado por diseño.

---

## B.4 Evidencia Visual de Mitigaciones (NPM Audit)

Una práctica fundamental es asegurar que la cadena de suministro del software no esté comprometida. El comando `npm audit` escanea el árbol de dependencias contra bases de datos públicas de vulnerabilidades de seguridad conocidas.

![Reporte npm audit - Cero Vulnerabilidades](Capturas/npm_audit.png)
*Figura B.1: Resultado de la ejecución de `npm audit` evidenciando la sanidad y actualización del árbol de dependencias del proyecto MERN. Cero vulnerabilidades críticas o altas detectadas tras la actualización planificada de librerías en el Sprint 3.*

---

## B.5 Conclusión Definitiva de Seguridad
UniHorarios cumple de manera sobrada con las protecciones básicas y avanzadas frente al OWASP Top 10. La adopción temprana de middlewares de sanitización (Zod) y seguridad pasiva (Helmet.js) garantiza una defensa robusta. Las brechas restantes (Rate Limiting y Logging Estructurado) son típicas de aplicaciones en fase MVP y han sido correctamente identificadas y mapeadas en el roadmap técnico para el próximo paso hacia la etapa de Producción.
