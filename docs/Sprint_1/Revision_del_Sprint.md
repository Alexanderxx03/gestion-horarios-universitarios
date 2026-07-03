# Acta de Revisión del Sprint 1 (Sprint Review)

**Fecha:** Viernes de la Semana 2 del Sprint 1  
**Lugar:** Sala de Juntas Híbrida (Google Meet + Presencial)  
**Asistentes Core:** Equipo Scrum, Decano de Ingeniería (Sponsor Ejecutivo), Coordinador Académico (Product Owner Proxy).  

---

## 1. Meta de la Revisión (Objetivo de la Ceremonia)

La Revisión de Sprint (Sprint Review) no es una reunión de reporte de estado ni de diapositivas aburridas. Es un espacio de Demostración Práctica (Demo). En esta sesión, el equipo de desarrollo de **UniHorarios** presentará el Incremento de Software al cliente real, buscando su feedback crudo e instantáneo antes de continuar la construcción. 

Solo se mostrará código "Terminado" (Done), que haya pasado las pruebas de calidad (Jest).

---

## 2. Demostración en Vivo (Live Demo)

El Scrum Master (Paul Paytan) conectó su portátil al proyector e ingresó a la URL temporal (Staging) alojada en Vercel. Se ejecutaron las siguientes pruebas frente al Decano y el Coordinador:

### Prueba Demostrativa 1: Muro de Seguridad y Rechazo (Security Test)
- **Acción del Dev:** Se intentó ingresar a la URL `dashboard/aulas` directamente en la barra de direcciones del navegador.
- **Comportamiento del Sistema:** La aplicación pateó instantáneamente al usuario de vuelta a la pantalla de `/login` mostrando una alerta de "Acceso Denegado".
- **Feedback del Decano:** *Excelente. Esto me garantiza que ningún alumno curioso podrá entrar a ver los horarios o modificar las aulas sin tener clave.*

### Prueba Demostrativa 2: Autenticación Exitosa (Happy Path)
- **Acción del Dev:** Se ingresó el correo `admin@universidad.edu.pe` con la contraseña cifrada real extraída de los scripts semilla (Seeds). Se pulsó "Entrar".
- **Comportamiento del Sistema:** La API contestó en 150 milisegundos con un Token JWT, el *State* global de Zustand se hidrató, y la interfaz navegó fluidamente sin recargar la página hacia el Dashboard principal de Bienvenida.
- **Feedback del Coordinador:** *El diseño con Tailwind está muy moderno y oscuro (Dark Mode). Me gusta, pero siento que el botón de Entrar es muy pequeño para pantallas táctiles.*

---

## 3. Discusión de Feedback y Cambios Requeridos (Adaptación)

El marco Scrum brilla en este momento. A partir de los comentarios de los Interesados (Stakeholders), el *Product Owner* recogió solicitudes de cambio (Change Requests) para inyectarlas de vuelta al Backlog:

| Solicitud del Stakeholder (Feedback Crudo) | Decisión del Equipo / Acción Tomada | Clasificación (Bug vs Feature) |
|:---|:---|:---:|
| **Coordinador:** "El botón de Login es pequeño para mis dedos si lo abro en el celular" | Se creará un pequeño Ticket de UI para aumentar el Padding (CSS: `py-3 px-6`) en móviles en el Sprint 2. | Mejora UX (Feature) |
| **Decano:** "Si pongo mal la contraseña 5 veces, ¿Se bloquea la cuenta?" | Actualmente no hay política de bloqueo (Brute Force Protection). Paul Paytan explica que esto tomaría 3 días de ingeniería y una Base de Datos Redis para rastrear IPs de atacantes. El Decano concluyó que no vale la pena (Sobrecoste). Se pospone indefinidamente. | Nueva Épica (Rechazada) |
| **Coordinador:** "¿Puedo entrar con mi cuenta de Google de la universidad (@universidad.edu.pe)?" | El equipo explica que la autenticación Oauth 2.0 (Google Sign-In) es una épica compleja. Se añade al fondo del Backlog (Prioridad Baja) para fases futuras. | Feature (Postergado) |

---

## 4. Firma Final y Aceptación de Incremento (Sign-Off)

El Product Owner delegado (Coordinador) declaró formalmente: **"El Incremento Presentado cumple con el valor esperado. Aceptamos formalmente el cierre del Sprint 1"**.

*La reunión duró 45 minutos (Extremadamente eficiente).* El equipo se retira a descansar, preparándose para la Retrospectiva interna.
