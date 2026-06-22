# 20. Seguridad OWASP Top 10 2025

## Objetivo
Implementar las defensas requeridas contra las vulnerabilidades detalladas en el estándar OWASP Top 10 (2025), protegiendo la base de datos de inyecciones maliciosas, asegurando el correcto manejo de cabeceras HTTP, y previniendo ataques automatizados de denegación de servicio (DDoS) en la aplicación de Gestión de Horarios Universitarios.

## Vulnerabilidades Identificadas y Mitigadas

A continuación, se detalla la matriz de riesgo de vulnerabilidades comunes y la mitigación técnica aplicada en el ecosistema MERN (Backend Node.js/Express):

### 1. Inyección de Código (Injection - A03:2021)
- **Riesgo:** Inyección NoSQL. Los atacantes pueden enviar operadores maliciosos de MongoDB (ej. `{"$gt": ""}`) en los campos de inicio de sesión o búsqueda para extraer datos sin autorización.
- **Mitigación Implementada:** Se integró el middleware `express-mongo-sanitize`.
- **Funcionamiento Técnico:** Este paquete inspecciona los cuerpos (`req.body`), parámetros (`req.params`), y consultas (`req.query`) de las peticiones HTTP y elimina todas las llaves que comiencen con el símbolo reservado `$` o contengan `.`.
- **Evidencia en Código:**
  ```typescript
  import mongoSanitize from 'express-mongo-sanitize';
  app.use(mongoSanitize()); // Previene inyección NoSQL interceptando queries
  ```

### 2. Controles de Acceso Rotos (Broken Access Control - A01:2021) / Configuraciones de Seguridad (A05:2021)
- **Riesgo:** Exposición de información del servidor a través de cabeceras predeterminadas (ej. `X-Powered-By: Express`) y falta de protección contra Sniffing MIME o Clickjacking.
- **Mitigación Implementada:** Se integró el paquete de seguridad estándar de la industria `helmet`.
- **Funcionamiento Técnico:** Helmet configura automáticamente 11 middlewares de seguridad que blindan las cabeceras HTTP (ej. elimina `X-Powered-By`, añade `X-Content-Type-Options: nosniff`, y configura `Strict-Transport-Security`).
- **Evidencia en Código:**
  ```typescript
  import helmet from 'helmet';
  app.use(helmet()); // Blinda la aplicación contra vectores comunes de ataque web
  ```

### 3. Falta de Restricciones de Tasa de Peticiones (Ausencia de Limitación - A04:2021)
- **Riesgo:** Ataques de Fuerza Bruta contra los endpoints de autenticación y ataques de denegación de servicio (DDoS) saturando el backend.
- **Mitigación Implementada:** Se configuró un Límite de Peticiones usando `express-rate-limit`.
- **Funcionamiento Técnico:** Se restringe la cantidad de solicitudes provenientes de una misma IP a 100 peticiones en una ventana de 15 minutos en todas las rutas `/api/*`. Si el límite es superado, el servidor responde tempranamente con un error HTTP 429 (Too Many Requests), ahorrando CPU y memoria.
- **Evidencia en Código:**
  ```typescript
  import rateLimit from 'express-rate-limit';
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 peticiones
    message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo tras 15 minutos'
  });
  app.use('/api/', apiLimiter);
  ```

### 4. Cross-Site Scripting (XSS - mitigado nativamente)
- **Riesgo:** Inserción de scripts maliciosos a través de entradas no sanitizadas que se visualizan en el navegador de otros usuarios.
- **Mitigación Implementada:** El Frontend está construido en React, el cual escapa automáticamente (sanitiza) todas las variables renderizadas en el JSX previniendo la evaluación del HTML. Se auditaron dependencias asegurando no usar atributos peligrosos como `dangerouslySetInnerHTML` sin sanitización externa (DOMPurify).

## Resultado y Validación Residual
Con la implementación de la triada `helmet`, `express-rate-limit` y `express-mongo-sanitize`, la superficie de ataque del backend ha sido drásticamente reducida. Los escaneos automáticos de vulnerabilidad han sido superados y la evaluación estática de SonarQube corrobora la ausencia de vulnerabilidades de severidad mayor.
