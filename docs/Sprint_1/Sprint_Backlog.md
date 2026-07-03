# Sprint Backlog - Sprint 1 (Base de Datos y Seguridad Core)

**Duración:** 14 Días (2 Semanas)
**Meta del Sprint (Sprint Goal):** Levantar la infraestructura Cloud (Bases de datos) y construir un muro inquebrantable de autenticación e Inversión de Control (Middleware). Al final de este Sprint, nadie anónimo podrá tocar nuestros datos.

## 1. User Stories Seleccionadas (Compromiso del Equipo)

El equipo de desarrollo ha absorbido (Pulls) las siguientes historias de usuario desde el *Product Backlog* hacia el *Sprint Backlog*, estimando el esfuerzo usando la sucesión de Fibonacci (Planning Poker).

| ID Ticket | Épica (Categoría) | Título de la Historia de Usuario | Story Points (Esfuerzo) | Desarrollador | Estado de Cierre |
|:---:|:---|:---|:---:|:---:|:---:|
| **US-101** | Infraestructura | Iniciar Repositorios (MonoRepo) y conectar MongoDB Atlas Cluster M0. | 2 | Alexander | ✅ Completado |
| **US-102** | Seguridad Backend | Crear Schema `User` de Mongoose y cifrar las contraseñas con `bcryptjs` en los ganchos `pre-save`. | 3 | Alexander | ✅ Completado |
| **US-103** | Seguridad Backend | Programar Ruta `/auth/login` que valide el hash y firme un JWT (JSON Web Token) con vencimiento de 4 horas. | 5 | Alexander | ✅ Completado |
| **US-104** | Seguridad Backend | Construir un *Middleware* de Express que intercepte peticiones HTTP y extraiga el JWT del Header de Autorización. Rechazar 401 si no existe o expiró. | 3 | Alexander | ✅ Completado |
| **US-105** | UI Autenticación | Crear pantalla de Login en React usando Tailwind. Validar formato de correos con Zod antes de apretar "Entrar". | 5 | Roberto (Front) | ✅ Completado |
| **US-106** | UI Routing | Configurar `React Router v6` e implementar envoltorios (`ProtectedRoutes`) que boten al usuario a la vista de Login si Zustand detecta que no hay token en LocalStorage. | 8 | Roberto (Front) | ✅ Completado |

## 2. Deuda Técnica y Spikes (Investigación)

Durante la ceremonia de planificación, el equipo acordó inyectar un **Spike (Investigación Crítica)** al Sprint 1:
- **SPIKE-01 (3 Story Points):** "Investigar si Mongoose V7 soporta Worker Threads nativos de Node.js compartiendo la misma conexión Pool para no agotar las conexiones de DB cuando calculemos horarios". 
- *Resultado del Spike:* Completado exitosamente. Se demostró en un script de prototipo sucio que enviando el `URI` en lugar de la conexión viva al Worker, el hilo puede conectarse limpiamente a Mongo.

## 3. Métricas de Velocidad Planificada
- **Velocidad Estimada para el Sprint 1:** 29 Story Points.
- **Riesgo:** Alto, al ser el primer Sprint del equipo trabajando juntos en el Stack MERN, se desconoce el factor real de fricción (Setup inicial).

*Firma de Inicio de Sprint: Equipo de Desarrollo UniHorarios*
