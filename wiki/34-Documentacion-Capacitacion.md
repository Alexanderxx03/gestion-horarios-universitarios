# 34. Documentación de Capacitación (Transferencia de Conocimiento)

Este documento centraliza los recursos, manuales y guías necesarias para transferir el conocimiento del sistema de "Gestión de Horarios Universitarios" al cliente o al equipo de operaciones de TI de la universidad.

## 1. Guía Rápida para el Administrador (Usuario Final)
Para los coordinadores académicos o personal administrativo encargado de utilizar el sistema:
1. **Acceso al Sistema:** Ingrese a la URL de producción (proporcionada durante el despliegue). Inicie sesión utilizando el botón de "Login Seguro" (Credenciales institucionales recomendadas).
2. **Carga de Datos Base:** Diríjase al "Panel de Control". Es imperativo cargar primero los **Cursos** (nombre, código, créditos, aforo máximo) y luego a los **Docentes** (disponibilidad y cursos que dictan).
3. **Generación de Horarios:** Haga clic en "Generar Horarios Automáticamente" (Run CSP Engine). El sistema procesará las variables por unos segundos.
4. **Exportación e Interpretación:** Una vez generado sin conflictos, la vista de Calendario Semanal mostrará la asignación final. Puede confirmar que el ahorro de red (Green Software) se aplique en las pestañas posteriores.

## 2. Guía Técnica para Operaciones (DevOps / IT)
Para el equipo encargado de mantener y hospedar la aplicación:
- **Infraestructura:** La plataforma es un Monorepo MERN. El código del Frontend (`/frontend`) es un compilado estático SPA (React) que debe ser servido estáticamente (ej. Firebase Hosting, NGINX). El Backend (`/backend`) es un servidor Node.js/Express que requiere acceso a variables de entorno `.env` (URI de MongoDB Atlas y secretos JWT).
- **Scripts Esenciales:**
  - Instalar dependencias globales: `npm install` (desde la raíz).
  - Levantar localmente para pruebas: `npm run dev`.
  - Auditar calidad: `npm run lint` y `npm run test` (Vitest).

## 3. Matriz de Roles del Sistema
Si el departamento de TI necesita otorgar o revocar accesos en la base de datos:
- **ADMIN / COORDINATOR:** Tiene acceso total al CRUD de docentes y cursos y derecho de ejecución del Motor CSP.
- **TEACHER:** Acceso de sólo lectura a su propio horario asignado.
- **STUDENT:** Acceso de sólo lectura al horario final publicado de su sección matriculada.

> [!TIP]
> **Ayuda Adicional**
> Para dudas técnicas sobre la complejidad matemática del algoritmo o su modificación futura, remitirse al documento [Motor CSP y Arquitectura](05-Motor-CSP.md) en esta misma Wiki.
