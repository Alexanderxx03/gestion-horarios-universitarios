# Declaración de Trabajo y Transición (SOW de Cierre)

**Proyecto:** UniHorarios (Gestor Algorítmico CSP)  
**Documento:** Statement of Work (SOW) - Operaciones y Mantenimiento  
**Versión:** 1.0.0 (Release de Producción)  

---

## 1. Naturaleza de la Declaración de Trabajo

La Declaración de Trabajo (SOW - Statement of Work) en la fase de cierre no dicta lo que se va a programar (eso se hizo en el SOW Inicial), sino que define explícitamente los términos de **Transición** del producto hacia el equipo de soporte continuo (Mantenimiento), estableciendo los límites legales y operativos de lo que el equipo de desarrollo asume como garantía posterior a la entrega.

Este documento establece un marco de SLA (Service Level Agreement) para el periodo de Garantía Temprana (Hypercare Period) y documenta los recursos de capacitación transferidos al cliente.

---

## 2. Inventario de Transferencia Tecnológica

Como parte integral del cierre, el Equipo de Proyecto cede los siguientes activos intangibles al Departamento de TI de la Universidad:

### 2.1 Código Fuente y Propiedad Intelectual
- Repositorio Máster alojado en GitHub (Rama `main` estable).
- Historial criptográfico completo de Commits.
- Totalidad de los *Scripts de Migración* para inicializar nuevas bases de datos MongoDB.
- Todos los derechos de propiedad intelectual, marca y algoritmos subyacentes desarrollados a la medida.

### 2.2 Credenciales y Tokens de Infraestructura (Secrets)
- Se han revocado todos los accesos personales de los desarrolladores al clúster MongoDB Atlas de Producción.
- Transferencia de llaves maestras, secretos JWT, claves API de plataformas en la nube a través de la bóveda segura corporativa (HashiCorp Vault / 1Password).

### 2.3 Entregables Documentales Acumulados
El repositorio transfiere un Wiki exhaustivo (Directorio `docs/`) que abarca:
- Sprint Backlogs y artefactos Scrum (Fase de Planificación).
- Evaluaciones SonarQube y OWASP (Fase de Control y PFA).
- Diccionario de Datos de las 4 colecciones base (Usuarios, Aulas, Cursos, Mallas).
- Catálogos de despliegue en Vercel/Render.

---

## 3. Plan de Capacitación Ejecutado (Training Sign-off)

Un software complejo sin usuarios capacitados es software fallido. Se declara completado el siguiente cronograma de transferencia de conocimiento:

| Grupo Objetivo | Fecha Ejecución | Temática Abordada | Estado de Certificación |
|:---|:---:|:---|:---:|
| **Administradores TI (SysAdmins)** | 25/06/2026 | Arquitectura de Despliegue. Reinicio de Worker Threads. Manejo de Variables de Entorno `.env`. Backups de MongoDB. | ✅ Firmado y Completado |
| **Coordinadores Académicos** | 28/06/2026 | Creación de Mallas. Reglas lógicas del algoritmo CSP. Interpretación de la grilla de horarios. Exportación de PDF. | ✅ Firmado y Completado |
| **Docentes Universitarios** | 30/06/2026 | Ingreso a la plataforma. Modificación de franjas horarias (Mis Disponibilidades). Restablecimiento de contraseña. | ✅ Firmado (Mediante video-tutorial) |

*Nota:* Los manuales de usuario grabados en formato audiovisual (`.mp4`) han sido subidos a la intranet universitaria como material de inducción perpetuo.

---

## 4. Período de Hiper-Cuidado (Hypercare y Garantía)

A partir de la firma del Acta de Cierre (03/07/2026), entra en vigor un periodo de garantía operativa estricta, diseñado para atrapar anomalías sutiles en producción.

**Duración del Hypercare:** 30 Días Calendario (Hasta 02/08/2026).

### 4.1 Alcance de la Garantía (In-Scope)
El equipo original (Alexander y el desarrollador secundario) atenderán sin costo adicional los siguientes incidentes:
- **Defectos Fatales (Nivel 1):** El algoritmo CSP entra en loop, la base de datos rechaza inserciones correctas, la UI de React muestra pantalla blanca. (SLA de Respuesta: < 4 Horas).
- **Fallos de Lógica Discreta (Nivel 2):** El algoritmo ignora accidentalmente una restricción de disponibilidad docente en el 5% de los casos. (SLA de Respuesta: < 24 Horas).
- **Vulnerabilidades Day-0:** Cualquier parche urgente de seguridad de Node.js o Express.

### 4.2 Exclusiones de la Garantía (Out-of-Scope)
No se atenderán dentro del periodo de garantía (Requerirán un nuevo contrato de mantenimiento/CR):
- **Evolutivos (Nuevos Features):** Solicitudes como "Agregar un módulo para gestionar notas" o "Hacer que el sistema mande mensajes por WhatsApp".
- **Alteraciones de Terceros:** Si el equipo TI de la universidad inyecta código, altera los esquemas de Mongoose sin consultar, y rompe el servidor, el diagnóstico se cobrará como consultoría externa.
- **Soporte de Nivel 1 (Helpdesk):** Dudas de docentes sobre "Olvidé mi contraseña" deben ser manejadas por la mesa de ayuda interna.

---

## 5. Cierre Comercial y Aceptación Final

Al firmar este documento, el Cliente acepta que el código fuente inspeccionado cumple con todos los rigores de calidad, y que cualquier disputa futura se gestionará a través de los canales de Soporte TI (ITSM) acordados en el numeral 4.1. El contrato principal de desarrollo queda legalmente extinto, habiendo cumplido su objeto.
