# Anexo G: Pruebas Unitarias del Backend (Jest)

## Objetivo
Implementar y documentar la suite de pruebas automatizadas que valide el comportamiento del Backend, asegurando que los controladores, middlewares de seguridad y la persistencia de datos (MongoDB) funcionen correctamente bajo distintos escenarios de carga y vulnerabilidad.

## Framework Utilizado
El framework elegido es **Jest** junto con **Supertest** para simular peticiones HTTP sin necesidad de levantar el servidor físico.

## Cobertura de Middlewares (OWASP)
Se verifican activamente las medidas preventivas de seguridad:
- **Rate Limiting:** Se dispara una prueba de estrés enviando 101 peticiones consecutivas al endpoint de Login, verificando que la última devuelva `429 Too Many Requests`.
- **Sanitización NoSQL:** Se envían payloads maliciosos `{"$gt": ""}` en el cuerpo de la autenticación para confirmar que `express-mongo-sanitize` los neutraliza.

## Cobertura de Controladores y Servicios
Se probaron los endpoints de la API REST:
- **Usuarios & Autenticación:** Verificación de hash bcrypt y validación estricta de JWT en rutas protegidas.
- **Roles:** Validación RBAC asegurando que un rol `STUDENT` no pueda acceder a los endpoints de eliminación de `COORDINATOR`.

## Conclusión
Las pruebas del backend confirman la resiliencia del sistema ante vulnerabilidades comunes (OWASP Top 10) y garantizan que la lógica de negocio se preserve durante las fases de refactorización o actualización de dependencias.
