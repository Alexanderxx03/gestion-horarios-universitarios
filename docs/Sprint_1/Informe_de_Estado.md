# Informe de Estado del Proyecto - Cierre Sprint 1

**Fecha de Corte (Status Date):** Viernes de la Semana 2 del Sprint 1  
**Preparado por:** Paul Paytan (Scrum Master / Lead Dev)  
**Audiencia (To):** Patrocinadores y Equipo de Desarrollo

## 1. Resumen Ejecutivo de Avance (Executive Summary)

El Sprint 1 ha concluido oficialmente. El equipo centró todas sus energías en el estrato más bajo de la arquitectura: La infraestructura de contenedores, la base de datos NoSQL y los candados de seguridad. 
**El Proyecto se encuentra en estado VERDE (Saludable).**

- **Velocidad Lograda (Burned Points):** 29/29 Story Points.
- **Gráfico de Trabajo Pendiente (Burndown Chart):** La curva de descenso fue lenta la primera semana debido a problemas de configuración de GitHub Actions, pero se estabilizó en la segunda semana gracias a un sobreesfuerzo del equipo Frontend con React Router v6. Llegamos al final del Sprint quemando todas las tareas.

---

## 2. Logros Técnicos (Entregables Completados)

No hemos construido nada "Lindo" a la vista todavía, todo fue plomería (Backend). Se ha desplegado a la rama de Staging lo siguiente:

1. **Clúster Atlas M0 Configurado:** MongoDB corriendo en AWS `us-east-1` (Virginia) con Whitelist de IPs institucionales habilitado.
2. **Sistema de Criptografía Activo:** Un atacante con acceso directo a la base de datos vería `$2a$10$xyz...` (Bcrypt) en lugar de la contraseña real de los docentes. La Ley de Protección de Datos ahora se cumple (Checklist superado).
3. **Muro Middleware de JWT:** La API de Node.js ya bloquea de forma nativa a clientes no autorizados. Solo contesta con un `HTTP 200` si se envía un Bearer Token válido en la cabecera.
4. **Pantalla de Login Funcional:** UI construida en Vite/React utilizando Tailwind CSS. La interfaz avisa al usuario visualmente (Toast en rojo) si la contraseña está mal escrita.

---

## 3. Desafíos Técnicos Enfrentados (Roadblocks Resolucionados)

Durante este Sprint, el "Daily Scrum" (Diaria) sirvió para desatorar dos cuellos de botella severos:

- **Alerta CORS en Producción (Bloqueo):** Cuando el equipo probó la pantalla de Login conectándose a la API alojada en la nube (Render), el navegador bloqueó la solicitud (Política de Mismo Origen). 
  - *Solución Inyectada:* El equipo Backend (Paul Paytan) configuró un Middleware `cors` estricto en Express, permitiendo únicamente solicitudes que provengan del subdominio de Vercel del proyecto.
- **Renderizado React Doble (Falsa Alarma):** El programador Frontend alertó que el Login se ejecutaba dos veces en consola y pensó que era un bug de rendimiento. 
  - *Solución:* El Scrum Master clarificó que se debía al `React.StrictMode` de la versión 18 (Cosa normal en desarrollo local).

---

## 4. Métricas de Calidad de Código Temprano

Dado que configuramos SonarQube desde el Día 1, tenemos métricas del código base crudo:
- **Test Coverage (Cobertura de Pruebas):** 80.5% (Cumplimos el umbral del DoD).
- **Código Duplicado:** 0.0%.
- **Deuda Técnica:** 3 horas estimadas (Principalmente por algunas promesas `.then()` no convertidas a `async/await` en un controlador secundario).

---

## 5. Proyección hacia el Sprint 2

En el próximo Sprint, pasaremos de las "sombras del backend" a los "reflectores del frontend". El objetivo será construir los 3 grandes Paneles Administrativos (Aulas, Mallas y Docentes). Se advierte a la Decanatura que empezaremos a requerir de ellos un catálogo real (Lista en Excel oficial) de todas las aulas disponibles en la sede principal para realizar las Pruebas de Carga UAT (User Acceptance Testing) la próxima semana.
