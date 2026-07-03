# Especificación Funcional de Requisitos de Software (SRS)

## 1. Naturaleza del Documento (SRS IEEE 830 Modificado)

En el ecosistema Ágil (Scrum), no escribimos manuales de 300 páginas antes de empezar a programar (como se hacía en Waterfall). En su lugar, capturamos la esencia del valor del negocio utilizando **Historias de Usuario (User Stories)** y las respaldamos con un estricto conjunto de **Requisitos No Funcionales (RNF)**.

Este documento de Especificación de Requisitos (SRS) es la "Estrella Polar" del proyecto UniHorarios. Si una funcionalidad solicitada en el futuro no obedece a las historias de usuario aquí vertidas, se considerará *Scope Creep* (Corrupción del alcance) y será rechazada o enviada al fondo del Backlog.

---

## 2. Requerimientos Funcionales (User Stories - Epics)

Las funcionalidades han sido agrupadas en Epopeyas (Epics), que representan grandes módulos del sistema. Siguen el estándar canónico: *Como [Rol], quiero [Acción], para poder [Beneficio]*.

### Epic 1: Autenticación y Autorización (Security Core)
- **US-1.1 (Login Seguro):** Como *Usuario del Sistema*, quiero iniciar sesión usando mi correo institucional y contraseña, para acceder a un panel personalizado según mis privilegios.
- **US-1.2 (Role-Based Access):** Como *Administrador*, quiero que el sistema me asigne automáticamente un rol (Coordinador o Docente) tras validar mi token JWT, para que la interfaz me oculte botones que no me corresponden.
- **US-1.3 (Recuperación):** Como *Docente Olvidadizo*, quiero poder solicitar un enlace de restablecimiento de contraseña a mi correo, para no depender de llamar por teléfono a soporte técnico.

### Epic 2: Gestión de Entidades Base (CRUD Master Data)
- **US-2.1 (Padrón de Docentes):** Como *Coordinador*, quiero registrar, editar y desactivar perfiles de docentes en el sistema, para mantener la planilla actualizada.
- **US-2.2 (Gestión de Infraestructura):** Como *Coordinador*, quiero registrar Aulas indicando su capacidad física máxima (Aforo) y su naturaleza (Teoría/Laboratorio), para que el algoritmo nunca asigne 50 alumnos a un aula de 30.
- **US-2.3 (Mallas Curriculares):** Como *Coordinador*, quiero diseñar el pensum semestral añadiendo Asignaturas, créditos y pre-requisitos, formando un grafo de dependencias lógico.

### Epic 3: Declaración de Restricciones (El Input del Algoritmo)
- **US-3.1 (Disponibilidad Drag & Drop):** Como *Docente*, quiero visualizar una cuadrícula semanal (Lunes a Sábado) y "pintar" arrastrando el mouse sobre los bloques horarios en los que puedo dictar clases, para enviar mi disponibilidad oficial al sistema en 1 minuto.
- **US-3.2 (Restricción Fuerte - Cierre):** Como *Coordinador*, quiero presionar un botón que bloquee el acceso de edición a los docentes, para garantizar que nadie cambie sus horas una vez que el motor de horarios inicie sus cálculos.

### Epic 4: El Orquestador (Motor CSP y Calendario)
- **US-4.1 (Ejecución del Algoritmo):** Como *Coordinador*, quiero pulsar el botón "Generar Horario" y que el sistema procese todos los docentes y aulas automáticamente, para obtener un cruce sin colisiones en segundos.
- **US-4.2 (Grilla Visual Interactiva):** Como *Coordinador*, quiero ver el horario resultante dibujado en un calendario estilo "Google Calendar" con bloques de colores, para poder detectar huecos u anomalías de un vistazo.
- **US-4.3 (Exportación PDF):** Como *Usuario Final*, quiero descargar el horario generado en un formato PDF estandarizado (A4 apaisado), para imprimirlo y pegarlo físicamente en la puerta de las aulas.

---

## 3. Requerimientos No Funcionales (Atributos de Calidad / NFRs)

Los RNF no dictan *qué* hace el sistema, sino *cómo* debe hacerlo (Niveles de Servicio). Si los Funcionales fallan, el sistema no sirve; si los No Funcionales fallan, el sistema colapsa.

### 3.1 NFR de Rendimiento y Escalabilidad (Performance)
- **P-01 (Umbral del Algoritmo):** El algoritmo de Satisfacción de Restricciones (CSP) deberá hallar un resultado viable (o declarar matemáticamente infactible el problema) en un tiempo estrictamente menor a **15.0 segundos** para una carga de 1000 cursos. Un milisegundo más será considerado un defecto crítico de rendimiento (Timeout).
- **P-02 (Latencia de Interfaz):** Cualquier solicitud de lectura a MongoDB (GET) debe pintar los datos en el navegador del cliente en menos de **200 milisegundos**.

### 3.2 NFR de Seguridad y Privacidad (Security)
- **S-01 (Zero-Trust API):** Ningún endpoint de la API REST (Node.js/Express) puede ser accesible sin un token `Bearer JWT` válido inyectado en las cabeceras HTTP. El backend debe rechazar peticiones anónimas con un `401 Unauthorized`.
- **S-02 (Criptografía):** Las contraseñas en la base de datos jamás se guardarán en texto plano. Se exige encriptación Hash unidireccional con algoritmo de grado militar (Bcrypt) y salting dinámico de 10 rondas.

### 3.3 NFR de Confiabilidad y Recuperación (Reliability)
- **R-01 (Prevención de Pérdida de Datos):** La plataforma de base de datos (MongoDB Atlas) debe estar configurada en un clúster *Replica Set* de al menos 3 nodos geográficamente distribuidos, asegurando un Uptime del 99.9%.
- **R-02 (Backups):** Se debe configurar una política de *Snapshot* (Fotografía) automática de la base de datos cada 24 horas a las 03:00 AM (Hora inactiva).

### 3.4 NFR de Compatibilidad y Accesibilidad (Usability)
- **U-01 (Responsividad Móvil Restringida):** Las pantallas de "Declaración de Disponibilidad" deben funcionar perfectamente en móviles (Safari/Chrome iOS y Android). Sin embargo, el "Calendario Generador" (debido a su extrema densidad de datos visuales) será de uso exclusivo en pantallas Desktop (> 1024px).
- **U-02 (Contraste Visual):** Los colores de los botones y textos deben cumplir el estándar **WCAG 2.1 Nivel AA** (Ratio mínimo de 4.5:1) para proteger a los usuarios con discapacidades o fatiga visual.

---
## 4. Matriz de Aprobación

Este documento SRS sirve como Contrato Funcional del MVP. Cualquier característica tecnológica no listada aquí requiere pasar por la junta de Control de Cambios.
